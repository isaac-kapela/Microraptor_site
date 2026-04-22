'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

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
