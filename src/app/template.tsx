/**
 * @file template.tsx
 * @brief Template de transição entre páginas.
 * @description Envolve cada mudança de rota com uma animação de fade + deslize
 *   vertical usando `AnimatePresence` do Framer Motion.
 * @module app/template
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';

/**
 * @brief Template animado de transição de página.
 * @description Aplica `opacity` e `y` (deslize vertical) ao entrar e sair,
 *   com duração de 450 ms e easing cúbico personalizado.
 * @param children Conteúdo da página que será animado.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
