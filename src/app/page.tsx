'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InfiniteScrollCards from './Components/CardSolo';
import InstagramFeed from './Components/InstagramFeed';
import CompetitionCountdown from './Components/CompetitionCountdown';


const stats = [
  { value: '15+',  label: 'Anos'        },
  { value: '3×',   label: 'Campeões'    },
  { value: '9',    label: 'Áreas'       },
  { value: '+100', label: 'Membros'     },
];

const highlights = [
  { label: '1°', sublabel: 'Lugar', text: '2020, 2022, 2023' },
  { label: '2°', sublabel: 'Lugar', text: '2019'              },
  { label: '3°', sublabel: 'Lugar', text: '2018, 2021'        },
  { label: '★',  sublabel: 'Prêmio', text: 'Melhor Apresentação Oral 2025' },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">

        {/* Fundo com parallax */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <Image
            src="/imagemTexto2.png"
            alt="Microraptor"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Camadas de overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,rgba(152,1,1,0.22),transparent)]" />

        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Conteúdo centralizado */}
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Logo com glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#a80303]/30 blur-3xl scale-[2]" />
              <Image
                src="/microraptor.png"
                alt="Microraptor"
                width={110}
                height={110}
                className="relative drop-shadow-[0_0_50px_rgba(168,3,3,1)]"
              />
            </div>
          </motion.div>

          {/* Chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className="text-xs font-bold tracking-[0.28em] uppercase text-[#a80303] px-4 py-1.5 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Universidade Federal de Juiz de Fora
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[clamp(3.5rem,12vw,9rem)] font-black tracking-tighter leading-[0.9] whitespace-nowrap bg-gradient-to-br from-white via-white/90 to-[#a80303] bg-clip-text text-transparent"
          >
            Microraptor
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-6 text-lg md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto"
          >
            Projetamos, desenvolvemos e construímos <br className="hidden md:block" />
            aeronaves rádio controladas de alto desempenho.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link href="/About">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#c00404] hover:to-[#a80303] text-white font-bold px-8 py-3.5 rounded-2xl text-base shadow-[0_0_32px_rgba(152,1,1,0.5)] hover:shadow-[0_0_48px_rgba(168,3,3,0.7)] transition-all duration-300 cursor-pointer"
              >
                Conheça a equipe
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-[#a80303]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/8 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-[#a80303]">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ COUNTDOWN ════════════════════════════════════════════════════════ */}
      <CompetitionCountdown />

      {/* ══ SOBRE ═════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_50%,rgba(152,1,1,0.09),transparent)]" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-5 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Quem somos
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Mais que um projeto<br />
              <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                acadêmico.
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Somos a <strong className="text-white">Microraptor</strong>, equipe de Aerodesign da UFJF. Unimos estudantes de diversos cursos para projetar e construir aeronaves de competição que enfrentam os melhores times do Brasil.
            </p>
            <Link href="/About">
              <motion.span
                whileHover={{ x: 6 }}
                className="inline-flex items-center gap-2 text-[#a80303] hover:text-[#9b130f] font-semibold transition-colors cursor-pointer"
              >
                Saiba mais sobre a equipe
                <span className="text-lg">→</span>
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid grid-cols-1 gap-3"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 bg-white/[0.04] border border-white/[0.07] hover:border-[#a80303]/40 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#980101]/20 border border-[#a80303]/30 flex flex-col items-center justify-center">
                  <span className="text-[#a80303] font-black text-sm leading-none">{h.label}</span>
                  <span className="text-[#a80303]/60 text-[9px] leading-none mt-0.5">{h.sublabel}</span>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">{h.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CARROSSEL ════════════════════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(152,1,1,0.06),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 px-6"
        >
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
            Galeria
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Nosso trabalho</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InfiniteScrollCards />
        </motion.div>
      </section>

      {/* ══ INSTAGRAM ════════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(152,1,1,0.06),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
            Instagram
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Últimas do perfil</h2>
          <a
            href="https://www.instagram.com/microraptorufjf/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#a80303] transition-colors text-sm font-medium"
          >
            @microraptorufjf
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <InstagramFeed />
        </motion.div>
      </section>


    </div>
  );
}
