"use client"; // Adicione isso no topo do arquivo

import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  // Inicialize o estado com valores padrão
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Função para atualizar as dimensões
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Atualize as dimensões assim que o componente for montado
    handleResize();

    // Adicione um listener para o evento de redimensionamento
    window.addEventListener("resize", handleResize);

    // Remova o listener quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // O array vazio garante que o useEffect só seja executado uma vez

  return dimensions;
};

export default useWindowDimensions;
