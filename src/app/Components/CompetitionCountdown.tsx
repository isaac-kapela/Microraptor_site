'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const COMPETITION_DATE = new Date('2025-10-28T08:00:00-03:00');

const COMPETITION_LABEL = 'SAE Aero Design Brasil 2025';

const COMPETITION_LOCATION = '28 de outubro — 2 de novembro · São José dos Campos, SP';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function calcTimeLeft() {
  const diff = COMPETITION_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    dias:     Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:    Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos:  Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

export default function CompetitionCountdown() {
  const [time, setTime] = useState(calcTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const units = [
    { value: time.dias,     label: 'Dias'     },
    { value: time.horas,    label: 'Horas'    },
    { value: time.minutos,  label: 'Minutos'  },
    { value: time.segundos, label: 'Segundos' },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden border-b border-white/6">
      {/* Fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(152,1,1,0.10),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.28em] uppercase text-[#a80303] mb-4 px-3 py-1.5 rounded-full border border-[#980101]/40 bg-[#980101]/10">
            Próxima competição
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight"
        >
          {COMPETITION_LABEL}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-sm mb-12 tracking-wide"
        >
          {COMPETITION_LOCATION}
        </motion.p>

        {/* Contador */}
        <div className="flex justify-center items-center gap-3 md:gap-6 flex-wrap">
          {units.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 32, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col items-center"
            >
              {/* Card do número */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-[#a80303]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/[0.04] border border-white/[0.09] hover:border-[#a80303]/40 flex items-center justify-center transition-all duration-300 overflow-hidden">
                  {/* Linha decorativa superior */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a80303]/50 to-transparent" />

                  <motion.span
                    key={value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="text-3xl md:text-5xl font-black text-white tabular-nums"
                  >
                    {pad(value)}
                  </motion.span>
                </div>
              </div>

              <span className="mt-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-600">
                {label}
              </span>
            </motion.div>
          ))}

          {/* Separadores : */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="text-[#a80303]/40 font-black text-3xl md:text-5xl mb-6 hidden md:block"
              style={{ order: i * 2 + 1 }}
            >
              :
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Link href="/Competicao">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-[#a80303] hover:text-white border border-[#a80303]/30 hover:border-[#a80303] hover:bg-[#a80303]/10 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-300 cursor-pointer"
            >
              Sobre a competição
              <span>→</span>
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
