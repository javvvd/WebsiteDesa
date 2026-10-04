import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await initDb();
    const sql = getDb();

    const data = await sql`SELECT * FROM aparatur ORDER BY urutan ASC`;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch aparatur error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data aparatur' },
      { status: 500 }
    );
  }
}
