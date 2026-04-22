'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

const timeline = [
  { year: '2018', place: '3°', tier: 3, color: 'from-white/30 to-white/10'      },
  { year: '2019', place: '2°', tier: 2, color: 'from-white/50 to-white/20'      },
  { year: '2020', place: '1°', tier: 1, color: 'from-[#a80303] to-[#980101]'    },
  { year: '2021', place: '3°', tier: 3, color: 'from-white/30 to-white/10'      },
  { year: '2022', place: '1°', tier: 1, color: 'from-[#a80303] to-[#980101]'    },
  { year: '2023', place: '1°', tier: 1, color: 'from-[#a80303] to-[#980101]'    },
];

const specialAwards = [
  { abbr: 'ELE', title: 'Melhor Relatório de Elétrica', subtitle: 'Classe Micro · 2025' },
  { abbr: 'ORL', title: 'Melhor Apresentação Oral',     subtitle: '2025'                },
];

const stats = [
  { value: '7+',  label: 'Anos competindo'     },
  { value: '3×',  label: 'Campeões nacionais'  },
  { value: '9',   label: 'Áreas de atuação'    },
  { value: 'UFJF',label: 'Universidade Federal'},
];

const areas = [
  { slug: 'aerodinamica',     abbr: 'ADN', name: 'Aerodinâmica',     description: 'Estudo do escoamento do ar para maximizar sustentação e reduzir arrasto, garantindo eficiência máxima no voo.'          },
  { slug: 'estabilidade',     abbr: 'EST', name: 'Estabilidade',      description: 'Garante controle e segurança da aeronave, assegurando resposta precisa aos comandos e estabilidade durante o voo.'       },
  { slug: 'desempenho',       abbr: 'DSP', name: 'Desempenho',        description: 'Otimização da missão por meio de análise de voo, definição de limites operacionais e melhor rendimento.'                 },
  { slug: 'eletrica',         abbr: 'ELE', name: 'Elétrica',          description: 'Sistema propulsivo e eletrônica embarcada: motor, bateria, controle, instrumentação e coleta de dados.'                  },
  { slug: 'aeroelasticidade', abbr: 'AEL', name: 'Aeroelasticidade',  description: 'Estudo da interação fluido-estrutura: vibrações, deformações em voo e fenômenos como flutter.'                          },
  { slug: 'cargas',           abbr: 'CAR', name: 'Cargas',            description: 'Cálculo dos esforços, forças e momentos na aeronave — base fundamental para o projeto estrutural.'                       },
  { slug: 'estruturas',       abbr: 'STR', name: 'Estruturas',        description: 'Projeto estrutural focado em resistência, segurança, redução de peso e escolha inteligente de materiais.'                },
  { slug: 'plantas',          abbr: 'PLT', name: 'Plantas',           description: 'Modelagem CAD no SolidWorks: planejamento de fabricação e integração completa do projeto da aeronave.'                   },
  { slug: 'gestao',           abbr: 'GST', name: 'Gestão',            description: 'Organização da equipe: planejamento estratégico, financeiro, marketing, divulgação e captação de patrocínios.'           },
];

const fabricacaoAreas = [
  { slug: 'fuselagem-e-laminacao', abbr: 'F&L', name: 'Fuselagem e Laminação', description: 'Fabricação do corpo da aeronave e peças em compósitos — fibra de carbono e fibra de vidro — com técnicas de laminação a vácuo e infusão de resina.' },
  { slug: 'cauda',                 abbr: 'CAU', name: 'Cauda',                  description: 'Fabricação das empenagens horizontal e vertical, com instalação precisa do profundor e leme.'                                                          },
  { slug: 'asa',                   abbr: 'ASA', name: 'Asa',                    description: 'Fabricação da asa principal com perfil aerodinâmico preciso, revestimento e instalação dos ailerons.'                                                   },
];

