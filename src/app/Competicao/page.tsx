'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  {
    abbr: 'REG',
    name: 'Regular',
    description:
      'A categoria clássica do Aero Design. A aeronave deve carregar a maior carga útil possível dentro das restrições de envergadura e peso em vazio. Ideal para quem está iniciando na competição.',
    highlight: 'Maior carga útil',
  },
  {
    abbr: 'ADV',
    name: 'Advanced',
    description:
      'Nível mais exigente da competição. Inclui missões com carga útil predita — a equipe deve estimar antes do voo o peso que a aeronave carregará e atingir o valor previsto com precisão.',
    highlight: 'Carga predita + precisão',
  },
  {
    abbr: 'MIC',
    name: 'Micro',
    description:
      'A aeronave inteira deve caber em uma caixa de tamanho reduzido, mas ainda assim carregar o máximo de carga possível. Um desafio de miniaturização e eficiência estrutural.',
    highlight: 'Miniaturização extrema',
  },
];

const phases = [
  {
    num: '01',
    title: 'Relatório Técnico',
    description:
      'Meses antes do evento, a equipe entrega um relatório detalhado com todo o projeto da aeronave: aerodinâmica, estruturas, sistema propulsivo, planta construtiva e análises. É avaliado por engenheiros especialistas.',
  },
  {
    num: '02',
    title: 'Apresentação Oral',
    description:
      'A equipe apresenta o projeto aos avaliadores, defendendo suas escolhas de projeto e respondendo perguntas técnicas. Avalia a clareza, profundidade e domínio do conteúdo.',
  },
  {
    num: '03',
    title: 'Inspeção da Aeronave',
    description:
      'A aeronave construída é inspecionada para verificar conformidade com o regulamento: peso, dimensões, materiais, sistemas de segurança e integridade estrutural.',
  },
  {
    num: '04',
    title: 'Voos de Competição',
    description:
      'A fase mais aguardada: a aeronave voa no campo com carga útil real. A pontuação considera a carga carregada, a precisão da predição e o desempenho geral em voo.',
  },
];

const whyMatters = [
  {
    abbr: '01',
    title: 'Maior competição de Aerodesign do mundo',
    description:
      'O SAE Aero Design Brasil reúne centenas de equipes de universidades de todo o Brasil e do exterior. Vencer aqui é o reconhecimento máximo no cenário acadêmico de engenharia aeronáutica.',
  },
  {
    abbr: '02',
    title: 'Engenharia aplicada de verdade',
    description:
      'Todo o ciclo de desenvolvimento de uma aeronave — do projeto ao voo — é executado pelos próprios alunos. O regulamento simula desafios reais da indústria aeroespacial.',
  },
  {
    abbr: '03',
    title: 'Diferencial acadêmico e profissional',
    description:
      'Participar do Aero Design é um diferencial imenso no currículo. Empresas do setor aeroespacial e de engenharia reconhecem e valorizam a experiência adquirida nas competições.',
  },
  {
    abbr: '04',
    title: 'Desenvolvimento em equipe',
    description:
      'A competição exige integração total entre todas as subáreas da equipe — da aerodinâmica à gestão. Isso forma profissionais com visão sistêmica e habilidade de trabalho colaborativo.',
  },
];

const teamResults = [
  { year: '2018', place: '3°', tier: 3 },
  { year: '2019', place: '2°', tier: 2 },
  { year: '2020', place: '1°', tier: 1 },
  { year: '2021', place: '3°', tier: 3 },
  { year: '2022', place: '1°', tier: 1 },
  { year: '2023', place: '1°', tier: 1 },
];

