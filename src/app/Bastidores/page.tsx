'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

// ─── Dados ────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: 'projeto',
    label: 'Projeto',
    abbr: 'PRJ',
    icon: '',
    title: 'O Projeto',
    description:
      'O processo completo de concepção da aeronave — desde as primeiras análises aerodinâmicas até os modelos CAD finalizados. Aqui você acompanha as decisões de projeto que definiram cada edição.',
    videos: [
      { title: 'Projeto 2024 — Visão Geral', youtubeId: '' },
      { title: 'Análise Aerodinâmica', youtubeId: '' },
      { title: 'Modelagem CAD', youtubeId: '' },
    ],
  },
  {
    id: 'fabricacao',
    label: 'Fabricação',
    abbr: 'FAB',
    icon: '',
    title: 'Fabricação',
    description:
      'Da matéria-prima à aeronave montada. Registros em vídeo das etapas de corte, laminação em fibra de carbono, montagem e integração dos sistemas elétricos.',
    videos: [
      { title: 'Laminação em Fibra de Carbono', youtubeId: '' },
      { title: 'Montagem da Estrutura', youtubeId: '' },
      { title: 'Integração Elétrica', youtubeId: '' },
    ],
  },
  {
    id: 'voo',
    label: 'Voo',
    abbr: 'VOO',
    icon: '',
    title: 'Voo',
    description:
      'Os momentos mais esperados — testes de voo, ajustes em campo e a performance final na competição. Reviva cada decolagem.',
    videos: [
      { title: 'Primeiro Voo de Teste', youtubeId: '' },
      { title: 'Dia de Competição', youtubeId: '' },
      { title: 'Compilado de Voos', youtubeId: '' },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
    <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
      {children}
    </span>
  );
}

function VideoCard({ title, youtubeId }: { title: string; youtubeId: string }) {
  const [hovered, setHovered] = useState(false);

  if (youtubeId) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03]">
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-gray-300">{title}</p>
        </div>
      </div>
    );
  }

  // Placeholder quando não há YouTube ID
  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] hover:border-[#a80303]/40 transition-all duration-300 cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
    >
      <div className="relative w-full aspect-video bg-white/[0.03] flex items-center justify-center">
        {/* Grid decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#980101]/10 to-transparent" />

        <motion.div
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex flex-col items-center gap-3"
        >
          <div className="w-14 h-14 rounded-full bg-[#980101]/25 border border-[#a80303]/50 flex items-center justify-center shadow-[0_0_24px_rgba(168,3,3,0.4)]">
            <svg className="w-6 h-6 text-[#a80303] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-xs text-gray-500 tracking-wider uppercase">Em breve</span>
        </motion.div>
      </div>
      <div className="px-4 py-3 border-t border-white/[0.05]">
        <p className="text-sm font-medium text-gray-400">{title}</p>
      </div>
    </motion.div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function BastidoresPage() {
  const [activeSection, setActiveSection] = useState('projeto');

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(152,1,1,0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#a80303]/25 blur-2xl scale-150" />
              <Image
                src="/microraptor.png"
                alt="Logo Microraptor"
                width={90}
                height={90}
                className="relative drop-shadow-[0_0_40px_rgba(168,3,3,0.9)]"
              />
            </div>
          </motion.div>

          {/* Chip de acesso */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] px-4 py-1.5 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Para ex-membros e membros
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[clamp(3rem,11vw,7rem)] font-black tracking-tighter leading-none mb-6"
          >
            <span className="bg-gradient-to-br from-white via-white/90 to-[#a80303] bg-clip-text text-transparent">
              Bastidores
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            O lado que poucos veem — projeto, fabricação e voo. Uma janela exclusiva para quem
            fez ou faz parte da história da Microraptor.
          </motion.p>

          {/* Pills de seção */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {sections.map((s) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] hover:border-[#a80303]/60 hover:bg-[#980101]/15 text-gray-300 hover:text-white text-sm font-medium transition-all duration-300"
              >
                <span>{s.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ STICKY NAV DE SEÇÕES ══════════════════════════════════════════════ */}
      <div className="sticky top-[80px] z-30 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto scrollbar-none">
          {sections.map((s) => (
            <motion.a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActiveSection(s.id)}
              className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200
                ${activeSection === s.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <span>{s.label}</span>
              {activeSection === s.id && (
                <motion.span
                  layoutId="section-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </motion.a>
          ))}
        </div>
      </div>

      {/* ══ SEÇÕES DE CONTEÚDO ════════════════════════════════════════════════ */}
      {sections.map((section, sIdx) => (
        <section
          key={section.id}
          id={section.id}
          className="relative py-28 px-6 overflow-hidden"
          onMouseEnter={() => setActiveSection(section.id)}
        >
          {/* Gradiente de fundo alternado */}
          {sIdx % 2 === 0 ? (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(152,1,1,0.07),transparent)]" />
          ) : (
            <>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(152,1,1,0.07),transparent)]" />
            </>
          )}

          <div className="max-w-6xl mx-auto">
            {/* Cabeçalho da seção */}
            <FadeIn className="mb-14">
              <div className="flex items-start gap-6">
                {/* Ícone / abbr */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#980101]/15 border border-[#a80303]/30 flex flex-col items-center justify-center mt-1">
                  <span className="text-[#a80303] font-black text-sm tracking-wider">{section.abbr}</span>
                </div>
                <div>
                  <SectionLabel>{section.abbr}</SectionLabel>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    {section.description}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Grid de vídeos */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.videos.map((video, vIdx) => (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: vIdx * 0.1, duration: 0.6 }}
                >
                  <VideoCard title={video.title} youtubeId={video.youtubeId} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ══ CTA FINAL ════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(152,1,1,0.10),transparent)]" />
        <FadeIn className="max-w-3xl mx-auto text-center relative z-10">
          <div className="rounded-3xl p-px bg-gradient-to-br from-[#a80303]/60 via-[#9b130f]/30 to-[#980101]/60">
            <div className="rounded-3xl bg-[#050000] px-10 py-16">
              <div className="w-12 h-1 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full mx-auto mb-8" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Faz parte da{' '}
                <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                  história
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Quer contribuir com vídeos ou materiais dos bastidores? Entre em contato com a equipe.
              </p>
              <motion.a
                href="mailto:microraptor@ufjf.br"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold px-10 py-4 rounded-2xl text-base shadow-[0_0_40px_rgba(152,1,1,0.4)] hover:shadow-[0_0_60px_rgba(168,3,3,0.6)] transition-all duration-300"
              >
                Enviar material
              </motion.a>
              <p className="mt-6 text-gray-600 text-sm">microraptor@ufjf.br</p>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
