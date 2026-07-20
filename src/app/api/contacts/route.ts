import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ContactInfo from '@/lib/models/ContactInfo';
import { isAdminRequest } from '@/lib/auth';

export async function GET() {
  await connectDB();
  const contacts = await ContactInfo.find().sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();

  const { label, href, type } = await request.json();

  if (!label || !href || !type) {
    return NextResponse.json({ error: 'Label, href e tipo são obrigatórios' }, { status: 400 });
  }

  const count = await ContactInfo.countDocuments();
  const contact = await ContactInfo.create({ label, href, type, order: count });

  return NextResponse.json(contact, { status: 201 });
}
