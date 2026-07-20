'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'carousel' | 'bastidores' | 'membros' | 'albuns' | 'inscricoes' | 'patrocinadores';

interface PhotoDoc {
  _id: string;
  src: string;
  type: 'image' | 'video';
  category: string;
  year?: number;
  order: number;
}

interface MemberDoc {
  _id: string;
  name: string;
  area: string;
  photo: string;
  isLeader: boolean;
}

const AREAS = [
  { slug: 'aerodinamica',       label: 'Aerodinâmica' },
  { slug: 'estabilidade',       label: 'Estabilidade e Controle' },
  { slug: 'desempenho',         label: 'Desempenho' },
  { slug: 'eletrica',           label: 'Elétrica' },
  { slug: 'cargas',             label: 'Cargas' },
  { slug: 'estruturas',         label: 'Estruturas' },
  { slug: 'plantas',            label: 'Plantas' },
  { slug: 'gestao',             label: 'Gestão' },
  { slug: 'fuselagem-e-laminacao', label: 'Fuselagem e Laminação' },
  { slug: 'cauda',                 label: 'Cauda' },
  { slug: 'asa',                   label: 'Asa' },
  { slug: 'aeroelasticidade',      label: 'Aeroelasticidade' },
  { slug: 'capitania',             label: 'Capitania' },
];

const YEARS = [2023, 2024, 2025, 2026];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MediaThumb({ src, type, onDelete }: { src: string; type: string; onDelete: () => void }) {
  return (
    <div className="relative group aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
      {type === 'video' ? (
        <video src={src} muted className="w-full h-full object-cover" />
      ) : (
        <Image src={src} alt="" fill sizes="200px" className="object-cover" />
      )}
      <button
        onClick={onDelete}
        className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg leading-none"
        title="Remover"
      >
        ×
      </button>
    </div>
  );
}

