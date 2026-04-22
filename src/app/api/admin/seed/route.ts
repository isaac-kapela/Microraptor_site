import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Photo from '@/lib/models/Photo';
import Member from '@/lib/models/Member';
import { isAdminRequest } from '@/lib/auth';

// Fotos existentes em /public/equipe/
const CAROUSEL_BASTIDORES: Array<{ src: string; type: 'image' | 'video'; category: 'carousel' | 'bastidores' }> = [
  ...Array.from({ length: 56 }, (_, i) => ({
    src: `/equipe/img${i + 1}.jpg`,
    type: 'image' as const,
    category: 'bastidores' as const,
  })),
  { src: '/equipe/video1.mp4',  type: 'video', category: 'bastidores' },
  { src: '/equipe/video5.mp4',  type: 'video', category: 'bastidores' },
  { src: '/equipe/video9.mp4',  type: 'video', category: 'bastidores' },
  { src: '/equipe/video10.mp4', type: 'video', category: 'bastidores' },
  { src: '/equipe/video11.mp4', type: 'video', category: 'bastidores' },
  { src: '/equipe/video12.mp4', type: 'video', category: 'bastidores' },
];

// As primeiras 20 fotos do bastidores também vão para o carousel
const CAROUSEL_SRCS = [
  '/equipe/img41.jpg', '/equipe/img42.jpg', '/equipe/img43.jpg', '/equipe/img44.jpg',
  '/equipe/img45.jpg', '/equipe/img46.jpg', '/equipe/img47.jpg', '/equipe/img48.jpg',
  '/equipe/img49.jpg', '/equipe/img38.jpg', '/equipe/img39.jpg', '/equipe/img40.jpg',
  '/equipe/img6.jpg',  '/equipe/img10.jpg', '/equipe/img11.jpg', '/equipe/img14.jpg',
  '/equipe/img15.jpg', '/equipe/img18.jpg', '/equipe/img23.jpg', '/equipe/img25.jpg',
  '/equipe/video9.mp4', '/equipe/video10.mp4', '/equipe/video11.mp4',
];

// Fotos de álbuns por ano
const ALBUM_PHOTOS: Array<{ src: string; year: number }> = [
  { src: '/competicao/2024/foto_oficial.jpg', year: 2024 },
  { src: '/competicao/2024/img1.JPG', year: 2024 },
  { src: '/competicao/2024/img2.JPG', year: 2024 },
  { src: '/competicao/2024/img3.JPG', year: 2024 },
  { src: '/competicao/2024/img4.jpg', year: 2024 },
  { src: '/competicao/2024/vid1.mp4', year: 2024 },
  ...Array.from({ length: 45 }, (_, i) => ({
    src: `/competicao/2025/img${i + 1}.jpg`,
    year: 2025,
  })),
  { src: '/competicao/2025/video1.mp4', year: 2025 },
  { src: '/competicao/2025/video2.mp4', year: 2025 },
];

