import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Sponsor from '@/lib/models/Sponsor';
import { isAdminRequest } from '@/lib/auth';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const sponsor = await Sponsor.findByIdAndDelete(id);
  if (!sponsor) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
