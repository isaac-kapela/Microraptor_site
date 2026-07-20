'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/',                 label: 'Início'           },
  { href: '/About',            label: 'Sobre'            },
  { href: '/Competicao',       label: 'Competição'       },
  { href: '/Patrocinadores',   label: 'Patrocinadores'   },
  { href: '/ProcessoSeletivo', label: 'Processo Seletivo'},
  { href: '/Contact',          label: 'Contato'          },
];

const staticContacts = [
  { icon: 'mdi:email-outline', label: 'microraptorufjf@gmail.com', href: 'mailto:microraptorufjf@gmail.com', type: 'email'   },
  { icon: 'mdi:phone-outline', label: '+55 32 9112-6624',          href: 'tel:+553291126624',                type: 'phone'   },
  { icon: 'mdi:phone-outline', label: '+55 32 9931-0160',          href: 'tel:+5532993101060',               type: 'phone'   },
];

const iconFor = (type: string) =>
  type === 'email'    ? 'mdi:email-outline'    :
  type === 'whatsapp' ? 'mdi:whatsapp'         :
  'mdi:phone-outline';

const socials = [
  { icon: 'mdi:instagram',  href: 'https://www.instagram.com/microraptorufjf/', label: 'Instagram' },
  { icon: 'mdi:linkedin',   href: 'https://www.linkedin.com/company/microraptor-ufjf/', label: 'LinkedIn' },
];

export default function Footer() {
  const [dbContacts, setDbContacts] = useState<{ label: string; href: string; type: string }[]>([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then((r) => r.json())
      .then((data) => setDbContacts(data))
      .catch(() => {});
  }, []);

  const contacts = [
    ...staticContacts,
    ...dbContacts.map((c) => ({ ...c, icon: iconFor(c.type) })),
  ];

  return (
    <footer className="relative mt-auto border-t border-white/[0.06] bg-black">
      {/* Linha decorativa vermelha */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a80303]/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + descrição */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <Image src="/microraptor.png" alt="Microraptor" width={40} height={40} />
            <span className="text-white font-bold text-lg tracking-wide">Microraptor</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            Equipe de Aerodesign da Universidade Federal de Juiz de Fora. Projetamos, desenvolvemos e construímos aeronaves rádio controladas de alto desempenho.
          </p>
          {/* Redes sociais */}
          <div className="flex gap-3 mt-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-gray-500 hover:text-white hover:border-[#a80303]/50 hover:bg-[#980101]/10 transition-all duration-200"
              >
                <Icon icon={s.icon} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Navegação */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-1">Navegação</h3>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-500 hover:text-[#a80303] text-sm transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-1">Contato</h3>
          {contacts.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="flex items-center gap-2 text-gray-500 hover:text-[#a80303] text-sm transition-colors duration-200 group"
            >
              <Icon icon={c.icon} width={15} height={15} className="shrink-0 group-hover:text-[#a80303]" />
              {c.label}
            </a>
          ))}
        </div>

        {/* Universidade */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-1">Universidade</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Universidade Federal de Juiz de Fora<br />
            Juiz de Fora — MG, Brasil
          </p>
          <a
            href="https://www2.ufjf.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a80303] hover:text-[#9b130f] text-sm font-medium transition-colors duration-200 w-fit"
          >
            ufjf.br →
          </a>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-white/[0.04] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-600 text-xs">
          <span>© {new Date().getFullYear()} Microraptor UFJF. Todos os direitos reservados.</span>
          <span>Equipe de Aerodesign · UFJF</span>
        </div>
      </div>
    </footer>
  );
}
