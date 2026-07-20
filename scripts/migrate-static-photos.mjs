// Sobe fotos estáticas de public/fotosMembrosAtuais para o Cloudinary
// e atualiza os caminhos em src/app/areas/data.ts
// Uso: node scripts/migrate-static-photos.mjs

import { v2 as cloudinary } from 'cloudinary';
import { readFile, writeFile } from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Carregar .env.local ───────────────────────────────────────────────────────
const envContent = await readFile(path.join(ROOT, '.env.local'), 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const [key, ...rest] = line.split('=');
  if (key && !key.startsWith('#') && rest.length) env[key.trim()] = rest.join('=').trim();
}

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key:    env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// ── Listar todos os arquivos recursivamente ───────────────────────────────────
function listFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...listFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

// ── Upload para Cloudinary ────────────────────────────────────────────────────
async function uploadFile(localPath, folder) {
  const bytes = readFileSync(localPath);
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `microraptor/${folder}`, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(bytes);
  });
}

// ── Processar todos os arquivos ───────────────────────────────────────────────
const staticDir = path.join(ROOT, 'public', 'fotosMembrosAtuais');
const files = listFiles(staticDir);

console.log(`📸 ${files.length} arquivos para migrar...\n`);

// mapa: caminho relativo (/fotosMembrosAtuais/...) → URL Cloudinary
const urlMap = {};

for (const file of files) {
  const relativePath = '/' + path.relative(path.join(ROOT, 'public'), file).replace(/\\/g, '/');
  const folder = 'fotosMembrosAtuais/' + path.relative(staticDir, path.dirname(file)).replace(/\\/g, '/');

  try {
    const url = await uploadFile(file, folder);
    urlMap[relativePath] = url;
    console.log(`✅ ${relativePath}`);
    console.log(`   → ${url}\n`);
  } catch (err) {
    console.log(`❌ Erro: ${relativePath} — ${err?.message}`);
  }
}

// ── Atualizar data.ts ─────────────────────────────────────────────────────────
console.log('\n📝 Atualizando data.ts...');
const dataPath = path.join(ROOT, 'src', 'app', 'areas', 'data.ts');
let dataContent = await readFile(dataPath, 'utf-8');

let count = 0;
for (const [localPath, cloudUrl] of Object.entries(urlMap)) {
  const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  const before = dataContent;
  dataContent = dataContent.replace(regex, cloudUrl);
  if (dataContent !== before) count++;
}

await writeFile(dataPath, dataContent, 'utf-8');
console.log(`✅ ${count} caminhos atualizados em data.ts`);
console.log('\n🎉 Concluído!');
