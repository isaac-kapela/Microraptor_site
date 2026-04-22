'use client';

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { areas, getArea } from '../data';

interface MemberDoc {
  _id: string;
  name: string;
  photo: string;
  isLeader: boolean;
}

export default function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const area = getArea(slug);
  if (!area) notFound();

  const currentIndex = areas.findIndex((a) => a.slug === slug);
  const prev = areas[currentIndex - 1];
  const next = areas[currentIndex + 1];

  const [members, setMembers] = useState<MemberDoc[]>([]);
  useEffect(() => {
    fetch(`/api/members?area=${slug}`)
      .then((r) => r.json())
      .then((data: MemberDoc[]) => setMembers(data))
      .catch(() => setMembers([]));
  }, [slug]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(152,1,1,0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-10"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/About" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span className="text-[#a80303]">{area.name}</span>
          </motion.div>

          {/* Icon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#a80303]/15 blur-2xl scale-[2]" />
              <div className="relative w-20 h-20 rounded-2xl bg-[#980101]/20 border border-[#a80303]/30 flex items-center justify-center">
                <span className="text-[#a80303] font-black text-2xl tracking-wider">{area.slug.slice(0,3).toUpperCase()}</span>
              </div>
            </div>
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#a80303] mb-4 px-3 py-1 rounded-full border border-[#980101]/40 bg-[#980101]/10">
              Área {currentIndex + 1} de {areas.length}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4"
          >
            <span className={`bg-gradient-to-br ${area.color} bg-clip-text text-transparent`}>
              {area.name}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-xl md:text-2xl text-gray-400 font-light"
          >
            {area.tagline}
          </motion.p>
        </div>
      </section>

      {/* ── DIVISOR ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <section className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">

        {/* Descrição — ocupa 2 colunas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="md:col-span-2"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-[#a80303] mb-4">Sobre a área</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{area.description}</p>
        </motion.div>

        {/* Ferramentas — 1 coluna */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="space-y-3"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-[#a80303] mb-4">Ferramentas</h2>
          {area.tools.map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 bg-white/[0.04] border border-white/[0.07] text-sm text-gray-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a80303] flex-shrink-0" />
              {t}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── RESPONSABILIDADES ── */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.015]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest uppercase text-[#a80303] mb-8"
          >
            Responsabilidades
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {area.responsibilities.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 rounded-2xl p-5 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/40 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="mt-1 w-5 h-5 rounded-full bg-[#980101]/20 border border-[#a80303]/40 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a80303]" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">{r}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPETÊNCIAS ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold tracking-widest uppercase text-[#a80303] mb-8"
        >
          Competências desenvolvidas
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {area.skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#980101]/15 border border-[#a80303]/30 text-white/70 hover:bg-[#980101]/25 hover:border-[#a80303]/60 transition-all cursor-default"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── MEMBROS ── */}
      {members.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest uppercase text-[#a80303] mb-10"
          >
            Membros da área
          </motion.h2>

          <div className="flex flex-wrap gap-6 items-start">
            {/* Líder em destaque */}
            {members.filter(m => m.isLeader).map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#a80303] to-[#980101] blur-sm opacity-70" />
                  <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-[#a80303]/60">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a80303] to-[#980101] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Líder de Área
                  </span>
                </div>
                <p className="mt-4 text-white font-bold text-base">{m.name}</p>
              </motion.div>
            ))}

            {/* Divisor vertical */}
            {members.some(m => m.isLeader) && members.some(m => !m.isLeader) && (
              <div className="hidden sm:block w-px self-stretch bg-white/10 mx-2" />
            )}

            {/* Demais membros */}
            <div className="flex flex-wrap gap-5">
              {members.filter(m => !m.isLeader).map((m, i) => (
                <motion.div
                  key={m._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 hover:border-[#a80303]/50 transition-colors duration-300">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-gray-300 text-sm font-medium">{m.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA PROCESSO SELETIVO ── */}
      <section className="relative px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(152,1,1,0.10),transparent)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <div className="rounded-3xl p-px bg-gradient-to-br from-[#a80303]/50 via-[#9b130f]/25 to-[#980101]/50">
            <div className="rounded-3xl bg-[#0a0000] px-8 py-12">
              <div className="w-12 h-1 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full mx-auto mb-8" />
              <h3 className="text-2xl font-black text-white mb-3">
                Quer fazer parte da área de{' '}
                <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                  {area.name}
                </span>
                ?
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Nosso processo seletivo está aberto. Venha fazer parte da equipe tricampeã da UFJF.
              </p>
              {area.whatsapp ? (
                <a
                  href={`https://wa.me/${area.whatsapp}?text=Ol%C3%A1%21%20Conheci%20a%20equipe%20Microraptor%20atrav%C3%A9s%20do%20site%20e%20tenho%20interesse%20em%20entrar%20na%20%C3%A1rea%20de%20${encodeURIComponent(area.name)}.%20Gostaria%20de%20saber%20mais%21`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#c00404] hover:to-[#980101] text-white font-bold px-8 py-3.5 rounded-2xl text-base shadow-[0_0_32px_rgba(152,1,1,0.4)] hover:shadow-[0_0_48px_rgba(168,3,3,0.6)] transition-all duration-300"
                >
                  Quero entrar
                </a>
              ) : (
                <a
                  href="mailto:microraptor@ufjf.br"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#c00404] hover:to-[#980101] text-white font-bold px-8 py-3.5 rounded-2xl text-base shadow-[0_0_32px_rgba(152,1,1,0.4)] hover:shadow-[0_0_48px_rgba(168,3,3,0.6)] transition-all duration-300"
                >
                  Quero entrar
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── NAVEGAÇÃO ENTRE ÁREAS ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-10" />
        <div className="flex items-center justify-between gap-4">

          {prev ? (
            <Link href={`/areas/${prev.slug}`} className="flex-1">
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center gap-3 rounded-2xl px-5 py-4 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/40 hover:bg-white/[0.06] transition-all cursor-pointer group"
              >
                <span className="text-gray-500 group-hover:text-[#a80303] transition-colors text-lg">←</span>
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Anterior</div>
                  <div className="text-white font-semibold text-sm">{prev.name}</div>
                </div>
              </motion.div>
            </Link>
          ) : <div className="flex-1" />}

          <Link href="/About#areas">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white text-sm transition-all cursor-pointer"
            >
              Ver todas
            </motion.div>
          </Link>

          {next ? (
            <Link href={`/areas/${next.slug}`} className="flex-1">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-end gap-3 rounded-2xl px-5 py-4 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/40 hover:bg-white/[0.06] transition-all cursor-pointer group text-right"
              >
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Próxima</div>
                  <div className="text-white font-semibold text-sm">{next.name}</div>
                </div>
                <span className="text-gray-500 group-hover:text-[#a80303] transition-colors text-lg">→</span>
              </motion.div>
            </Link>
          ) : <div className="flex-1" />}

        </div>
      </section>

    </div>
  );
}
