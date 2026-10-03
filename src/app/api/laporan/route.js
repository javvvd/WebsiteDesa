import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

// POST — Public: submit laporan
export async function POST(request) {
  try {
    await initDb();
    const sql = getDb();

    const body = await request.json();
    const { nama_pelapor, no_telepon, email, alamat, kategori, judul, deskripsi, lokasi_kejadian } = body;

    if (!nama_pelapor || !kategori || !judul || !deskripsi) {
      return NextResponse.json(
        { error: 'Mohon lengkapi semua field yang wajib diisi' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO laporan (nama_pelapor, no_telepon, email, alamat, kategori, judul, deskripsi, lokasi_kejadian, status)
      VALUES (${nama_pelapor}, ${no_telepon || null}, ${email || null}, ${alamat || null},
              ${kategori}, ${judul}, ${deskripsi}, ${lokasi_kejadian || null}, 'Diterima')
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Submit laporan error:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim laporan' },
      { status: 500 }
    );
  }
}

// GET — Admin only: fetch all laporan
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const sql = getDb();

    const rows = await sql`
      SELECT * FROM laporan ORDER BY created_at DESC
    `;

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Fetch laporan error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
