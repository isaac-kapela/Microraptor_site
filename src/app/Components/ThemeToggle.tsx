/**
 * @file ThemeToggle.tsx
 * @brief Botão de alternância de tema claro/escuro.
 * @description Renderiza um botão animado que alterna entre os ícones de sol
 *   (modo claro) e lua (modo escuro), consumindo o contexto de tema.
 * @module Components/ThemeToggle
 */

'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

/**
 * @brief Componente de botão para alternância de tema.
 * @description Usa framer-motion para animações de hover/tap e exibe o ícone
 *   correspondente ao tema oposto ao atual.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Alternar tema"
      className="p-2 rounded-lg text-[#a80303] hover:text-[#9b130f] transition-colors duration-200"
    >
      {theme === 'dark' ? (
        <Icon icon="material-symbols-light:light-mode-outline" width="22" height="22" />
      ) : (
        <Icon icon="material-symbols-light:dark-mode-outline" width="22" height="22" />
      )}
    </motion.button>
  );
}
