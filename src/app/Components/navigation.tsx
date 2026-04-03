"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/",               label: "Home"          },
  { href: "/About",          label: "About"         },
  { href: "/Patrocinadores", label: "Patrocinadores"},
  { href: "/Contact",        label: "Contact"       },
  { href: "/Sensor",         label: "Sensor"        },
];

export const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed flex items-center justify-center font-[family-name:var(--spaceMono)] shadow-bottom bg-black w-full py-8 border-b border-white/5">
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
                  ${active ? 'text-white' : 'text-[#a80303] hover:text-[#9b130f]'}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
