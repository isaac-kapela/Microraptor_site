import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Member from '@/lib/models/Member';
import { isAdminRequest } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET /api/members?area=aerodinamica
export async function GET(request: Request) {
  await connectDB();
  const url = new URL(request.url);
  const area = url.searchParams.get('area');

  const filter: Record<string, unknown> = {};
  if (area) filter.area = area;

  const members = await Member.find(filter).sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json(members);
}

// POST /api/members  (multipart — admin only)
export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const name = formData.get('name') as string;
  const area = formData.get('area') as string;
  const isLeader = formData.get('isLeader') === 'true';

  if (!file || !name || !area) {
    return NextResponse.json({ error: 'Arquivo, nome e área são obrigatórios' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const photo = await uploadToCloudinary(bytes, `members/${area}`);

  const count = await Member.countDocuments({ area });
  const member = await Member.create({ name, area, photo, isLeader, order: count });

  return NextResponse.json(member, { status: 201 });
}
