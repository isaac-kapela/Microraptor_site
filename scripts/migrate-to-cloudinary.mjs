// Script de migração: envia arquivos locais para Cloudinary e atualiza MongoDB
// Uso: node scripts/migrate-to-cloudinary.mjs

import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Carregar variáveis de ambiente manualmente ────────────────────────────────
const envPath = path.join(ROOT, '.env.local');
const envContent = await readFile(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const [key, ...rest] = line.split('=');
  if (key && !key.startsWith('#') && rest.length) {
    env[key.trim()] = rest.join('=').trim();
  }
}

// ── Configurar Cloudinary ─────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key:    env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// ── Conectar MongoDB ──────────────────────────────────────────────────────────
await mongoose.connect(env.MONGODB_URI);
console.log('✅ MongoDB conectado');

// ── Schemas mínimos ───────────────────────────────────────────────────────────
const PhotoSchema = new mongoose.Schema({ src: String, category: String, type: String }, { strict: false });
const MemberSchema = new mongoose.Schema({ photo: String, area: String }, { strict: false });
const Photo = mongoose.model('Photo', PhotoSchema);
const Member = mongoose.model('Member', MemberSchema);

// ── Função de upload ──────────────────────────────────────────────────────────
async function uploadFile(localPath, folder, resourceType = 'image') {
  const bytes = await readFile(localPath);
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `microraptor/${folder}`, resource_type: resourceType },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(bytes);
  });
}

// ── Migrar Photos ─────────────────────────────────────────────────────────────
console.log('\n📸 Migrando fotos...');
const photos = await Photo.find({ src: /^\/uploads\// });
console.log(`   ${photos.length} fotos para migrar`);

let ok = 0, skip = 0, fail = 0;
for (const photo of photos) {
  const localFile = path.join(ROOT, 'public', photo.src);
  if (!existsSync(localFile)) {
    console.log(`   ⚠️  Arquivo não encontrado: ${photo.src}`);
    skip++;
    continue;
  }
  try {
    const ext = photo.src.split('.').pop()?.toLowerCase();
    const resourceType = ['mp4', 'mov', 'webm'].includes(ext) ? 'video' : 'image';
    const url = await uploadFile(localFile, photo.category ?? 'misc', resourceType);
    await Photo.updateOne({ _id: photo._id }, { src: url });
    console.log(`   ✅ ${photo.src.split('/').pop()} → Cloudinary`);
    ok++;
  } catch (err) {
    console.log(`   ❌ Erro: ${photo.src} — ${err.message}`);
    fail++;
  }
}
console.log(`   Fotos: ${ok} migradas, ${skip} não encontradas, ${fail} erros`);

// ── Migrar Members ────────────────────────────────────────────────────────────
console.log('\n👤 Migrando membros...');
const members = await Member.find({ photo: /^\/uploads\// });
console.log(`   ${members.length} membros para migrar`);

ok = 0; skip = 0; fail = 0;
for (const member of members) {
  const localFile = path.join(ROOT, 'public', member.photo);
  if (!existsSync(localFile)) {
    console.log(`   ⚠️  Arquivo não encontrado: ${member.photo}`);
    skip++;
    continue;
  }
  try {
    const url = await uploadFile(localFile, `members/${member.area ?? 'misc'}`);
    await Member.updateOne({ _id: member._id }, { photo: url });
    console.log(`   ✅ ${member.photo.split('/').pop()} → Cloudinary`);
    ok++;
  } catch (err) {
    console.log(`   ❌ Erro: ${member.photo} — ${err.message}`);
    fail++;
  }
}
console.log(`   Membros: ${ok} migrados, ${skip} não encontrados, ${fail} erros`);

// ── Finalizar ─────────────────────────────────────────────────────────────────
await mongoose.disconnect();
console.log('\n🎉 Migração concluída!');
