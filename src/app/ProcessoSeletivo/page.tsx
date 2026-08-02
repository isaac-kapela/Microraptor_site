'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#a80303] whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const etapas = [
  {
    num: '01',
    title: 'Inscrição',
    desc: 'Preencha o formulário com seus dados e área de interesse. As inscrições são gratuitas e abertas a todos os alunos da UFJF.',
  },
  {
    num: '02',
    title: 'Análise de Perfil',
    desc: 'A equipe analisa os formulários e entra em contato com os candidatos selecionados para a próxima etapa.',
  },
  {
    num: '03',
    title: 'Entrevista / Dinâmica',
    desc: 'Bate-papo com alguns membros da equipe. Não exigimos experiência prévia — buscamos curiosidade e comprometimento.',
  },
  {
    num: '04',
    title: 'Resultado',
    desc: 'Os aprovados recebem o contato para iniciar o trainee, começar a capacitação e acompanhar as reuniões.',
  },
];

const perfilIdeal = [
  { icon: 'mdi:airplane',          text: 'Paixão por aviação e engenharia' },
  { icon: 'mdi:book-open-variant', text: 'Comprometimento com estudos e projetos' },
  { icon: 'mdi:account-group',     text: 'Trabalho em equipe e comunicação' },
  { icon: 'mdi:magnify',           text: 'Curiosidade e vontade de aprender' },
  { icon: 'mdi:clock-outline',     text: 'Disponibilidade para reuniões semanais' },
  { icon: 'mdi:lightbulb-outline', text: 'Proatividade e iniciativa' },
];

const AREAS = [
  { slug: 'aerodinamica',     label: 'Aerodinâmica' },
  { slug: 'estabilidade',     label: 'Estabilidade e Controle' },
  { slug: 'desempenho',       label: 'Desempenho' },
  { slug: 'eletrica',         label: 'Elétrica' },
  { slug: 'cargas',           label: 'Cargas' },
  { slug: 'estruturas',       label: 'Estruturas' },
  { slug: 'plantas',          label: 'Plantas' },
  { slug: 'gestao',           label: 'Gestão' },
  { slug: 'aeroelasticidade', label: 'Aeroelasticidade' },
];

const PERIODOS = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º', '11º', '12º'];

const COMO_CONHECEU = [
  'Redes sociais',
  'Amigos ou colegas',
  'Stand ou evento da equipe',
  'Aula de introdução',
  'Indicação de professor',
  'Site ou internet',
  'Outro',
];

const HORAS = [
  'Menos de 5h por semana',
  'Entre 5h e 10h por semana',
  'Entre 10h e 15h por semana',
  'Mais de 15h por semana',
];

const fieldCls =
  'w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none transition-colors';

// ─── Formulário ───────────────────────────────────────────────────────────────

