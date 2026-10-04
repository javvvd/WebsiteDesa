import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET — Public: fetch all pengumuman
export async function GET() {
  try {
    await initDb();
    const sql = getDb();
    const rows = await sql`
      SELECT * FROM pengumuman ORDER BY is_pinned DESC, created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Fetch pengumuman error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST — Admin only: create new pengumuman
export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { judul, isi, is_pinned, gambar_url, file_url, file_nama } = await request.json();

    if (!judul || !isi) {
      return NextResponse.json(
        { error: 'Judul dan isi wajib diisi' },
        { status: 400 }
      );
    }

    await initDb();
    const sql = getDb();

    const result = await sql`
      INSERT INTO pengumuman (judul, isi, is_pinned, gambar_url, file_url, file_nama, created_by)
      VALUES (${judul}, ${isi}, ${is_pinned || false}, ${gambar_url || null}, ${file_url || null}, ${file_nama || null}, ${session.username})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Create pengumuman error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat pengumuman' },
      { status: 500 }
    );
  }
}
