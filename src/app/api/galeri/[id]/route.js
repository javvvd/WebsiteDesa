import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

// PUT — Admin: update galeri
export async function PUT(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { judul, deskripsi, gambar_url } = await request.json();

    await initDb();
    const sql = getDb();

    const result = await sql`
      UPDATE galeri
      SET judul = ${judul}, deskripsi = ${deskripsi || null}, gambar_url = ${gambar_url}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Update galeri error:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui galeri' },
      { status: 500 }
    );
  }
}

// DELETE — Admin: delete galeri
export async function DELETE(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await initDb();
    const sql = getDb();

    await sql`DELETE FROM galeri WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete galeri error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus galeri' },
      { status: 500 }
    );
  }
}
