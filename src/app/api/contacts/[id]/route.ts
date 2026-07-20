import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ContactInfo from '@/lib/models/ContactInfo';
import { isAdminRequest } from '@/lib/auth';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const contact = await ContactInfo.findByIdAndDelete(id);
  if (!contact) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
