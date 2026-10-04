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

  return true;
}
