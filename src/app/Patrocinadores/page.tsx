'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// ─── Data ─────────────────────────────────────────────────────────────────────

const sponsors = [
  { name: 'TekBond',         src: '/sponsors/TekBond.png',      site: 'https://tekbond.com.br',   category: 'Material'      },
  { name: 'SAE Aerodesign',  src: '/sponsors/saeBrasil.jpg',    site: 'https://saebrasil.org.br', category: 'Institucional' },
  { name: 'UFJF',            src: '/sponsors/ufjf.jpg',          site: 'https://ufjf.br',          category: 'Institucional' },
  { name: 'SolidWorks',      src: '/sponsors/solidworks.jpg',    site: 'https://solidworks.com',   category: 'Software'      },
  { name: 'Ansys',           src: '/sponsors/ans.jpg',           site: 'https://ansys.com',        category: 'Software'      },
  { name: 'MATLAB',          src: '/sponsors/Matlab.jpg',        site: 'https://mathworks.com',    category: 'Software'      },
  { name: 'Femap',           src: '/sponsors/femap.jpg',         site: 'https://siemens.com',      category: 'Software'      },
  { name: 'Altium Designer', src: '/sponsors/altium.jpg',        site: 'https://altium.com',       category: 'Software'      },
  { name: 'SAE Brasil',      src: '/sponsors/saeBrasil.jpg',     site: 'https://saebrasil.org.br', category: 'Institucional' },
  { name: 'Xraptor',         src: '/sponsors/Xraptor.jpg',       site: '#',                        category: 'Material'      },
  { name: 'APC Propellers',  src: '/sponsors/apc.jpg',           site: 'https://apcprop.com',      category: 'Material'      },
  { name: 'GRIN',            src: '/sponsors/grin.jpg',          site: '#',                        category: 'Parceiro'      },
];

const tiers = [
  {
    id: 'bronze',
    label: 'Bronze',
    price: 'R$ 500',
    highlight: false,
    benefits: [
      'Logomarca nos banners em todos os eventos',
      'Exposição exclusiva nas redes sociais',
      'Exposição da marca nos uniformes',
    ],
  },
  {
    id: 'prata',
    label: 'Prata',
    price: 'R$ 1.000',
    highlight: false,
    benefits: [
      'Todos os benefícios Bronze',
      'Logomarca nas caixas de transporte das aeronaves',
      'Logomarca no avião utilizado na competição',
    ],
  },
  {
    id: 'ouro',
    label: 'Ouro',
    price: 'R$ 5.000',
    highlight: false,
    benefits: [
      'Todos os benefícios Prata',
      'Destaque na exposição de todos os logotipos',
      'Banners exclusivos para exposição em eventos',
    ],
  },
  {
    id: 'platina',
    label: 'Platina',
    price: 'R$ 10.000',
    highlight: false,
    benefits: [
      'Todos os benefícios Ouro',
      'Pôster emoldurado do projeto',
      'Vídeo de agradecimento exclusivo',
    ],
  },
  {
    id: 'diamante',
    label: 'Diamante',
    price: 'R$ 20.000',
    highlight: true,
    benefits: [
      'Todos os benefícios Platina',
      'Avião personalizado com as cores e logo da marca',
      'Réplica da aeronave em escala 3D',
    ],
  },
];

const reasons = [
  {
    num: '01',
    title: 'Visibilidade Nacional',
    description: 'Exposição em eventos, competições, redes sociais, campus da UFJF e meios clássicos de comunicação — inclusive entrevistas à Rede Globo e ao Enfoque Nacional.',
  },
  {
    num: '02',
    title: 'Associação à Excelência',
    description: 'Associe sua marca a uma equipe tricampeã nacional que já representou o Brasil nos Estados Unidos e conquistou prêmios técnicos em 2025.',
  },
  {
    num: '03',
    title: 'Acesso a Talentos',
    description: 'Nossa equipe forma engenheiros que ingressam em Embraer, Boeing, Siemens, Stellantis e outras líderes do setor. Patrocinadores têm acesso prioritário a esses profissionais.',
  },
  {
    num: '04',
    title: 'Pesquisa e Laboratórios',
    description: 'Acesso a um ambiente de pesquisa robusto na UFJF, com laboratórios mecânicos, eletrônicos e ópticos para testes de produtos em parceria com a equipe.',
  },
];