const tierColor: Record<number, string> = {
  1: 'from-[#a80303] to-[#980101]',
  2: 'from-white/50 to-white/20',
  3: 'from-white/30 to-white/10',
};

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
      initial={{ opacity: 0, y: 48 }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CompeticaoPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative w-full h-[92vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/imagemTexto2.png" alt="Aero Design Brasil" fill className="object-cover object-center opacity-20" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_55%,rgba(152,1,1,0.2),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div style={{ opacity: heroOp }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#a80303]/25 blur-2xl scale-150" />
              <Image
                src="/microraptor.png"
                alt="Logo Microraptor"
                width={100}
                height={100}
                className="relative drop-shadow-[0_0_40px_rgba(168,3,3,0.9)]"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SectionLabel>SAE Brasil · Competição Nacional</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
          >
            <span className="bg-gradient-to-br from-white via-white/80 to-[#a80303] bg-clip-text text-transparent">
              Aero Design
            </span>
            <br />
            <span className="bg-gradient-to-br from-[#a80303] via-[#9b130f] to-white bg-clip-text text-transparent">
              Brasil
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-6 text-lg md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto"
          >
            A maior competição de aerodesign da América Latina —<br className="hidden md:block" />
            palco onde a Microraptor escreve sua história.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {['Regular', 'Advanced', 'Micro', 'Tricampeões'].map((pill) => (
              <span
                key={pill}
                className="px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-sm text-gray-300"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            >
              <div className="w-1 h-2 rounded-full bg-[#a80303]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── O QUE É ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(152,1,1,0.08),transparent)]" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel>O que é</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              A competição que<br />
              <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                nos move.
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              O <strong className="text-white">SAE Aero Design Brasil</strong> é uma competição estudantil promovida
              pela SAE Brasil que desafia equipes de universidades a projetar, construir e voar aeronaves
              rádio controladas capazes de transportar a maior carga útil possível.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              Com edições anuais, o evento reúne dezenas de equipes de todo o Brasil e do exterior,
              testando não só a competência técnica, mas também a organização, comunicação e capacidade
              de entrega das equipes.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Para a <strong className="text-white">Microraptor</strong>, o Aero Design é o principal objetivo
              do ano — o evento que dá sentido a cada hora de projeto, simulação, fabricação e teste.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative rounded-3xl p-px bg-gradient-to-br from-[#a80303]/40 via-[#980101]/20 to-transparent">
              <div className="rounded-3xl bg-white/[0.03] p-8 space-y-5">
                {[
                  { label: 'Organização',   value: 'SAE Brasil'                   },
                  { label: 'Periodicidade', value: 'Anual'                        },
                  { label: 'Categorias',    value: 'Regular · Advanced · Micro'   },
                  { label: 'Abrangência',   value: 'Nacional + Internacional'     },
                  { label: 'Nossa classe',  value: 'Micro (classe principal)'     },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-white/6 pb-4 last:border-0 last:pb-0">
                    <span className="text-gray-500 text-sm">{item.label}</span>
                    <span className="text-white font-semibold text-sm text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CATEGORIAS ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_50%,rgba(152,1,1,0.06),transparent)]" />

        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Formato</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">As 3 Categorias</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Cada categoria possui seu próprio regulamento, desafios e critérios de pontuação.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.abbr}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-7 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/50 hover:bg-[#980101]/8 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#980101]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#980101]/15 border border-[#a80303]/25 flex items-center justify-center mb-5 group-hover:bg-[#980101]/30 group-hover:border-[#a80303]/50 transition-all">
                    <span className="text-[#a80303] font-black text-xs tracking-wider">{cat.abbr}</span>
                  </div>
                  <h3 className="font-black text-2xl text-white mb-1 group-hover:text-[#a80303] transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <span className="inline-block text-xs font-bold text-[#a80303]/70 mb-4 tracking-wide">
                    {cat.highlight}
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_50%,rgba(152,1,1,0.07),transparent)]" />
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Regulamento</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Como funciona</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A competição é avaliada em quatro fases distintas, cada uma com peso na pontuação final.
            </p>
          </FadeIn>

          <div className="relative">
            {/* Linha conectora */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#a80303]/0 via-[#a80303]/30 to-[#a80303]/0 hidden md:block" />

            <div className="space-y-8">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.num}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={`relative md:w-[46%] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  {/* Ponto na linha */}
                  <div className={`hidden md:flex absolute top-6 ${i % 2 === 0 ? '-right-[2.15rem]' : '-left-[2.15rem]'} w-4 h-4 rounded-full bg-[#a80303] border-2 border-black z-10 items-center justify-center`} />

                  <div className="group rounded-2xl p-7 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/40 hover:bg-[#980101]/6 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#980101]/15 border border-[#a80303]/25 flex items-center justify-center mb-4">
                      <span className="text-[#a80303] font-black text-xs">{phase.num}</span>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-3 group-hover:text-[#a80303] transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POR QUE É IMPORTANTE ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(152,1,1,0.06),transparent)]" />

        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Importância</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              Por que isso importa<br />
              <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                pra gente?
              </span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {whyMatters.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl p-7 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/40 hover:bg-[#980101]/6 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#980101]/15 border border-[#a80303]/25 flex items-center justify-center mb-5 group-hover:bg-[#980101]/30 group-hover:border-[#a80303]/50 transition-all">
                  <span className="text-[#a80303] font-black text-xs">{item.abbr}</span>
                </div>
                <h3 className="font-bold text-lg text-white mb-3 group-hover:text-[#a80303] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSSO HISTÓRICO ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_50%,rgba(152,1,1,0.08),transparent)]" />
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Resultados</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Nossa história no evento</h2>
            <span className="inline-block px-6 py-2 rounded-full bg-[#980101]/20 border border-[#a80303]/30 text-[#a80303] font-semibold text-sm">
              Equipe Tricampeã Nacional
            </span>
          </FadeIn>

          <div className="relative mb-8">
            <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent hidden md:block" />
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {teamResults.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${tierColor[item.tier]} flex items-center justify-center shadow-lg mb-3 border border-white/20`}
                  >
                    <span className="text-white font-black text-lg leading-none">{item.place}</span>
                  </div>
                  <div className="text-white font-semibold text-sm">Lugar</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.year}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
              Cada edição representa um ano inteiro de dedicação — noites de projeto, dias de fabricação
              e semanas de testes — tudo culminando em minutos de voo que valem troféus e memórias para sempre.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(152,1,1,0.10),transparent)]" />
        <FadeIn className="max-w-3xl mx-auto text-center relative z-10">
          <div className="rounded-3xl p-px bg-gradient-to-br from-[#a80303]/60 via-[#9b130f]/30 to-[#980101]/60">
            <div className="rounded-3xl bg-[#050000] p-12 md:p-16">
              <div className="w-12 h-1 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full mx-auto mb-8" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Quer fazer parte<br />
                <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                  dessa história?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                Junte-se à Microraptor e ajude a construir a próxima aeronave que vai voar
                no Aero Design Brasil representando a UFJF.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/About">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#c00404] hover:to-[#a80303] text-white font-bold px-8 py-4 rounded-2xl text-base shadow-[0_0_36px_rgba(152,1,1,0.45)] hover:shadow-[0_0_56px_rgba(168,3,3,0.65)] transition-all duration-300 cursor-pointer"
                  >
                    Conheça a equipe
                  </motion.span>
                </Link>
                <motion.a
                  href="mailto:microraptor@ufjf.br"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/20 hover:border-white/35 text-white font-bold px-8 py-4 rounded-2xl text-base backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  Entrar em contato
                </motion.a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
