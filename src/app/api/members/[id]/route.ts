import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Member from '@/lib/models/Member';
import { isAdminRequest } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const member = await Member.findByIdAndDelete(id);
  if (!member) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  if (member.photo.startsWith('/uploads/')) {
    const filePath = path.join(process.cwd(), 'public', member.photo);
    await unlink(filePath).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
