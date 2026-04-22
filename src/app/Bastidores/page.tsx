'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ─── Dados ────────────────────────────────────────────────────────────────────

type MediaItem = { _id?: string; src: string; type: 'image' | 'video' };

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

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 12) * 0.04, duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.07] cursor-pointer group aspect-square"
        onClick={() => setLightbox(true)}
      >
        {item.type === 'video' ? (
          <video
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={item.src}
            alt="Bastidores Microraptor"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        {item.type === 'video' && (
          <div className="absolute bottom-2 right-2 bg-black/60 rounded-full p-1">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-light leading-none"
            onClick={() => setLightbox(false)}
          >
            ×
          </button>
          {item.type === 'video' ? (
            <video
              src={item.src}
              controls
              autoPlay
              className="max-h-[90vh] max-w-[90vw] rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={item.src}
                alt="Bastidores Microraptor"
                width={1200}
                height={800}
                className="object-contain rounded-xl max-h-[90vh] w-auto"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function BastidoresPage() {
  const [filter, setFilter] = useState<'todos' | 'fotos' | 'videos'>('todos');
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    fetch('/api/photos?category=bastidores')
      .then((r) => r.json())
      .then((data: MediaItem[]) => setAllMedia(data))
      .catch(() => setAllMedia([]));
  }, []);

  const filtered = allMedia.filter((m) => {
    if (filter === 'fotos') return m.type === 'image';
    if (filter === 'videos') return m.type === 'video';
    return true;
  });

  const imgCount = allMedia.filter((m) => m.type === 'image').length;
  const vidCount = allMedia.filter((m) => m.type === 'video').length;

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            O lado que poucos veem — projeto, fabricação e voo. Uma janela exclusiva para quem
            fez ou faz parte da história da Microraptor.
          </motion.p>

          {/* Contadores */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex justify-center gap-8"
          >
            {[
              { label: 'Fotos', value: imgCount },
              { label: 'Vídeos', value: vidCount },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-500 tracking-widest uppercase">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ FILTROS ════════════════════════════════════════════════════════════ */}
      <div className="sticky top-[80px] z-30 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto scrollbar-none">
          {(['todos', 'fotos', 'videos'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 capitalize
                ${filter === f ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {f === 'todos' ? 'Todos' : f === 'fotos' ? 'Fotos' : 'Vídeos'}
              {filter === f && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══ GALERIA ════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <FadeIn className="mb-10">
          <p className="text-gray-500 text-sm">
            {filtered.length} {filtered.length === 1 ? 'item' : 'itens'} — clique para ampliar
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item, idx) => (
            <MediaCard key={item.src} item={item} index={idx} />
          ))}
        </div>
      </section>

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
                Quer contribuir com fotos ou vídeos dos bastidores? Entre em contato com a equipe.
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
