import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PSConfig from '@/lib/models/PSConfig';
import { isAdminRequest } from '@/lib/auth';

export async function GET() {
  await connectDB();
  const existing = await PSConfig.findOne().lean();
  if (existing) return NextResponse.json(existing);
  const created = await PSConfig.create({ isOpen: true, deadline: null });
  return NextResponse.json(created);
}

export async function PUT(request: NextRequest) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { isOpen, deadline } = await request.json();
  await connectDB();

  const config = await PSConfig.findOneAndUpdate(
    {},
    { isOpen, deadline: deadline ?? null },
    { upsert: true, new: true }
  );

  return NextResponse.json(config);
}
