import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PSApplication from '@/lib/models/PSApplication';
import { isAdminRequest } from '@/lib/auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  await connectDB();
  await PSApplication.findByIdAndUpdate(id, { status });

  return NextResponse.json({ ok: true });
}
