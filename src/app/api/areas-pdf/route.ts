import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AreasPDF from '@/lib/models/AreasPDF';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { isAdminRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type') ?? 'areas';
  await connectDB();
  const doc = await AreasPDF.findOne({ docType: type }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(doc ?? null);
}

export async function POST(request: NextRequest) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const type = (formData.get('type') as string) ?? 'areas';
  if (!file) return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const url = await uploadToCloudinary(bytes, `ps-docs/${type}`, 'raw');

  await connectDB();
  await AreasPDF.deleteMany({ docType: type });
  const doc = await AreasPDF.create({ url, filename: file.name, docType: type });

  return NextResponse.json(doc);
}

export async function DELETE(request: NextRequest) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const type = request.nextUrl.searchParams.get('type') ?? 'areas';
  await connectDB();
  await AreasPDF.deleteMany({ docType: type });
  return NextResponse.json({ ok: true });
}