const stats = [
  { value: '22',     label: 'Membros ativos'           },
  { value: '2011',   label: 'Ano de fundação'           },
  { value: '80+',    label: 'Universidades competidoras'},
  { value: 'R$50k',  label: 'Custo por ciclo'          },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}>
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

export default function PatrocinadoresPage() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(152,1,1,0.16),transparent)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>Parcerias e Patrocínio</SectionLabel>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
            Faça parte da<br />
            <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
              nossa história.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Patrocinar a Microraptor é apoiar engenharia de ponta, talentos excepcionais
            e visibilidade nacional. Fundada em 2011, somos a equipe de Aerodesign tricampeã da UFJF.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/5532993100160?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Microraptor%20UFJF%20e%20tenho%20interesse%20em%20patrocinar%20a%20equipe.%20Poderia%20me%20enviar%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20cotas%20de%20patrocínio%3F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold px-8 py-4 rounded-2xl text-base shadow-[0_0_32px_rgba(152,1,1,0.4)] hover:shadow-[0_0_52px_rgba(168,3,3,0.6)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.845L0 24l6.345-1.505A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.213-3.767.893.952-3.665-.234-.375A9.818 9.818 0 1112 21.818z"/>
              </svg>
              Quero patrocinar
            </a>
            <a href="/proposta-patrocinio.pdf" download="Proposta_Patrocinio_Microraptor.pdf"
              className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.11] border border-white/15 hover:border-[#a80303]/50 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#a80303]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Baixar proposta completa
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative border-y border-white/8 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#a80303]">{s.value}</div>
              <div className="text-sm text-gray-300 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SOBRE O PROJETO ── */}
      <section className="relative py-28 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_50%,rgba(152,1,1,0.07),transparent)]" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel>Sobre o projeto</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Mais que uma competição,<br />
              <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">
                uma formação.
              </span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              A Equipe Microraptor foi fundada em <strong className="text-white">2011</strong> na UFJF e compete anualmente na
              SAE Brasil Aero Design, competição que reúne mais de <strong className="text-white">80 universidades</strong> de todo o Brasil.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Nossa equipe conta com <strong className="text-white">22 membros ativos</strong> de cursos como Engenharia Mecânica,
              Elétrica, Civil, Sistemas de Informação e Ciência da Computação. Ex-membros hoje atuam na
              <strong className="text-white"> Embraer, Boeing, Siemens e Stellantis</strong>.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Em 2025, nosso desafio é desenvolver uma aeronave capaz de realizar decolagens
              extremamente curtas ou verticais, com execução da manobra <strong className="text-white">LAPES</strong> e transporte de carga líquida.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="space-y-4">
            {[
              { label: 'Competição nacional', detail: 'SAE Brasil Aero Design — mais de 80 universidades' },
              { label: 'Representação internacional', detail: '6ª colocação geral na etapa mundial nos EUA' },
              { label: 'Prêmios 2025', detail: 'Melhor Relatório de Elétrica e Melhor Apresentação Oral' },
              { label: 'Exposição', detail: 'Aerofest, Rede Globo, Enfoque Nacional e campus da UFJF' },
              { label: 'Custo por ciclo', detail: 'Entre R$ 23.000 e R$ 50.000 por ano de desenvolvimento' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-xl px-5 py-4 bg-white/[0.08] border-2 border-white/[0.15] hover:border-[#a80303]/50 transition-all group">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#a80303] flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                  <div className="text-gray-300 text-sm mt-0.5">{item.detail}</div>
                </div>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── POR QUE PATROCINAR ── */}
      <section className="relative py-28 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-white/[0.015]" />
        <div className="max-w-6xl mx-auto relative">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Benefícios</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2">O que você ganha</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r, i) => (
              <motion.div key={r.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 bg-white/[0.08] border-2 border-white/[0.15] hover:border-[#a80303]/60 hover:bg-[#980101]/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#980101]/25 border border-[#a80303]/40 flex items-center justify-center mb-5">
                  <span className="text-[#a80303] font-black text-xs">{r.num}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#a80303] transition-colors">{r.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COTAS ── */}
      <section className="relative py-28 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(152,1,1,0.06),transparent)]" />
        <div className="max-w-6xl mx-auto relative">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Planos</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Cotas de Patrocínio</h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Escolha o nível de parceria que melhor se alinha aos objetivos da sua empresa.
              Todas as cotas incluem contrato formal e relatório de entregas.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiers.map((tier, i) => (
              <motion.div key={tier.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl p-6 flex flex-col border transition-all duration-300 ${
                  tier.highlight
                    ? 'bg-[#980101]/15 border-[#a80303]/50 shadow-[0_0_40px_rgba(152,1,1,0.15)]'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-[#a80303]/30 hover:bg-[#980101]/8'
                }`}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-[#a80303] text-white text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                      Premium
                    </span>
                  </div>
                )}
                <div className="text-xs font-bold tracking-widest uppercase text-[#a80303] mb-2">{tier.label}</div>
                <div className="text-2xl font-black text-white mb-5">{tier.price}</div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs text-gray-200">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#a80303] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/5532993100160?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Microraptor%20UFJF%20e%20tenho%20interesse%20em%20patrocinar%20a%20equipe.%20Poderia%20me%20enviar%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20cotas%20de%20patrocínio%3F"
                  target="_blank" rel="noopener noreferrer"
                  className={`text-center py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                    tier.highlight
                      ? 'bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] text-white shadow-[0_0_20px_rgba(152,1,1,0.3)]'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white'
                  }`}>
                  Entrar em contato
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD PROPOSTA ── */}
      <section className="relative py-20 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <FadeIn className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-px bg-gradient-to-r from-[#a80303]/40 via-[#9b130f]/20 to-[#980101]/40">
            <div className="rounded-2xl bg-[#050000] px-8 py-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="text-xs font-bold tracking-widest uppercase text-[#a80303] mb-2">Proposta completa</div>
                <h3 className="text-2xl font-black text-white mb-2">Proposta de Patrocínio 2025</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Documento completo com nossa história, projeto atual, estratégia de marketing,
                  cotas detalhadas e benefícios para cada nível de parceria.
                </p>
              </div>
              <div className="flex-shrink-0">
                <motion.a href="/proposta-patrocinio.pdf" download="Proposta_Patrocinio_Microraptor.pdf"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold px-8 py-4 rounded-2xl text-sm shadow-[0_0_28px_rgba(152,1,1,0.4)] hover:shadow-[0_0_44px_rgba(168,3,3,0.6)] transition-all duration-300 whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Baixar PDF
                </motion.a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── PATROCINADORES ATUAIS ── */}
      <section id="patrocinadores" className="relative py-28 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Nossos parceiros</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2">Patrocinadores Atuais</h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sponsors.map((s, i) => (
              <motion.a key={s.name} href={s.site} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 bg-white/[0.10] border-2 border-white/[0.15] hover:border-[#a80303]/60 hover:bg-white/[0.15] transition-all duration-300">
                <div className="absolute top-2 right-3 text-[9px] font-bold tracking-widest uppercase text-[#a80303]/60 group-hover:text-[#a80303] transition-colors">
                  {s.category}
                </div>
                <div className="relative w-full h-14 flex items-center justify-center">
                  <Image src={s.src} alt={s.name} fill className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <span className="text-gray-400 group-hover:text-gray-200 text-xs font-medium transition-colors text-center">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(152,1,1,0.10),transparent)]" />
        <FadeIn className="max-w-2xl mx-auto text-center relative z-10">
          <SectionLabel>Contato</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Pronto para fazer parte<br />
            <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">do time?</span>
          </h2>
          <p className="text-gray-300 mb-10 leading-relaxed">
            Entre em contato com nossa equipe de gestão para receber a proposta completa
            e discutirmos a melhor cota para sua empresa.
          </p>
          <motion.a href="mailto:microraptorufjf@gmail.com"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold px-10 py-5 rounded-2xl text-base shadow-[0_0_32px_rgba(152,1,1,0.4)] hover:shadow-[0_0_52px_rgba(168,3,3,0.6)] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            microraptorufjf@gmail.com
          </motion.a>
        </FadeIn>
      </section>

    </div>
  );
}
