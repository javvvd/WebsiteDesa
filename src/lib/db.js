import { neon } from '@neondatabase/serverless';

// Singleton sql instance
let sqlInstance = null;

export function getDb() {
  if (!sqlInstance) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL tidak ditemukan di environment variables. ' +
        'Silakan buat database Neon di https://neon.tech dan tambahkan connection string ke .env.local'
      );
    }
    sqlInstance = neon(url);
  }
  return sqlInstance;
}

// Initialize database tables
export async function initDb() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      nama VARCHAR(100) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pengumuman (
      id SERIAL PRIMARY KEY,
      judul VARCHAR(200) NOT NULL,
      isi TEXT NOT NULL,
      is_pinned BOOLEAN DEFAULT FALSE,
      gambar_url TEXT,
      file_url TEXT,
      file_nama TEXT,
      created_by VARCHAR(50),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Migrasi untuk database yang sudah ada (tambah kolom baru jika belum ada)
  await sql`ALTER TABLE pengumuman ADD COLUMN IF NOT EXISTS gambar_url TEXT`;
  await sql`ALTER TABLE pengumuman ADD COLUMN IF NOT EXISTS file_url TEXT`;
  await sql`ALTER TABLE pengumuman ADD COLUMN IF NOT EXISTS file_nama TEXT`;

  await sql`
    CREATE TABLE IF NOT EXISTS laporan (
      id SERIAL PRIMARY KEY,
      nama_pelapor VARCHAR(100) NOT NULL,
      no_telepon VARCHAR(20),
      email VARCHAR(100),
      alamat TEXT,
      kategori VARCHAR(50) NOT NULL,
      judul VARCHAR(200) NOT NULL,
      deskripsi TEXT NOT NULL,
      lokasi_kejadian TEXT,
      status VARCHAR(20) DEFAULT 'Diterima',
      catatan_admin TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS galeri (
      id SERIAL PRIMARY KEY,
      judul VARCHAR(200) NOT NULL,
      deskripsi TEXT,
      gambar_url TEXT NOT NULL,
      created_by VARCHAR(50),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS aparatur (
      id SERIAL PRIMARY KEY,
      kategori VARCHAR(50) NOT NULL, -- lurah, sekretaris, seksi, lingkungan
      jabatan VARCHAR(100) NOT NULL,
      nama VARCHAR(100) NOT NULL,
      nip VARCHAR(50),
      urutan INT NOT NULL
    )
  `;

  // Seed default aparatur data if empty
  const aparaturCount = await sql`SELECT COUNT(*) FROM aparatur`;
  if (parseInt(aparaturCount[0].count) === 0) {
    const defaultData = [
      { kategori: 'lurah', jabatan: 'Lurah Kakaskasen Dua', nama: 'Nama Lurah, S.IP', nip: '19801231 200501 1 001', urutan: 1 },
      { kategori: 'sekretaris', jabatan: 'Sekretaris Kelurahan', nama: 'Nama Sekretaris, S.E.', nip: '19851231 201001 2 002', urutan: 2 },
      { kategori: 'seksi', jabatan: 'Kasi Pemerintahan & Trantib', nama: 'Nama Kasi Pem', nip: '19901231 201501 1 003', urutan: 3 },
      { kategori: 'seksi', jabatan: 'Kasi Pembangunan & Kesra', nama: 'Nama Kasi Pembangunan', nip: '19881231 201301 2 004', urutan: 4 },
      { kategori: 'seksi', jabatan: 'Kasi Pelayanan Umum', nama: 'Nama Kasi Pelayanan', nip: '19921231 201801 2 005', urutan: 5 },
      ...Array.from({ length: 13 }).map((_, i) => ({
        kategori: 'lingkungan',
        jabatan: `Kepala Lingkungan ${i + 1}`,
        nama: 'Nama Pala',
        nip: '',
        urutan: 6 + i
      }))
    ];

    for (const item of defaultData) {
      await sql`
        INSERT INTO aparatur (kategori, jabatan, nama, nip, urutan)
        VALUES (${item.kategori}, ${item.jabatan}, ${item.nama}, ${item.nip}, ${item.urutan})
      `;
    }
  }

  return true;
}
