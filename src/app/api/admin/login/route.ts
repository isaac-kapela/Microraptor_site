import { NextResponse } from 'next/server';
import { signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  const { pin } = await request.json();

  if (!pin || pin !== process.env.ADMIN_PIN) {
    return NextResponse.json({ error: 'PIN inválido' }, { status: 401 });
  }

  const token = signToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 horas
    path: '/',
  });

  return response;
}
