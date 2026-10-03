import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { createToken, setSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    await initDb();
    const sql = getDb();

    // Check if any admin exists, if not create default admin
    const admins = await sql`SELECT COUNT(*) as count FROM admin_users`;
    if (parseInt(admins[0].count) === 0) {
      const defaultPassword = await bcrypt.hash('admin123', 10);
      await sql`
        INSERT INTO admin_users (username, password_hash, nama)
        VALUES ('admin', ${defaultPassword}, 'Administrator')
      `;
    }

    // Find user
    const users = await sql`
      SELECT * FROM admin_users WHERE username = ${username}
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const token = await createToken({
      id: user.id,
      username: user.username,
      nama: user.nama,
    });

    await setSession(token);

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username, nama: user.nama },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Pastikan DATABASE_URL sudah dikonfigurasi.' },
      { status: 500 }
    );
  }
}
