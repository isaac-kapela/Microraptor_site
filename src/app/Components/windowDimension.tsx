/**
 * @file windowDimension.tsx
 * @brief Hook customizado para obter as dimensões da janela.
 * @description Retorna a largura e altura atuais do viewport e as atualiza
 *   automaticamente ao redimensionar a janela.
 * @module Components/windowDimension
 */

"use client";

import { useState, useEffect } from "react";

/**
 * @brief Hook que rastreia as dimensões da janela do navegador.
 * @description Inicializa com `{ width: 0, height: 0 }` (SSR-safe) e atualiza
 *   o estado via listener de `resize` no cliente.
 * @returns Objeto com `width` e `height` em pixels do viewport atual.
 */
const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
};

export default useWindowDimensions;
