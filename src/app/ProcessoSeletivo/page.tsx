'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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
    desc: 'Preencha o formulário abaixo com seus dados e área de interesse. As inscrições são gratuitas e abertas a todos os alunos da UFJF.',
  },
  {
    num: '02',
    title: 'Análise de Perfil',
    desc: 'A equipe analisa os formulários e entra em contato com os candidatos selecionados para a próxima etapa.',
  },
  {
    num: '03',
    title: 'Entrevista / Dinâmica',
    desc: 'Bate-papo com os líderes da área de interesse. Não exigimos experiência prévia — buscamos curiosidade, comprometimento e vontade de aprender.',
  },
  {
    num: '04',
    title: 'Resultado',
    desc: 'Os aprovados recebem o contato para integração à equipe e participação nas primeiras reuniões.',
  },
];

const perfilIdeal = [
  { icon: 'mdi:airplane', text: 'Paixão por aviação e engenharia' },
  { icon: 'mdi:book-open-variant', text: 'Comprometimento com estudos e projetos' },
  { icon: 'mdi:account-group', text: 'Trabalho em equipe e comunicação' },
  { icon: 'mdi:magnify', text: 'Curiosidade e vontade de aprender' },
  { icon: 'mdi:clock-outline', text: 'Disponibilidade para reuniões semanais' },
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

const fieldCls =
  'w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#a80303]/60 transition-colors';

// ─── Formulário ───────────────────────────────────────────────────────────────

function InscricaoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [curriculo, setCurriculo] = useState<File | null>(null);
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [historico, setHistorico] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');
  const [error, setError] = useState('');

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

    if (areas.length === 0) {
      setError('Selecione pelo menos uma área de interesse.');
      return;
    }
    if (!curriculo) {
      setError('Anexe o currículo (ou comprovante de matrícula para candidatos do 1º período).');
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
    // áreas vêm de estado (botões não entram no FormData)
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

      {/* Dados pessoais */}
      <section>
        <SectionLabel>Dados pessoais</SectionLabel>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="nomeCompleto"
            placeholder="Nome completo"
            required
            className={fieldCls}
          />
          <input
            name="curso"
            placeholder="Curso"
            required
            className={fieldCls}
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            required
            className={fieldCls}
          />
          <input
            name="telefone"
            placeholder="Telefone para contato"
            required
            className={fieldCls}
          />
          <div className="relative">
            <select
              name="periodo"
              required
              defaultValue=""
              className={`${fieldCls} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-black">
                Período atual
              </option>
              {PERIODOS.map((p) => (
                <option key={p} value={p} className="bg-black">
                  {p} período
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              width={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <input
            name="previsaoConclusao"
            placeholder="Previsão de conclusão (ex: 2027.1)"
            required
            className={fieldCls}
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
            className={`${fieldCls} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-black">
              Selecione uma opção
            </option>
            {COMO_CONHECEU.map((o) => (
              <option key={o} value={o} className="bg-black">
                {o}
              </option>
            ))}
          </select>
          <Icon
            icon="mdi:chevron-down"
            width={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </section>

      {/* Áreas */}
      <section>
        <SectionLabel>Áreas de interesse</SectionLabel>
        <p className="text-gray-500 text-xs mb-4">Selecione de 1 a 3 áreas de preferência</p>
        <div className="flex flex-wrap gap-2">
          {AREAS.map((a) => {
            const selected = areas.includes(a.slug);
            const disabled = !selected && areas.length >= 3;
            return (
              <button
                key={a.slug}
                type="button"
                onClick={() => toggleArea(a.slug)}
                disabled={disabled}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  selected
                    ? 'bg-[#a80303] border-[#a80303] text-white'
                    : 'bg-transparent border-white/15 text-gray-400 hover:text-white hover:border-white/30'
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {a.label}
              </button>
            );
          })}
        </div>
        {areas.length > 0 && (
          <p className="text-gray-500 text-xs mt-3">{areas.length}/3 selecionadas</p>
        )}
      </section>

      {/* Documentos */}
      <section>
        <SectionLabel>Envio de documentos</SectionLabel>
        <p className="text-gray-500 text-xs mb-5 leading-relaxed">
          Conforme o edital, todos os arquivos devem ser identificados da seguinte forma:{' '}
          <span className="text-gray-300 font-medium">
            NOME E SOBRENOME - IDENTIFICAÇÃO DO ARQUIVO
          </span>{' '}
          <span className="text-gray-600">(exemplo: RAFAEL MOREIRA - CURRÍCULO)</span>
        </p>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1.5">
              Currículo
            </label>
            <p className="text-gray-500 text-xs mb-2">
              Candidatos do 1º período podem enviar o comprovante de matrícula novamente neste
              campo.
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={(e) => setCurriculo(e.target.files?.[0] ?? null)}
              className={`${fieldCls} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1.5">
              Comprovante de matrícula
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => setComprovante(e.target.files?.[0] ?? null)}
              className={`${fieldCls} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1.5">
              Histórico escolar
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => setHistorico(e.target.files?.[0] ?? null)}
              className={`${fieldCls} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-1.5">
              Texto de apresentação
            </label>
            <p className="text-gray-500 text-xs mb-2 leading-relaxed">
              Insira um breve texto sobre seus anseios de participação na equipe e justifique
              a(s) área(s) de interesse. A redação deverá ser padronizada e conter no máximo
              uma página, em Arial 12.
            </p>
            <input
              type="file"
              name="texto"
              accept=".pdf,.doc,.docx"
              required
              className={`${fieldCls} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#a80303]/20 file:text-[#a80303] hover:file:bg-[#a80303]/30 cursor-pointer`}
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
              <Image
                src="/microraptor.png"
                alt="Microraptor"
                width={90}
                height={90}
                className="relative drop-shadow-[0_0_40px_rgba(168,3,3,0.9)]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-6"
          >
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
            <span className="bg-gradient-to-br from-white via-white/90 to-[#a80303] bg-clip-text text-transparent">
              Processo
            </span>
            <br />
            <span className="bg-gradient-to-br from-white via-white/90 to-[#a80303] bg-clip-text text-transparent">
              Seletivo
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-10"
          >
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

      {/* ══ ETAPAS ════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(152,1,1,0.07),transparent)]" />
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16 text-center">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Como funciona
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Etapas do PS
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {etapas.map((e, i) => (
              <motion.div
                key={e.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:border-[#a80303]/30 transition-colors duration-300"
              >
                <span className="text-[#a80303]/40 font-black text-5xl absolute top-5 right-6 select-none">
                  {e.num}
                </span>
                <h3 className="text-white font-black text-xl mb-3">{e.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Perfil ideal
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Nao exigimos experiencia previa em nenhuma area. O que importa e a vontade de
              aprender e contribuir.
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
                <Icon
                  icon={item.icon}
                  width={22}
                  className="text-[#a80303] flex-shrink-0"
                />
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
              Inscricao
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Formulario de inscricao
            </h2>
            <p className="text-gray-400">
              Preencha todos os campos. Entraremos em contato em ate 5 dias uteis.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12">
            <InscricaoForm />
          </div>
        </div>
      </section>

      {/* ══ CTA DUVIDAS ═══════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <FadeIn className="max-w-3xl mx-auto text-center relative z-10">
          <div className="rounded-3xl p-px bg-gradient-to-br from-[#a80303]/60 via-[#9b130f]/30 to-[#980101]/60">
            <div className="rounded-3xl bg-[#050000] px-10 py-14">
              <div className="w-12 h-1 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full mx-auto mb-8" />
              <h2 className="text-3xl font-black text-white mb-4">Ficou com alguma duvida?</h2>
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
