import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AreaContact from '@/lib/models/AreaContact';

export async function GET() {
  await connectDB();
  const contacts = await AreaContact.find().lean();
  return NextResponse.json(contacts);
}
