import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AreasPDF from '@/lib/models/AreasPDF';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { isAdminRequest } from '@/lib/auth';

export async function GET() {
  await connectDB();
  const doc = await AreasPDF.findOne().sort({ createdAt: -1 }).lean();
  return NextResponse.json(doc ?? null);
}

export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const url = await uploadToCloudinary(bytes, 'areas-pdf', 'raw');

  await connectDB();
  await AreasPDF.deleteMany({});
  const doc = await AreasPDF.create({ url, filename: file.name });

  return NextResponse.json(doc);
}

export async function DELETE() {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();
  await AreasPDF.deleteMany({});
  return NextResponse.json({ ok: true });
}
