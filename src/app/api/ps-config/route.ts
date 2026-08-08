import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PSConfig from '@/lib/models/PSConfig';
import { isAdminRequest } from '@/lib/auth';

// GET /api/ps-config           → edição atual (mais recente)
// GET /api/ps-config?all=1     → todas as edições (admin)
export async function GET(request: NextRequest) {
  await connectDB();

  if (request.nextUrl.searchParams.get('all') === '1') {
    const ok = await isAdminRequest();
    if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    const all = await PSConfig.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(all);
  }

  const current = await PSConfig.findOne().sort({ createdAt: -1 }).lean();
  if (current) return NextResponse.json(current);
  const created = await PSConfig.create({ edition: '', isOpen: true, deadline: null });
  return NextResponse.json(created);
}

// PUT /api/ps-config  → atualiza edição atual
export async function PUT(request: NextRequest) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { isOpen, deadline, edition } = await request.json();
  await connectDB();

  const latest = await PSConfig.findOne().sort({ createdAt: -1 });
  if (!latest) return NextResponse.json({ error: 'Nenhuma configuração encontrada' }, { status: 404 });

  if (edition  !== undefined) latest.edition  = edition;
  if (isOpen   !== undefined) latest.isOpen   = isOpen;
  latest.deadline = deadline ?? null;
  await latest.save();

  return NextResponse.json(latest);
}

// POST /api/ps-config → cria nova edição (fecha a atual)
export async function POST(request: NextRequest) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { edition } = await request.json();
  if (!edition?.trim()) return NextResponse.json({ error: 'Nome da edição obrigatório' }, { status: 400 });

  await connectDB();

  // Fecha a edição atual
  const current = await PSConfig.findOne().sort({ createdAt: -1 });
  if (current) { current.isOpen = false; await current.save(); }

  const newConfig = await PSConfig.create({ edition: edition.trim(), isOpen: true, deadline: null });
  return NextResponse.json(newConfig);
}
