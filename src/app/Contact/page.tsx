'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Dados ────────────────────────────────────────────────────────────────────

const contactChannels = [
  {
    abbr: 'IG',
    label: 'Instagram',
    value: '@microraptorufjf',
    href: 'https://www.instagram.com/microraptorufjf/',
    description: 'Acompanhe o dia a dia da equipe, registros de voo e bastidores da competição.',
  },
  {
    abbr: 'ML',
    label: 'E-mail',
    value: 'microraptorufjf@gmail.com',
    href: 'mailto:microraptorufjf@gmail.com',
    description: 'Para parcerias, patrocínios ou qualquer assunto institucional, fale direto conosco.',
  },
  {
    abbr: 'UF',
    label: 'Universidade',
    value: 'UFJF — Juiz de Fora, MG',
    href: 'https://www2.ufjf.br/',
    description: 'Somos uma equipe da Universidade Federal de Juiz de Fora, vinculada à Engenharia.',
  },
];

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

// ─── Formulário ───────────────────────────────────────────────────────────────

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.10] hover:border-white/20 focus:border-[#a80303]/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 transition-all duration-200';

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#980101]/20 border border-[#a80303]/40 flex items-center justify-center">
          <span className="text-[#a80303] font-black text-xl">OK</span>
        </div>
        <h3 className="text-white font-bold text-xl">Mensagem enviada!</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Recebemos seu contato e retornaremos em breve.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-[#a80303] text-sm font-semibold hover:text-white transition-colors"
        >
          Enviar outra mensagem
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Nome</label>
          <input
            name="name"
            required
            placeholder="Seu nome"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">E-mail</label>
          <input
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Assunto</label>
        <select
          name="subject"
          required
          className={inputClass}
        >
          <option value="" disabled className="bg-[#111] text-gray-400">Selecione um assunto</option>
          <option value="Patrocínio" className="bg-[#111] text-white">Patrocínio</option>
          <option value="Parceria" className="bg-[#111] text-white">Parceria</option>
          <option value="Processo Seletivo" className="bg-[#111] text-white">Processo Seletivo</option>
          <option value="Imprensa" className="bg-[#111] text-white">Imprensa</option>
          <option value="Outro" className="bg-[#111] text-white">Outro</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Mensagem</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Escreva sua mensagem..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-xs">Algo deu errado. Tente novamente ou envie por e-mail.</p>
      )}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#c00404] hover:to-[#a80303] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm shadow-[0_0_28px_rgba(152,1,1,0.4)] hover:shadow-[0_0_44px_rgba(168,3,3,0.6)] transition-all duration-300"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
      </motion.button>
    </form>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/imagemTexto2.png" alt="Contato Microraptor" fill className="object-cover object-center opacity-15" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_55%,rgba(152,1,1,0.18),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div style={{ opacity: heroOp }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
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
                width={90}
                height={90}
                className="relative drop-shadow-[0_0_40px_rgba(168,3,3,0.9)]"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SectionLabel>Fale conosco</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
          >
            <span className="bg-gradient-to-br from-white via-white/80 to-[#a80303] bg-clip-text text-transparent">
              Contato
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-6 text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto"
          >
            Parcerias, patrocínios ou só curiosidade — estamos sempre abertos para conversar.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CANAIS + FORMULÁRIO ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(152,1,1,0.07),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* Canais */}
          <FadeIn>
            <SectionLabel>Canais</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Onde nos<br />
              <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                encontrar.
              </span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Escolha o canal mais adequado para o tipo de contato que deseja fazer.
            </p>

            <div className="space-y-4">
              {contactChannels.map((ch, i) => (
                <motion.a
                  key={ch.abbr}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 6 }}
                  className="group flex items-start gap-5 rounded-2xl p-5 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/45 hover:bg-[#980101]/6 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#980101]/15 border border-[#a80303]/25 flex items-center justify-center group-hover:bg-[#980101]/30 group-hover:border-[#a80303]/50 transition-all">
                    <span className="text-[#a80303] font-black text-xs tracking-wider">{ch.abbr}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">{ch.label}</span>
                    </div>
                    <p className="text-white font-semibold text-sm mb-1.5 group-hover:text-[#a80303] transition-colors truncate">
                      {ch.value}
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-500 transition-colors">
                      {ch.description}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-gray-700 group-hover:text-[#a80303] transition-colors mt-1 text-lg">→</span>
                </motion.a>
              ))}
            </div>
          </FadeIn>

          {/* Formulário */}
          <div className="relative z-10">
            <SectionLabel>Mensagem</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Envie uma<br />
              <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                mensagem.
              </span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Preencha o formulário e retornaremos o mais rápido possível.
            </p>

            <div className="rounded-2xl p-px bg-gradient-to-br from-[#a80303]/30 via-[#980101]/10 to-transparent">
              <div className="rounded-2xl bg-white/[0.02] p-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESSO SELETIVO ── */}
      <section className="relative py-32 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(152,1,1,0.08),transparent)] pointer-events-none" />
        <FadeIn className="max-w-3xl mx-auto text-center relative z-10">
          <div className="rounded-3xl p-px bg-gradient-to-br from-[#a80303]/60 via-[#9b130f]/30 to-[#980101]/60">
            <div className="rounded-3xl bg-[#050000] px-10 py-16">
              <div className="w-12 h-1 bg-gradient-to-r from-[#a80303] to-[#980101] rounded-full mx-auto mb-8" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Quer entrar para<br />
                <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                  a equipe?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                Conheça as áreas da Microraptor e veja como participar do processo seletivo.
              </p>
              <Link href="/About">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#c00404] hover:to-[#a80303] text-white font-bold px-8 py-4 rounded-2xl text-base shadow-[0_0_36px_rgba(152,1,1,0.45)] hover:shadow-[0_0_56px_rgba(168,3,3,0.65)] transition-all duration-300 cursor-pointer"
                >
                  Conheça a equipe
                </motion.span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
