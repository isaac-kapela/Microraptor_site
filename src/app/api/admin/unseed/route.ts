import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Photo from '@/lib/models/Photo';
import Member from '@/lib/models/Member';
import { isAdminRequest } from '@/lib/auth';

export async function DELETE() {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();

  const photos = await Photo.deleteMany({});
  const members = await Member.deleteMany({});

  return NextResponse.json({
    ok: true,
    removedPhotos: photos.deletedCount,
    removedMembers: members.deletedCount,
  });
}
