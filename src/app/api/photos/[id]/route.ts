import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Photo from '@/lib/models/Photo';
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
  const photo = await Photo.findByIdAndDelete(id);
  if (!photo) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  // Remove arquivo do disco apenas se for upload (não arquivos estáticos hardcoded)
  if (photo.src.startsWith('/uploads/')) {
    const filePath = path.join(process.cwd(), 'public', photo.src);
    await unlink(filePath).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
