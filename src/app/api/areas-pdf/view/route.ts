import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AreasPDF from '@/lib/models/AreasPDF';

export async function GET() {
  await connectDB();
  const doc = await AreasPDF.findOne().sort({ createdAt: -1 }).lean() as { url: string; filename: string } | null;

  if (!doc) {
    return new NextResponse('PDF não encontrado', { status: 404 });
  }

  const response = await fetch(doc.url);
  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${doc.filename}"`,
    },
  });
}
