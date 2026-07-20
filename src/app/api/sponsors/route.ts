import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Sponsor from '@/lib/models/Sponsor';
import { isAdminRequest } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  await connectDB();
  const sponsors = await Sponsor.find().sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json(sponsors);
}

export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();

  const formData = await request.formData();
  const file     = formData.get('file') as File | null;
  const name     = formData.get('name') as string;
  const site     = (formData.get('site') as string) || '#';
  const category = (formData.get('category') as string) || 'Parceiro';

  if (!file || !name) {
    return NextResponse.json({ error: 'Logo e nome são obrigatórios' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const src = await uploadToCloudinary(bytes, 'sponsors');

  const count = await Sponsor.countDocuments();
  const sponsor = await Sponsor.create({ name, src, site, category, order: count });

  return NextResponse.json(sponsor, { status: 201 });
}
