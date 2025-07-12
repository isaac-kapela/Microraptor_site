'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { CardSlide, CardInfo } from './CardOriginal';
import { PrevButton, NextButton } from './EmblaCarrousselArrowButtons';

type PropType = {
	slides: CardInfo[];
	options?: EmblaOptionsType;
};

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
				className={`absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed`}
				aria-label="Previous slide"
			></PrevButton>

			<NextButton
				onClick={() => emblaApi?.scrollNext()}
				disabled={nextBtnDisabled}
				className={`absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed`}
				aria-label="Next slide"
			></NextButton>
		</div>
	);
};

export default EmblaCarousel;
