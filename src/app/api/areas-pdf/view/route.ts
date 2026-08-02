import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AreasPDF from '@/lib/models/AreasPDF';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type') ?? 'areas';
  await connectDB();
  const doc = await AreasPDF.findOne({ docType: type }).sort({ createdAt: -1 }).lean() as { url: string; filename: string } | null;

  if (!doc) {
    const fallback = type === 'edital' ? '/edital.pdf' : '/areas.pdf';
    return NextResponse.redirect(new URL(fallback, request.url));
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
