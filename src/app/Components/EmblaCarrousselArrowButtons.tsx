/**
 * @file EmblaCarrousselArrowButtons.tsx
 * @brief Botões de navegação e hook para o Embla Carousel.
 * @description Exporta o hook `usePrevNextButtons` e os componentes
 *   `PrevButton` / `NextButton` utilizados no carrossel de áreas.
 * @module Components/EmblaCarrousselArrowButtons
 */

import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

/**
 * @brief Tipo de retorno do hook `usePrevNextButtons`.
 */
type UsePrevNextButtonsType = {
	/** @brief Indica se o botão "anterior" está desabilitado. */
	prevBtnDisabled: boolean;
	/** @brief Indica se o botão "próximo" está desabilitado. */
	nextBtnDisabled: boolean;
	/** @brief Callback para rolar para o slide anterior. */
	onPrevButtonClick: () => void;
	/** @brief Callback para rolar para o próximo slide. */
	onNextButtonClick: () => void;
};

/**
 * @brief Hook para gerenciar os botões de navegação do Embla Carousel.
 * @description Sincroniza o estado desabilitado dos botões com a posição
 *   atual do carrossel via eventos `select` e `reInit`.
 * @param emblaApi Instância da API do Embla Carousel.
 * @returns Estados e callbacks dos botões de navegação.
 */
export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

/** @brief Props padrão de um elemento `<button>` HTML. */
type PropType = ComponentPropsWithRef<'button'>;

/**
 * @brief Botão "anterior" do carrossel Embla.
 * @description Renderiza um botão com ícone SVG de seta para a esquerda.
 */
export const PrevButton: React.FC<PropType> = props => {
	const { children, ...restProps } = props;

	return (
		<button className="embla__button embla__button--prev" type="button" {...restProps}>
			<svg className="embla__button__svg" viewBox="0 0 532 532">
				<path
					fill="currentColor"
					d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
				/>
			</svg>
			{children}
		</button>
	);
};

/**
 * @brief Botão "próximo" do carrossel Embla.
 * @description Renderiza um botão com ícone SVG de seta para a direita.
 */
export const NextButton: React.FC<PropType> = props => {
	const { children, ...restProps } = props;

	return (
		<button className="embla__button embla__button--next" type="button" {...restProps}>
			<svg className="embla__button__svg" viewBox="0 0 532 532">
				<path
					fill="currentColor"
					d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
				/>
			</svg>
			{children}
		</button>
	);
};