function UploadModal({
  title,
  fields,
  onClose,
  onSubmit,
  loading,
}: {
  title: string;
  fields: React.ReactNode;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-bold text-lg mb-6">{title}</h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {fields}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/15 text-gray-400 hover:text-white text-sm transition-colors">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#a80303] hover:bg-[#9b130f] text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Enviando…' : 'Salvar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function inputCls() {
  return 'w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#a80303]/60';
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function PhotoTab({ category }: { category: 'carousel' | 'bastidores' }) {
  const [items, setItems] = useState<PhotoDoc[]>([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await fetch(`/api/photos?category=${category}`);
    setItems(await res.json());
  };

  useEffect(() => { load(); }, [category]);

  const handleDelete = async (id: string) => {
    if (!confirm('Remover esta foto?')) return;
    await fetch(`/api/photos/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((p) => p._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set('category', category);
    await fetch('/api/photos', { method: 'POST', body: fd });
    setLoading(false);
    setModal(false);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">{items.length} itens</p>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#a80303] hover:bg-[#9b130f] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Adicionar
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <MediaThumb key={item._id} src={item.src} type={item.type} onDelete={() => handleDelete(item._id)} />
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <UploadModal
            title="Adicionar foto/vídeo"
            onClose={() => setModal(false)}
            onSubmit={handleSubmit}
            loading={loading}
            fields={
              <input name="file" type="file" accept="image/*,video/*" required className={inputCls()} />
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MembrosTab() {
  const [selectedArea, setSelectedArea] = useState(AREAS[0].slug);
  const [members, setMembers] = useState<MemberDoc[]>([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async (area: string) => {
    const res = await fetch(`/api/members?area=${area}`);
    setMembers(await res.json());
  };

  useEffect(() => { load(selectedArea); }, [selectedArea]);

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este membro?')) return;
    await fetch(`/api/members/${id}`, { method: 'DELETE' });
    setMembers((prev) => prev.filter((m) => m._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set('area', selectedArea);
    await fetch('/api/members', { method: 'POST', body: fd });
    setLoading(false);
    setModal(false);
    load(selectedArea);
  };

  return (
    <div>
      {/* Seletor de área */}
      <div className="flex flex-wrap gap-2 mb-6">
        {AREAS.map((a) => (
          <button
            key={a.slug}
            onClick={() => setSelectedArea(a.slug)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              selectedArea === a.slug
                ? 'bg-[#a80303] text-white'
                : 'bg-white/[0.06] text-gray-400 hover:text-white'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">{members.length} membros</p>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#a80303] hover:bg-[#9b130f] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Adicionar membro
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {members.map((m) => (
          <div key={m._id} className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-3 flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image src={m.photo} alt={m.name} fill sizes="80px" className="object-cover" />
            </div>
            <p className="text-white text-sm font-semibold text-center">{m.name}</p>
            {m.isLeader && (
              <span className="text-[10px] font-bold text-[#a80303] uppercase tracking-wider">Líder</span>
            )}
            <button
              onClick={() => handleDelete(m._id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-base leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <UploadModal
            title="Adicionar membro"
            onClose={() => setModal(false)}
            onSubmit={handleSubmit}
            loading={loading}
            fields={
              <>
                <input name="name" type="text" placeholder="Nome do membro" required className={inputCls()} />
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input name="isLeader" type="checkbox" value="true" className="accent-[#a80303]" />
                  É líder da área
                </label>
                <input name="file" type="file" accept="image/*" required className={inputCls()} />
              </>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AlbunsTab() {
  const [year, setYear] = useState(2025);
  const [items, setItems] = useState<PhotoDoc[]>([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async (y: number) => {
    const res = await fetch(`/api/photos?category=album&year=${y}`);
    setItems(await res.json());
  };

  useEffect(() => { load(year); }, [year]);

  const handleDelete = async (id: string) => {
    if (!confirm('Remover esta foto do álbum?')) return;
    await fetch(`/api/photos/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((p) => p._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set('category', 'album');
    fd.set('year', String(year));
    await fetch('/api/photos', { method: 'POST', body: fd });
    setLoading(false);
    setModal(false);
    load(year);
  };

  return (
    <div>
      {/* Seletor de ano */}
      <div className="flex gap-2 mb-6">
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              year === y ? 'bg-[#a80303] text-white' : 'bg-white/[0.06] text-gray-400 hover:text-white'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">{items.length} fotos em {year}</p>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#a80303] hover:bg-[#9b130f] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Adicionar foto
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <MediaThumb key={item._id} src={item.src} type={item.type} onDelete={() => handleDelete(item._id)} />
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <UploadModal
            title={`Adicionar foto — Álbum ${year}`}
            onClose={() => setModal(false)}
            onSubmit={handleSubmit}
            loading={loading}
            fields={
              <input name="file" type="file" accept="image/*,video/*" required className={inputCls()} />
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Inscrições PS ────────────────────────────────────────────────────────────

interface PSDoc {
  _id: string;
  nomeCompleto: string;
  curso: string;
  email: string;
  telefone: string;
  comoConheceu: string;
  periodo: string;
  previsaoConclusao: string;
  areas: string[];
  curriculo: string;
  comprovanteMatricula: string;
  historicoEscolar: string;
  texto: string;
  createdAt: string;
}

function InscricoesTab() {
  const [items, setItems] = useState<PSDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PSDoc | null>(null);

  useEffect(() => {
    fetch('/api/ps')
      .then((r) => r.json())
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  const exportCSV = () => {
    const headers = ['Nome', 'Curso', 'Email', 'Telefone', 'Como conheceu', 'Período', 'Previsão conclusão', 'Áreas', 'Data'];
    const rows = items.map((i) => [
      i.nomeCompleto, i.curso, i.email, i.telefone, i.comoConheceu,
      i.periodo, i.previsaoConclusao, i.areas.join(' | '),
      new Date(i.createdAt).toLocaleDateString('pt-BR'),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'inscricoes_ps.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-[#a80303] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">{items.length} inscrição(ões)</p>
        <button
          onClick={exportCSV}
          disabled={items.length === 0}
          className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-40"
        >
          ↓ Exportar CSV
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-20">Nenhuma inscrição recebida ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Nome</th>
                <th className="text-left px-4 py-3">Curso</th>
                <th className="text-left px-4 py-3">Período</th>
                <th className="text-left px-4 py-3">Áreas</th>
                <th className="text-left px-4 py-3">Data</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item._id} className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                  <td className="px-4 py-3 font-medium text-white">{item.nomeCompleto}</td>
                  <td className="px-4 py-3 text-gray-400">{item.curso}</td>
                  <td className="px-4 py-3 text-gray-400">{item.periodo}</td>
                  <td className="px-4 py-3 text-gray-400">{item.areas.join(', ')}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(item)}
                      className="text-xs text-[#a80303] hover:text-white transition-colors"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de detalhes */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-white font-black text-lg">{selected.nomeCompleto}</h3>
                <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xl leading-none">×</button>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                {[
                  ['Curso', selected.curso],
                  ['E-mail', selected.email],
                  ['Telefone', selected.telefone],
                  ['Como conheceu', selected.comoConheceu],
                  ['Período', selected.periodo],
                  ['Previsão de conclusão', selected.previsaoConclusao],
                  ['Áreas', selected.areas.join(', ')],
                  ['Data', new Date(selected.createdAt).toLocaleString('pt-BR')],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-gray-500 min-w-[160px]">{label}</span>
                    <span className="text-gray-200">{value}</span>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-white/[0.08]">
                  <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">Arquivos enviados</p>
                  <div className="flex flex-col gap-2">
                    {[
                      ['Currículo', selected.curriculo],
                      ['Comprovante de matrícula', selected.comprovanteMatricula],
                      ['Histórico escolar', selected.historicoEscolar],
                      ['Texto de apresentação', selected.texto],
                    ].map(([label, path]) => (
                      <a
                        key={label as string}
                        href={path as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
                      >
                        <span className="text-gray-300 text-xs">{label as string}</span>
                        <span className="text-[#a80303] text-xs">Abrir ↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Patrocinadores Tab ───────────────────────────────────────────────────────

interface SponsorDoc { _id: string; name: string; src: string; site: string; category: string; }

const SPONSOR_CATEGORIES = ['Patrocinador', 'Parceiro', 'Institucional', 'Software', 'Material'];

function PatrocinadoresTab() {
  const [items, setItems]   = useState<SponsorDoc[]>([]);
  const [modal, setModal]   = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await fetch('/api/sponsors');
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este patrocinador?')) return;
    await fetch(`/api/sponsors/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((s) => s._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await fetch('/api/sponsors', { method: 'POST', body: fd });
    setLoading(false);
    setModal(false);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">{items.length} patrocinadores</p>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#a80303] hover:bg-[#9b130f] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + Adicionar
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <div key={item._id} className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 p-3 flex flex-col items-center gap-2">
            <Image src={item.src} alt={item.name} width={100} height={60} className="object-contain max-h-14 w-full" />
            <p className="text-gray-400 text-xs text-center truncate w-full">{item.name}</p>
            <span className="text-[10px] text-gray-600 border border-white/10 px-2 py-0.5 rounded-full">{item.category}</span>
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg leading-none"
              title="Remover"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <UploadModal
            title="Adicionar patrocinador"
            onClose={() => setModal(false)}
            onSubmit={handleSubmit}
            loading={loading}
            fields={
              <>
                <input name="name" type="text" placeholder="Nome do patrocinador" required className={inputCls()} />
                <input name="site" type="url" placeholder="Site (https://...)" className={inputCls()} />
                <select name="category" className={inputCls()}>
                  {SPONSOR_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input name="file" type="file" accept="image/*" required className={inputCls()} />
              </>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('carousel');
  const [seeding, setSeeding] = useState(false);
  const [unseeding, setUnseeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');
  const pinRef = useRef<HTMLInputElement>(null);

  // Verifica se já está autenticado
  useEffect(() => {
    fetch('/api/admin/verify')
      .then((r) => { if (r.ok) setIsAdmin(true); })
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      setIsAdmin(true);
    } else {
      setError('PIN incorreto. Tente novamente.');
      setPin('');
      pinRef.current?.focus();
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAdmin(false);
    setPin('');
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg('');
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    const data = await res.json();
    setSeedMsg(`✓ Importado: ${data.inserted} inseridos, ${data.skipped} já existiam.`);
    setSeeding(false);
  };

  const handleUnseed = async () => {
    if (!confirm('Isso vai remover TODOS os dados do banco (fotos e membros). Tem certeza?')) return;
    setUnseeding(true);
    setSeedMsg('');
    const res = await fetch('/api/admin/unseed', { method: 'DELETE' });
    const data = await res.json();
    setSeedMsg(`✓ Desimportado: ${data.removedPhotos} fotos e ${data.removedMembers} membros removidos do banco.`);
    setUnseeding(false);
  };

  if (checking) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#a80303] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Tela de login ──────────────────────────────────────────────────────────
  if (!isAdmin) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="flex justify-center mb-8">
            <Image src="/microraptor.png" alt="Microraptor" width={64} height={64} className="drop-shadow-[0_0_24px_rgba(168,3,3,0.8)]" />
          </div>
          <h1 className="text-white text-2xl font-black text-center mb-2">Painel Admin</h1>
          <p className="text-gray-500 text-sm text-center mb-8">Insira o PIN secreto para continuar</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              ref={pinRef}
              type="password"
              placeholder="PIN secreto"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white text-center text-2xl tracking-[0.5em] placeholder:text-gray-700 placeholder:tracking-normal focus:outline-none focus:border-[#a80303]/60"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold py-4 rounded-2xl transition-all"
            >
              Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  const TABS: { id: Tab; label: string }[] = [
    { id: 'carousel',        label: 'Carousel' },
    { id: 'bastidores',      label: 'Bastidores' },
    { id: 'membros',         label: 'Membros' },
    { id: 'albuns',          label: 'Álbuns' },
    { id: 'inscricoes',      label: 'Inscrições PS' },
    { id: 'patrocinadores',  label: 'Patrocinadores' },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/microraptor.png" alt="" width={32} height={32} />
            <span className="font-black text-lg">Admin</span>
            <span className="text-[10px] font-bold text-[#a80303] border border-[#a80303]/40 px-2 py-0.5 rounded-full">RESTRITO</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSeed}
              disabled={seeding || unseeding}
              className="text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {seeding ? 'Importando…' : '↑ Importar dados existentes'}
            </button>
            <button
              onClick={handleUnseed}
              disabled={seeding || unseeding}
              className="text-xs text-red-500/70 hover:text-red-400 border border-red-500/20 hover:border-red-400/50 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {unseeding ? 'Removendo…' : '↓ Desimportar'}
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors ml-2"
            >
              Sair
            </button>
          </div>
        </div>
        {seedMsg && (
          <div className="max-w-7xl mx-auto px-6 pb-3">
            <p className="text-xs text-emerald-400">{seedMsg}</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1 border-b border-white/[0.06] mt-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
                tab === t.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t.label}
              {tab === t.id && (
                <motion.span
                  layoutId="admin-tab-line"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Conteúdo da aba */}
        <div className="py-10">
          {tab === 'carousel'       && <PhotoTab category="carousel" />}
          {tab === 'bastidores'     && <PhotoTab category="bastidores" />}
          {tab === 'membros'        && <MembrosTab />}
          {tab === 'albuns'         && <AlbunsTab />}
          {tab === 'inscricoes'     && <InscricoesTab />}
          {tab === 'patrocinadores' && <PatrocinadoresTab />}
        </div>
      </div>
    </div>
  );
}
