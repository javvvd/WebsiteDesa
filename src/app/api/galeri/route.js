import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET — Public: fetch all galeri
export async function GET() {
  try {
    await initDb();
    const sql = getDb();
    const rows = await sql`
      SELECT * FROM galeri ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Fetch galeri error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST — Admin only: create new galeri item
export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { judul, deskripsi, gambar_url } = await request.json();

    if (!judul || !gambar_url) {
      return NextResponse.json(
        { error: 'Judul dan URL Gambar wajib diisi' },
        { status: 400 }
      );
    }

    await initDb();
    const sql = getDb();

    const result = await sql`
      INSERT INTO galeri (judul, deskripsi, gambar_url, created_by)
      VALUES (${judul}, ${deskripsi || null}, ${gambar_url}, ${session.username})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Create galeri error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat galeri' },
      { status: 500 }
    );
  }
}
