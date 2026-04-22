import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PSApplication from '@/lib/models/PSApplication';
import { isAdminRequest } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';

// ─── helpers ──────────────────────────────────────────────────────────────────

async function saveFile(file: File, subfolder: string): Promise<string> {
  const ext = extname(file.name);
  const filename = `${crypto.randomUUID()}${ext}`;
  const dir = join(process.cwd(), 'public', 'uploads', 'ps', subfolder);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/ps/${subfolder}/${filename}`;
}

// ─── POST — submeter inscrição ────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    const get = (key: string) => (fd.get(key) as string | null) ?? '';

    const curriculoFile   = fd.get('curriculo') as File | null;
    const comprovanteFile = fd.get('comprovanteMatricula') as File | null;
    const textoFile       = fd.get('texto') as File | null;
    const historicoFile   = fd.get('historicoEscolar') as File | null;

    if (!curriculoFile || curriculoFile.size === 0) {
      return NextResponse.json({ error: 'Currículo é obrigatório.' }, { status: 400 });
    }
    if (!comprovanteFile || comprovanteFile.size === 0) {
      return NextResponse.json({ error: 'Comprovante de matrícula é obrigatório.' }, { status: 400 });
    }
    if (!textoFile || textoFile.size === 0) {
      return NextResponse.json({ error: 'Texto de apresentação é obrigatório.' }, { status: 400 });
    }
    if (!historicoFile || historicoFile.size === 0) {
      return NextResponse.json({ error: 'Histórico escolar é obrigatório.' }, { status: 400 });
    }

    const [curriculoPath, comprovantePath, textoPath, historicoPath] = await Promise.all([
      saveFile(curriculoFile, 'curriculos'),
      saveFile(comprovanteFile, 'comprovantes'),
      saveFile(textoFile, 'textos'),
      saveFile(historicoFile, 'historicos'),
    ]);

    await connectDB();

    const application = await PSApplication.create({
      nomeCompleto:         get('nomeCompleto'),
      curso:                get('curso'),
      email:                get('email'),
      telefone:             get('telefone'),
      comoConheceu:         get('comoConheceu'),
      periodo:              get('periodo'),
      previsaoConclusao:    get('previsaoConclusao'),
      areas:                fd.getAll('areas') as string[],
      texto:                textoPath,
      curriculo:            curriculoPath,
      comprovanteMatricula: comprovantePath,
      historicoEscolar:     historicoPath,
    });

    return NextResponse.json({ ok: true, id: application._id }, { status: 201 });
  } catch (err) {
    console.error('[PS] POST error:', err);
    return NextResponse.json({ error: 'Erro ao salvar inscrição.' }, { status: 500 });
  }
}

// ─── GET — listar inscrições (admin only) ────────────────────────────────────

export async function GET() {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  await connectDB();
  const apps = await PSApplication.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(apps);
}