function StepIndicator({ s1, s2, s3 }: { s1: boolean; s2: boolean; s3: boolean }) {
  const steps = [
    { label: 'Dados pessoais', done: s1 },
    { label: 'Áreas',          done: s2 },
    { label: 'Documentos',     done: s3 },
  ];
  return (
    <div className="flex items-start mb-10">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-start flex-1">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all duration-300 ${
              s.done
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                : 'border-white/20 bg-white/[0.04] text-gray-500'
            }`}>
              {s.done ? <Icon icon="mdi:check" width={14} /> : i + 1}
            </div>
            <span className={`text-[9px] font-semibold text-center leading-tight transition-colors duration-300 ${s.done ? 'text-emerald-400' : 'text-gray-600'}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mt-4 mx-2 transition-colors duration-500 ${s.done ? 'bg-emerald-500/40' : 'bg-white/[0.08]'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function InscricaoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>('/areas.pdf');
  const [curriculo, setCurriculo]     = useState<File | null>(null);
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [historico, setHistorico]     = useState<File | null>(null);
  const [loading, setLoading]         = useState(false);
  const [successEmail, setSuccessEmail] = useState('');
  const [error, setError]             = useState('');
  const [filled, setFilled]           = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/areas-pdf?type=areas')
      .then((r) => r.json())
      .then((data) => { if (data?.url) setPdfUrl(data.url); })
      .catch(() => {});
  }, []);

  const inlineUrl = pdfUrl.startsWith('http') ? '/api/areas-pdf/view?type=areas' : pdfUrl;

  const mark = (name: string, val: string | boolean) =>
    setFilled((prev) => ({ ...prev, [name]: typeof val === 'boolean' ? val : val.trim().length > 0 }));

  const ic = (name: string) =>
    `${fieldCls} ${filled[name] ? 'border-emerald-500/40 focus:border-emerald-500/60' : 'focus:border-[#a80303]/60'}`;

  const s1Done = !!(filled.nomeCompleto && filled.curso && filled.email && filled.telefone && filled.periodo && filled.previsaoConclusao && filled.horasDisponiveis && filled.comoConheceu);
  const s2Done = areas.length === 3;
  const s3Done = !!(curriculo && comprovante && historico);

  const toggleArea = (slug: string) => {
    setAreas((prev) => {
      if (prev.includes(slug)) return prev.filter((a) => a !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (areas.length < 3) {
      setError('Selecione exatamente 3 áreas de interesse.');
      return;
    }
    if (!curriculo) {
      setError('Anexe o currículo.');
      return;
    }
    if (!comprovante) {
      setError('Anexe o comprovante de matrícula.');
      return;
    }
    if (!historico) {
      setError('Anexe o histórico escolar.');
      return;
    }

    setLoading(true);

    const fd = new FormData(e.currentTarget);
    areas.forEach((a) => fd.append('areas', a));
    fd.set('curriculo', curriculo);
    fd.set('comprovanteMatricula', comprovante);
    fd.set('historicoEscolar', historico);

    const emailVal = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value ?? '';

    const res = await fetch('/api/ps', { method: 'POST', body: fd });
    setLoading(false);

    if (res.ok) {
      setSuccessEmail(emailVal);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Erro ao enviar inscrição. Tente novamente.');
    }
  };

  if (successEmail) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <Icon icon="mdi:check-circle" width={32} className="text-emerald-400" />
        </div>
        <h3 className="text-white text-2xl font-black mb-3">Inscrição enviada com sucesso!</h3>
        <p className="text-gray-400 max-w-sm mx-auto">
          Entraremos em contato pelo e-mail{' '}
          <span className="text-white">{successEmail}</span> em até 5 dias úteis.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">

      <StepIndicator s1={s1Done} s2={s2Done} s3={s3Done} />

      {/* Dados pessoais */}
      <section>
        <SectionLabel>Dados pessoais</SectionLabel>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="nomeCompleto"
            placeholder="Nome completo"
            required
            onChange={(e) => mark('nomeCompleto', e.target.value)}
            className={ic('nomeCompleto')}
          />
          <input
            name="curso"
            placeholder="Curso"
            required
            onChange={(e) => mark('curso', e.target.value)}
            className={ic('curso')}
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => mark('email', e.target.value)}
            className={ic('email')}
          />
          <input
            name="telefone"
            placeholder="Telefone para contato"
            required
            onChange={(e) => mark('telefone', e.target.value)}
            className={ic('telefone')}
          />
          <div className="relative">
            <select
              name="periodo"
              required
              defaultValue=""
              onChange={(e) => mark('periodo', e.target.value)}
              className={`${ic('periodo')} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-black">Período atual</option>
              {PERIODOS.map((p) => (
                <option key={p} value={p} className="bg-black">{p} período</option>
              ))}
            </select>
            <Icon icon="mdi:chevron-down" width={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <input
            name="previsaoConclusao"
            placeholder="Previsão de conclusão (ex: 2027.1)"
            required
            onChange={(e) => mark('previsaoConclusao', e.target.value)}
            className={ic('previsaoConclusao')}
          />
        </div>
      </section>

      {/* Como conheceu */}
      <section>
        <SectionLabel>Como conheceu a equipe?</SectionLabel>
        <div className="relative">
          <select
            name="comoConheceu"
            required
            defaultValue=""
            onChange={(e) => mark('comoConheceu', e.target.value)}
            className={`${ic('comoConheceu')} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-black">Selecione uma opção</option>
            {COMO_CONHECEU.map((o) => (
              <option key={o} value={o} className="bg-black">{o}</option>
            ))}
          </select>
          <Icon icon="mdi:chevron-down" width={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </section>

      {/* Disponibilidade */}
      <section>
        <SectionLabel>Disponibilidade semanal</SectionLabel>
        <div className="relative">
          <select
            name="horasDisponiveis"
            required
            defaultValue=""
            onChange={(e) => mark('horasDisponiveis', e.target.value)}
            className={`${ic('horasDisponiveis')} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-black">Quantas horas por semana você pode dedicar?</option>
            {HORAS.map((h) => (
              <option key={h} value={h} className="bg-black">{h}</option>
            ))}
          </select>
          <Icon icon="mdi:chevron-down" width={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </section>

      {/* Áreas */}
      <section>
        <SectionLabel>Áreas de interesse</SectionLabel>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <p className="text-gray-500 text-xs">Selecione exatamente 3 áreas de preferência</p>
            <p className="text-gray-600 text-xs mt-0.5">Não conhece as áreas? Veja o documento antes de escolher.</p>
          </div>
          <div className="flex gap-2">
            <a
              href={inlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a80303] border border-[#a80303]/40 bg-[#a80303]/10 hover:bg-[#a80303]/20 px-3 py-1.5 rounded-full transition-all"
            >
              <Icon icon="mdi:eye-outline" width={14} />
              Ver áreas
            </a>
            <a
              href={pdfUrl}
              download="Áreas Microraptor.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 border border-white/15 hover:text-white hover:border-white/30 px-3 py-1.5 rounded-full transition-all"
            >
              <Icon icon="mdi:download-outline" width={14} />
              Baixar PDF
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {AREAS.map((a) => {
            const orderIndex = areas.indexOf(a.slug);
            const selected = orderIndex !== -1;
            const disabled = !selected && areas.length >= 3;
            const ordinals = ['1ª opção', '2ª opção', '3ª opção'];
            return (
              <button
                key={a.slug}
                type="button"
                onClick={() => toggleArea(a.slug)}
                disabled={disabled}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  selected
                    ? 'bg-[#a80303] border-[#a80303] text-white'
                    : 'bg-transparent border-white/15 text-gray-400 hover:text-white hover:border-white/30'
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {selected && (
                  <span className="text-[10px] font-bold opacity-70 bg-white/20 px-1.5 py-0.5 rounded-full">
                    {ordinals[orderIndex]}
                  </span>
                )}
                {a.label}
              </button>
            );
          })}
        </div>
        <p className={`text-xs mt-3 ${areas.length === 3 ? 'text-emerald-400' : 'text-gray-500'}`}>
          {areas.length}/3 selecionadas{areas.length === 3 ? ' ✓' : ''}
        </p>
      </section>

      {/* Documentos */}
      <section>
        <SectionLabel>Envio de documentos</SectionLabel>
        <p className="text-gray-500 text-xs mb-5 leading-relaxed">
          Conforme o edital, todos os arquivos devem ser identificados da seguinte forma:{' '}
          <span className="text-gray-300 font-medium">NOME E SOBRENOME - IDENTIFICAÇÃO DO ARQUIVO</span>{' '}
          <span className="text-gray-600">(exemplo: RAFAEL MOREIRA - CURRÍCULO)</span>
        </p>
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="curriculo" className="block text-sm text-gray-300 font-medium mb-1.5">
              Currículo
            </label>
            <input
              id="curriculo"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={(e) => { const f = e.target.files?.[0] ?? null; setCurriculo(f); mark('curriculo', !!f); }}
              className={`${fieldCls} ${filled.curriculo ? 'border-emerald-500/40' : 'focus:border-[#a80303]/60'} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
            />
          </div>
          <div>
            <label htmlFor="comprovanteMatricula" className="block text-sm text-gray-300 font-medium mb-1.5">
              Comprovante de matrícula
            </label>
            <input
              id="comprovanteMatricula"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => { const f = e.target.files?.[0] ?? null; setComprovante(f); mark('comprovante', !!f); }}
              className={`${fieldCls} ${filled.comprovante ? 'border-emerald-500/40' : 'focus:border-[#a80303]/60'} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
            />
          </div>
          <div>
            <label htmlFor="historicoEscolar" className="block text-sm text-gray-300 font-medium mb-1.5">
              Histórico escolar
            </label>
            <input
              id="historicoEscolar"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => { const f = e.target.files?.[0] ?? null; setHistorico(f); mark('historico', !!f); }}
              className={`${fieldCls} ${filled.historico ? 'border-emerald-500/40' : 'focus:border-[#a80303]/60'} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
            />
          </div>
          <div>
            <label htmlFor="texto" className="block text-sm text-gray-300 font-medium mb-1.5">
              Texto de apresentação
            </label>
            <p className="text-gray-500 text-xs mb-2 leading-relaxed">
              Breve texto sobre seus anseios de participação e justificativa da(s) área(s) de interesse.
              Máximo uma página, Arial 12.
            </p>
            <input
              id="texto"
              type="file"
              name="texto"
              accept=".pdf,.doc,.docx"
              required
              className={`${fieldCls} focus:border-[#a80303]/60 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
            />
          </div>
        </div>
      </section>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold text-base transition-all shadow-[0_0_40px_rgba(152,1,1,0.3)] hover:shadow-[0_0_60px_rgba(168,3,3,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando...
          </span>
        ) : (
          'Enviar inscrição'
        )}
      </motion.button>
    </form>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function ProcessoSeletivoPage() {
  const [editalUrl, setEditalUrl]   = useState<string>('/edital.pdf');

  useEffect(() => {
    fetch('/api/areas-pdf?type=edital')
      .then((r) => r.json())
      .then((data) => { if (data?.url) setEditalUrl(data.url); })
      .catch(() => {});
  }, []);

  const inlineEdital = editalUrl.startsWith('http') ? '/api/areas-pdf/view?type=edital' : editalUrl;

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(152,1,1,0.20),transparent)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#a80303]/25 blur-2xl scale-150" />
              <Image src="/microraptor.png" alt="Microraptor" width={90} height={90} className="relative drop-shadow-[0_0_40px_rgba(168,3,3,0.9)]" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center mb-6">
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] px-4 py-1.5 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Inscrições abertas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9 }}
            className="text-[clamp(2.8rem,10vw,6.5rem)] font-black tracking-tighter leading-none mb-6"
          >
            <span className="bg-gradient-to-br from-white via-white/90 to-[#a80303] bg-clip-text text-transparent">Processo</span>
            <br />
            <span className="bg-gradient-to-br from-white via-white/90 to-[#a80303] bg-clip-text text-transparent">Seletivo</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Faça parte da equipe de Aerodesign da UFJF. Unimos estudantes de todos os cursos
            para projetar, construir e voar aeronaves de competição.
          </motion.p>

          <motion.a
            href="#formulario"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold px-10 py-4 rounded-2xl text-base shadow-[0_0_40px_rgba(152,1,1,0.4)] hover:shadow-[0_0_60px_rgba(168,3,3,0.6)] transition-all duration-300"
          >
            Quero me inscrever
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.a>
        </div>
      </section>

      {/* ══ ETAPAS — TIMELINE ═════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(152,1,1,0.07),transparent)]" />
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16 text-center">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Como funciona
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Etapas do PS</h2>
          </FadeIn>

          {/* Desktop timeline */}
          <div className="hidden md:flex items-start">
            {etapas.map((e, i) => (
              <div key={e.num} className="flex-1 flex flex-col items-center relative">
                {i < etapas.length - 1 && (
                  <div className="absolute left-1/2 top-5 w-full h-px bg-gradient-to-r from-[#a80303]/50 to-[#a80303]/10 z-0" />
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative z-10 w-10 h-10 rounded-full border-2 border-[#a80303]/60 bg-[#a80303]/10 flex items-center justify-center font-black text-sm text-[#a80303] mb-6 shadow-[0_0_20px_rgba(152,1,1,0.15)]"
                >
                  {e.num}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.1 }}
                  className="text-center px-3"
                >
                  <h3 className="text-white font-black text-base mb-2">{e.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{e.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile timeline */}
          <div className="flex md:hidden flex-col">
            {etapas.map((e, i) => (
              <motion.div
                key={e.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-9 h-9 rounded-full border-2 border-[#a80303]/60 bg-[#a80303]/10 flex items-center justify-center font-black text-xs text-[#a80303] shadow-[0_0_16px_rgba(152,1,1,0.15)]">
                    {e.num}
                  </div>
                  {i < etapas.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-[#a80303]/40 to-transparent mt-2 mb-2 min-h-[2rem]" />
                  )}
                </div>
                <div className={i < etapas.length - 1 ? 'pb-8' : ''}>
                  <h3 className="text-white font-black text-base mb-1 mt-1">{e.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA após etapas */}
          <FadeIn delay={0.3} className="flex justify-center mt-14">
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 border border-[#a80303]/50 text-[#a80303] hover:bg-[#a80303]/10 font-bold px-8 py-3 rounded-2xl text-sm transition-all duration-300"
            >
              Já entendi — quero me inscrever
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ══ PERFIL IDEAL ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(152,1,1,0.07),transparent)]" />

        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16 text-center">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              O que buscamos
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Perfil ideal</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Não exigimos experiência prévia em nenhuma área. O que importa é a vontade de aprender e contribuir.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {perfilIdeal.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4"
              >
                <Icon icon={item.icon} width={22} className="text-[#a80303] flex-shrink-0" />
                <p className="text-gray-300 text-sm font-medium leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO ════════════════════════════════════════════════════════ */}
      <section id="formulario" className="relative py-24 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(152,1,1,0.08),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Inscrição
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Formulário de inscrição
            </h2>
            <p className="text-gray-400 mb-6">
              Preencha todos os campos. Entraremos em contato em até 5 dias úteis.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={inlineEdital}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a80303] border border-[#a80303]/40 bg-[#a80303]/10 hover:bg-[#a80303]/20 px-4 py-2 rounded-full transition-all"
              >
                <Icon icon="mdi:file-document-outline" width={14} />
                Ver edital
              </a>
              <a
                href={editalUrl}
                download
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 border border-white/15 hover:text-white hover:border-white/30 px-4 py-2 rounded-full transition-all"
              >
                <Icon icon="mdi:download-outline" width={14} />
                Baixar edital
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12">
            <InscricaoForm />
          </div>
        </div>
      </section>

      {/* ══ CTA DÚVIDAS ═══════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <FadeIn className="max-w-3xl mx-auto text-center relative z-10">
          <div className="rounded-3xl p-px bg-gradient-to-br from-[#a80303]/60 via-[#9b130f]/30 to-[#980101]/60">
            <div className="rounded-3xl bg-[#050000] px-10 py-14">
              <div className="w-12 h-1 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full mx-auto mb-8" />
              <h2 className="text-3xl font-black text-white mb-4">Ficou com alguma dúvida?</h2>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                Fale com a gente pelo WhatsApp ou Instagram. Respondemos rapidinho.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://wa.me/553299310160?text=Ol%C3%A1%21%20Tenho%20d%C3%BAvidas%20sobre%20o%20processo%20seletivo%20da%20Microraptor."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a80303] to-[#980101] text-white font-bold px-8 py-3 rounded-2xl transition-all"
                >
                  WhatsApp
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/microraptorufjf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border border-white/15 text-gray-300 hover:text-white font-bold px-8 py-3 rounded-2xl transition-all hover:border-white/30"
                >
                  Instagram
                </motion.a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
