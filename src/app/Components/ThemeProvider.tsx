/**
 * @file ThemeProvider.tsx
 * @brief Provedor de tema claro/escuro da aplicação.
 * @description Gerencia o estado do tema (dark/light) e o persiste no
 *   localStorage, expondo-o via React Context para toda a árvore de componentes.
 * @module Components/ThemeProvider
 */

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

/** @brief Tipo dos temas disponíveis. */
type Theme = 'dark' | 'light';

/**
 * @brief Forma do valor exposto pelo ThemeContext.
 */
interface ThemeContextValue {
  /** @brief Tema atualmente ativo. */
  theme: Theme;
  /** @brief Alterna entre os temas claro e escuro. */
  toggleTheme: () => void;
}

/** @brief Context padrão com tema escuro e função vazia. */
const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

/**
 * @brief Componente provedor do tema da aplicação.
 * @description Lê o tema persistido no localStorage na montagem e sincroniza
 *   a classe CSS `dark` no elemento `<html>`.
 * @param children Árvore de componentes filhos que terão acesso ao contexto.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initial = stored ?? 'dark';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  /**
   * @brief Alterna o tema e persiste a escolha no localStorage.
   */
  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * @brief Hook para consumir o contexto de tema.
 * @returns Objeto com o tema atual e a função de alternância.
 */
export const useTheme = () => useContext(ThemeContext);
