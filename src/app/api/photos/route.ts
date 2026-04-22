import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Photo from '@/lib/models/Photo';
import { isAdminRequest } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';
import path from 'path';

// GET /api/photos?category=carousel
// GET /api/photos?category=album&year=2025
export async function GET(request: Request) {
  await connectDB();
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const year = url.searchParams.get('year');

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (year) filter.year = Number(year);

  const photos = await Photo.find(filter).sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json(photos);
}

// POST /api/photos  (multipart — admin only)
export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const category = formData.get('category') as string;
  const year = formData.get('year') ? Number(formData.get('year')) : undefined;

  if (!file || !category) {
    return NextResponse.json({ error: 'Arquivo e categoria são obrigatórios' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const type: 'image' | 'video' = ['mp4', 'mov', 'webm'].includes(ext) ? 'video' : 'image';
  const filename = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);

  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

  const src = `/uploads/${category}/${filename}`;
  const count = await Photo.countDocuments({ category });

  const photo = await Photo.create({ category, src, type, year, order: count });
  return NextResponse.json(photo, { status: 201 });
}
