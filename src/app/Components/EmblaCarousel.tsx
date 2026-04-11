/**
 * @file EmblaCarousel.tsx
 * @brief Carrossel de cards baseado na biblioteca Embla Carousel.
 * @description Recebe uma lista de `CardInfo` e opções do Embla, renderiza os
 *   slides e expõe botões de navegação (anterior/próximo) com controle de
 *   estado desabilitado nos extremos.
 * @module Components/EmblaCarousel
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CardSlide, CardInfo } from './CardOriginal';
import { PrevButton, NextButton } from './EmblaCarrousselArrowButtons';

/** @brief Tipo das opções aceitas pelo hook `useEmblaCarousel`. */
type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];

/**
 * @brief Props do componente EmblaCarousel.
 */
type PropType = {
  /** @brief Lista de cards a serem renderizados como slides. */
  slides: CardInfo[];
  /** @brief Opções de configuração do Embla Carousel. */
  options?: EmblaOptions;
};

/**
 * @brief Carrossel de cards com navegação por botões.
 * @description Gerencia os estados `prevBtnDisabled` e `nextBtnDisabled`
 *   sincronizados com os eventos `select` e `reInit` do Embla.
 * @param slides Lista de dados dos slides.
 * @param options Opções opcionais para o Embla Carousel.
 */
const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <CardSlide key={index} data={slide} index={index} />
        ))}
      </div>

      <PrevButton
        onClick={() => emblaApi?.scrollPrev()}
        disabled={prevBtnDisabled}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      />

      <NextButton
        onClick={() => emblaApi?.scrollNext()}
        disabled={nextBtnDisabled}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next slide"
      />
    </div>
  );
};

export default EmblaCarousel;
