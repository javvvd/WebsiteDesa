import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

// PUT — Admin: update pengumuman
export async function PUT(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { judul, isi, kategori, is_pinned } = await request.json();

    await initDb();
    const sql = getDb();

    const result = await sql`
      UPDATE pengumuman
      SET judul = ${judul}, isi = ${isi}, kategori = ${kategori || 'Umum'},
          is_pinned = ${is_pinned || false}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Update pengumuman error:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui pengumuman' },
      { status: 500 }
    );
  }
}

// DELETE — Admin: delete pengumuman
export async function DELETE(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await initDb();
    const sql = getDb();

    await sql`DELETE FROM pengumuman WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete pengumuman error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus pengumuman' },
      { status: 500 }
    );
  }
}