const reasons = [
  { num: '01', title: 'Experiência real',        description: 'Engenharia aplicada desde o primeiro dia, com desafios do mercado real.'      },
  { num: '02', title: 'Equipe multidisciplinar', description: 'Trabalho colaborativo com estudantes de múltiplos cursos.'                    },
  { num: '03', title: 'Aprendizado acelerado',   description: 'Conhecimento técnico e soft skills desenvolvidos em paralelo.'                },
  { num: '04', title: 'Competições nacionais',   description: 'Represente a UFJF nos maiores campeonatos de Aerodesign do país.'            },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOp  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative w-full h-[92vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/imagemTexto2.png" alt="Microraptor" fill className="object-cover object-center opacity-25" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(152,1,1,0.18),transparent)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <motion.div style={{ opacity: heroOp }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }} className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#a80303]/25 blur-2xl scale-150" />
              <Image src="/microraptor.png" alt="Logo Microraptor" width={100} height={100}
                className="relative drop-shadow-[0_0_40px_rgba(168,3,3,0.9)]" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SectionLabel>Universidade Federal de Juiz de Fora</SectionLabel>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-br from-white via-white/80 to-[#a80303] bg-clip-text text-transparent">Micro</span>
            <span className="bg-gradient-to-br from-[#a80303] via-[#9b130f] to-white bg-clip-text text-transparent">raptor</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="mt-6 text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            Equipe de Aerodesign · Projetamos aeronaves que vencem.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap justify-center gap-3">
            {['Aerodesign', 'Tricampeões', 'UFJF', '9 Áreas'].map((pill) => (
              <span key={pill} className="px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-sm text-gray-300">
                {pill}
              </span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-[#a80303]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── QUEM SOMOS ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(152,1,1,0.08),transparent)]" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <FadeIn>
            <SectionLabel>Sobre nós</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Mais que uma equipe,<br />
              <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">um legado.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Somos a <strong className="text-white">Microraptor</strong>, equipe de Aerodesign da UFJF, formada por estudantes
              de diversos cursos da universidade. Projetamos, desenvolvemos e construímos aeronaves rádio controladas de alto desempenho.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Unimos engenharia, trabalho em equipe e desafios reais do mercado — transformando teoria em voo.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative group rounded-2xl p-6 bg-white/[0.04] border border-white/[0.08] hover:border-[#a80303]/50 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#980101]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl md:text-4xl font-black text-[#a80303] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── CONQUISTAS ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(152,1,1,0.05),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Histórico</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Conquistas</h2>
            <span className="inline-block px-6 py-2 rounded-full bg-[#980101]/20 border border-[#a80303]/30 text-[#a80303] font-semibold text-sm">
              Equipe Tricampeã Nacional
            </span>
          </FadeIn>

          <div className="relative mb-20">
            <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg mb-3 border border-white/20`}>
                    <span className="text-white font-black text-lg leading-none">{item.place}</span>
                  </div>
                  <div className="text-white font-semibold text-sm">Lugar</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.year}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2} className="grid md:grid-cols-2 gap-5">
            {specialAwards.map((award) => (
              <div key={award.title}
                className="relative flex items-center gap-5 rounded-2xl p-6 bg-[#980101]/10 border border-[#a80303]/30 overflow-hidden">
                <div className="absolute right-5 top-4 text-5xl font-black opacity-[0.06] select-none tracking-tighter text-white">{award.abbr}</div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#980101]/20 border border-[#a80303]/40 flex-shrink-0">
                  <span className="text-[#a80303] font-black text-sm tracking-wider">{award.abbr}</span>
                </div>
                <div>
                  <div className="font-bold text-white text-lg leading-tight">{award.title}</div>
                  <div className="text-[#a80303] text-sm mt-1">{award.subtitle}</div>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── 9 ÁREAS ── */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_50%,rgba(152,1,1,0.06),transparent)]" />
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Estrutura</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Nossas 9 Áreas</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Trabalhamos de forma integrada para desenvolver a aeronave do projeto ao voo.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area, i) => (
              <motion.div key={area.slug}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ y: -6 }}>
                <Link href={`/areas/${area.slug}`}>
                  <div className="group relative rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/50 hover:bg-[#980101]/8 transition-all duration-300 cursor-pointer h-full">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#980101]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-[#980101]/15 border border-[#a80303]/25 flex items-center justify-center mb-4 group-hover:bg-[#980101]/30 group-hover:border-[#a80303]/50 transition-all">
                        <span className="text-[#a80303] font-black text-xs tracking-wider">{area.abbr}</span>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#a80303] transition-colors duration-300">{area.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{area.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-[#a80303]/60 group-hover:text-[#a80303] transition-colors text-sm font-medium">
                        <span>Ver mais</span>
                        <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ── ÁREAS DE FABRICAÇÃO ── */}
          <FadeIn className="text-center mt-24 mb-12">
            <SectionLabel>Fabricação</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4">Áreas de Fabricação</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Onde o projeto sai do computador e ganha forma física. As equipes de fabricação transformam modelos CAD em componentes reais, trabalhando com materiais compostos, ferramentas de precisão e processos artesanais de alta qualidade.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-4">
            {fabricacaoAreas.map((area, i) => (
              <motion.div key={area.slug}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}>
                <Link href={`/areas/${area.slug}`}>
                  <div className="group relative rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/50 hover:bg-[#980101]/8 transition-all duration-300 cursor-pointer h-full">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#980101]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-[#980101]/15 border border-[#a80303]/25 flex items-center justify-center mb-4 group-hover:bg-[#980101]/30 group-hover:border-[#a80303]/50 transition-all">
                        <span className="text-[#a80303] font-black text-xs tracking-wider">{area.abbr}</span>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#a80303] transition-colors duration-300">{area.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{area.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-[#a80303]/60 group-hover:text-[#a80303] transition-colors text-sm font-medium">
                        <span>Ver mais</span>
                        <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE ENTRAR ── */}
      <section className="relative py-32 px-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Faça parte</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2">Por que entrar?</h2>
          </FadeIn>

          <FadeIn delay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r, i) => (
              <motion.div key={r.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07] hover:border-[#a80303]/40 hover:bg-[#980101]/8 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#980101]/15 border border-[#a80303]/25 flex items-center justify-center mb-4">
                  <span className="text-[#a80303] font-black text-xs">{r.num}</span>
                </div>
                <div className="font-bold text-white mb-2 group-hover:text-[#a80303] transition-colors">{r.title}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{r.description}</div>
              </motion.div>
            ))}
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
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                Processo Seletivo<br />
                <span className="bg-gradient-to-r from-[#a80303] to-[#9b130f] bg-clip-text text-transparent">Aberto Agora</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
 
                Estamos em busca de novos talentos para fazer parte da nossa história.
                Paixão por aviação, engenharia e trabalho em equipe? Esse é o seu lugar.
              </p>
              <motion.a
                href="https://wa.me/553299310160?text=Ol%C3%A1%21%20Conheci%20a%20equipe%20Microraptor%20atrav%C3%A9s%20do%20site%20e%20estou%20entrando%20em%20contato%20para%20conhecer%20melhor%20e%20saber%20como%20fazer%20parte%20da%20equipe."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#a80303] to-[#980101] hover:from-[#9b130f] hover:to-[#a80303] text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-[0_0_40px_rgba(152,1,1,0.4)] hover:shadow-[0_0_60px_rgba(168,3,3,0.6)] transition-all duration-300">
                Quero fazer parte
              </motion.a>
              <p className="mt-6 text-gray-600 text-sm">microraptorufjf@gmail.com</p>
            </div>
            
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
