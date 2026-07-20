import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AreaContact from '@/lib/models/AreaContact';
import { isAdminRequest } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();
  const { slug } = await params;
  const { whatsapp } = await request.json();

  if (!whatsapp) return NextResponse.json({ error: 'WhatsApp é obrigatório' }, { status: 400 });

  const contact = await AreaContact.findOneAndUpdate(
    { slug },
    { whatsapp },
    { upsert: true, new: true }
  );

  return NextResponse.json(contact);
}
