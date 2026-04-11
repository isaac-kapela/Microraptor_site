/**
 * @file navigation.tsx
 * @brief Navegação principal para desktop.
 * @description Barra de navegação fixa utilizada em telas com largura > 640 px.
 *   Exibe o logo da equipe, os links de rota e o botão de alternância de tema.
 *   O link ativo é destacado com uma pílula animada via Framer Motion.
 * @module Components/navigation
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

/**
 * @brief Lista de rotas exibidas na barra de navegação.
 */
const links = [
  { href: "/",               label: "Início"        },
  { href: "/About",          label: "Sobre"         },
  { href: "/Competicao",     label: "Competição"    },
  { href: "/Patrocinadores", label: "Patrocinadores"},
  { href: "/Bastidores",     label: "Bastidores"    },
  { href: "/Contact",        label: "Contato"       },
];


/**
 * @brief Componente de navegação para desktop.
 * @description Renderiza uma `<nav>` fixa com logo, links animados e toggle de
 *   tema. Adapta as cores conforme o tema ativo (claro/escuro).
 */
export const DesktopNav = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <nav className={`fixed flex items-center justify-center font-[family-name:var(--spaceMono)] shadow-bottom w-full py-8 border-b transition-colors duration-300
      ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-white border-black/10'}`}>
      <div className="absolute left-0 pl-4">
        <Link href="/">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Image src="/microraptor.png" alt="Logo" width={64} height={64} className="drop-shadow-[0_0_12px_rgba(168,3,3,0.6)]" />
          </motion.div>
        </Link>
      </div>

      <div className="flex gap-1">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 block
                  ${active
                    ? theme === 'dark' ? 'text-white' : 'text-black'
                    : 'text-[#a80303] hover:text-[#9b130f]'}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-lg border ${theme === 'dark' ? 'bg-white/8 border-white/10' : 'bg-black/5 border-black/10'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.span>
            </Link>
          );
        })}
      </div>

      <div className="absolute right-4">
        <ThemeToggle />
      </div>
    </nav>
  );
};