// Fotos dos membros existentes
const EXISTING_MEMBERS: Array<{ name: string; area: string; photo: string; isLeader?: boolean }> = [
  { name: 'Daniel', area: 'aerodinamica', photo: '/fotosMembrosAtuais/aerodinamica/daniel.jpeg' },
  { name: 'Bernardo', area: 'aerolasticidade', photo: '/fotosMembrosAtuais/aerolasticidade/bernadu.jpeg' },
  { name: 'João Kleber', area: 'aerolasticidade', photo: '/fotosMembrosAtuais/aerolasticidade/joao kleber.jpeg' },
  { name: 'Breno', area: 'capitania', photo: '/fotosMembrosAtuais/capitania/breno.jpeg', isLeader: true },
  { name: 'Enzo Fre', area: 'capitania', photo: '/fotosMembrosAtuais/capitania/enzoFre.jpeg' },
  { name: 'Breno', area: 'cargas', photo: '/fotosMembrosAtuais/cargas/breno.jpeg' },
  { name: 'Lorena', area: 'cargas', photo: '/fotosMembrosAtuais/cargas/lorena.jpeg' },
  { name: 'Mauler', area: 'cargas', photo: '/fotosMembrosAtuais/cargas/mauler.jpeg' },
  { name: 'Arthur Padilha', area: 'cauda', photo: '/fotosMembrosAtuais/cauda/arthur_padilha.jpeg' },
  { name: 'Bernardo', area: 'cauda', photo: '/fotosMembrosAtuais/cauda/bernadu.jpeg' },
  { name: 'Elias', area: 'cauda', photo: '/fotosMembrosAtuais/cauda/Elias.jpeg', isLeader: true },
  { name: 'Isis', area: 'cauda', photo: '/fotosMembrosAtuais/cauda/isis.jpeg' },
  { name: 'Leonardo', area: 'cauda', photo: '/fotosMembrosAtuais/cauda/leonardo.jpeg' },
  { name: 'Luis', area: 'cauda', photo: '/fotosMembrosAtuais/cauda/luis.jpeg' },
  { name: 'Mauler', area: 'cauda', photo: '/fotosMembrosAtuais/cauda/mauler.jpeg' },
  { name: 'Luis', area: 'desempenho', photo: '/fotosMembrosAtuais/desempenho/luis.jpeg' },
  { name: 'Pedro Breder', area: 'desempenho', photo: '/fotosMembrosAtuais/desempenho/pedro_breder.jpg', isLeader: true },
  { name: 'Arthur Padilha', area: 'eletrica', photo: '/fotosMembrosAtuais/eletrica/arthur_padilha.jpeg', isLeader: true },
  { name: 'Mariana', area: 'eletrica', photo: '/fotosMembrosAtuais/eletrica/mariana.jpeg' },
  { name: 'Elias', area: 'estabilidade', photo: '/fotosMembrosAtuais/estabilidade/Elias.jpeg' },
  { name: 'Enzo Giradi', area: 'estabilidade', photo: '/fotosMembrosAtuais/estabilidade/enzoGiradi.jpeg', isLeader: true },
  { name: 'Isis', area: 'estabilidade', photo: '/fotosMembrosAtuais/estabilidade/isis.jpeg' },
  { name: 'Maria Clara', area: 'estruturas', photo: '/fotosMembrosAtuais/estruturas/mariaClara.jpeg' },
  { name: 'Mima', area: 'estruturas', photo: '/fotosMembrosAtuais/estruturas/mima.jpeg', isLeader: true },
  { name: 'Vitão', area: 'estruturas', photo: '/fotosMembrosAtuais/estruturas/vitao.jpeg' },
  { name: 'Enzo Giradi', area: 'fuseco-laminacao', photo: '/fotosMembrosAtuais/fusecoLaminação/enzoGiradi.jpeg' },
  { name: 'João Kleber', area: 'fuseco-laminacao', photo: '/fotosMembrosAtuais/fusecoLaminação/joao_kleber.jpeg' },
  { name: 'Lorena', area: 'fuseco-laminacao', photo: '/fotosMembrosAtuais/fusecoLaminação/lorena.jpeg' },
  { name: 'Maria Clara', area: 'fuseco-laminacao', photo: '/fotosMembrosAtuais/fusecoLaminação/mariaClara.jpeg' },
  { name: 'Mima', area: 'fuseco-laminacao', photo: '/fotosMembrosAtuais/fusecoLaminação/mima.jpeg' },
  { name: 'Rodolfo', area: 'fuseco-laminacao', photo: '/fotosMembrosAtuais/fusecoLaminação/rodolfo.jpeg', isLeader: true },
  { name: 'Rodolfo', area: 'gestao', photo: '/fotosMembrosAtuais/gestão/rodolfo.jpeg', isLeader: true },
  { name: 'Enzo Fre', area: 'plantas', photo: '/fotosMembrosAtuais/plantas/enzoFre.jpeg', isLeader: true },
  { name: 'Leonardo', area: 'plantas', photo: '/fotosMembrosAtuais/plantas/leonardo.jpeg' },
];

export async function POST() {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  await connectDB();

  let inserted = 0;
  let skipped = 0;

  // Seed bastidores
  for (let i = 0; i < CAROUSEL_BASTIDORES.length; i++) {
    const item = CAROUSEL_BASTIDORES[i];
    const exists = await Photo.findOne({ src: item.src });
    if (exists) { skipped++; continue; }
    await Photo.create({ ...item, order: i });
    inserted++;
  }

  // Seed carousel (sobrepõe category para itens que também são carousel)
  for (let i = 0; i < CAROUSEL_SRCS.length; i++) {
    const src = CAROUSEL_SRCS[i];
    const ext = src.split('.').pop()?.toLowerCase() ?? '';
    const type: 'image' | 'video' = ['mp4', 'mov', 'webm'].includes(ext) ? 'video' : 'image';
    const exists = await Photo.findOne({ src, category: 'carousel' });
    if (exists) { skipped++; continue; }
    await Photo.create({ src, type, category: 'carousel', order: i });
    inserted++;
  }

  // Seed álbuns
  for (let i = 0; i < ALBUM_PHOTOS.length; i++) {
    const item = ALBUM_PHOTOS[i];
    const ext = item.src.split('.').pop()?.toLowerCase() ?? '';
    const type: 'image' | 'video' = ['mp4', 'mov', 'webm'].includes(ext) ? 'video' : 'image';
    const exists = await Photo.findOne({ src: item.src, category: 'album' });
    if (exists) { skipped++; continue; }
    await Photo.create({ src: item.src, type, category: 'album', year: item.year, order: i });
    inserted++;
  }

  // Seed membros
  for (let i = 0; i < EXISTING_MEMBERS.length; i++) {
    const m = EXISTING_MEMBERS[i];
    const exists = await Member.findOne({ photo: m.photo });
    if (exists) { skipped++; continue; }
    await Member.create({ ...m, isLeader: m.isLeader ?? false, order: i });
    inserted++;
  }

  return NextResponse.json({ ok: true, inserted, skipped });
}
