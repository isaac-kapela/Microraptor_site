/**
 * @file CardSolo.tsx
 * @brief Carrossel infinito de imagens e vídeos da equipe.
 * @description Exibe um carrossel horizontal com scroll infinito (triplicando os
 *   itens internamente) e botões de navegação esquerda/direita. Ajusta o número
 *   de cards visíveis conforme o breakpoint de largura da tela.
 * @module Components/CardSolo
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, Image } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

/**
 * @brief Dados de cada card do carrossel.
 */
const cardData = [
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto1.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto2.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto3.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto4.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto5.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto6.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/video1.mp4',
		type: 'video' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto7.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto8.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/video2.mp4',
		type: 'video' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto9.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto10.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto11.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/foto12.jpeg',
		type: 'image' as const,
	},
	{
		href: '/About',
		title: 'Nossa Equipe',
		description: 'Equipe Microraptor',
		src: '/equipe/video3.mp4',
		type: 'video' as const,
	},
];

/**
 * @brief Componente de carrossel com scroll infinito.
 * @description Triplica os dados internamente para permitir navegação circular.
 *   Ajusta `cardsPerPage` em breakpoints: 1 (< 600px), 2 (≥ 600px),
 *   3 (≥ 900px) e 4 (≥ 1200px).
 */
export default function InfiniteScrollCards() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [cardsPerPage, setCardsPerPage] = useState(4);
	/** @brief Largura fixa de cada card em pixels. */
	const cardWidth = 340;
	/** @brief Espaçamento entre cards em pixels. */
	const gap = 16;
	const totalCards = cardData.length;
	const scrollOffset = (cardWidth + gap) * cardsPerPage;
	/** @brief Flag para evitar múltiplos scrolls simultâneos. */
	const isTransitioningRef = useRef(false);

	/** @brief Tripla os cards para criar o efeito de scroll infinito. */
	const cyclicCards = [...cardData, ...cardData, ...cardData];

	// Ajusta o número de cards visíveis conforme a tela
	useEffect(() => {
		const updateCardsPerPage = () => {
			if (window.innerWidth >= 1200) {
				setCardsPerPage(4);
			} else if (window.innerWidth >= 900) {
				setCardsPerPage(3);
			} else if (window.innerWidth >= 600) {
				setCardsPerPage(2);
			} else {
				setCardsPerPage(1);
			}
		};
		updateCardsPerPage();
		window.addEventListener('resize', updateCardsPerPage);
		return () => window.removeEventListener('resize', updateCardsPerPage);
	}, []);

	// Garante que o carrossel inicie na posição correta
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = totalCards * (cardWidth + gap);
		}
	}, []);

	/**
	 * @brief Realiza o scroll do carrossel em uma direção.
	 * @description Move o scroll horizontalmente e reposiciona silenciosamente
	 *   para o segmento central quando atinge os limites, criando o loop infinito.
	 * @param direction Direção do scroll: `'left'` ou `'right'`.
	 */
	const handleScroll = (direction: 'left' | 'right') => {
		if (!containerRef.current || isTransitioningRef.current) return;

		isTransitioningRef.current = true;
		const container = containerRef.current;
		const scrollBase = totalCards * (cardWidth + gap);
		const maxScroll = totalCards * 2 * (cardWidth + gap);

		if (direction === 'right') {
			container.style.scrollBehavior = 'smooth';
			container.scrollLeft += scrollOffset;
		} else {
			container.style.scrollBehavior = 'smooth';
			container.scrollLeft -= scrollOffset;
		}

		setTimeout(() => {
			container.style.scrollBehavior = 'auto';

			// Ajuste invisível para loop infinito
			if (container.scrollLeft >= maxScroll - scrollOffset) {
				container.scrollLeft = scrollBase;
			} else if (container.scrollLeft <= scrollBase - scrollOffset) {
				container.scrollLeft = scrollBase + (totalCards - cardsPerPage) * (cardWidth + gap);
			}

			isTransitioningRef.current = false;
		}, 500);
	};

	return (
		<div className="relative overflow-hidden w-full">
			<div
				ref={containerRef}
				className="flex gap-4 pt-8 pb-8 overflow-x-auto scrollbar-hide"
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				{cyclicCards.map((card, index) => (
					<motion.div
						key={`${index}-${card.description}`}
						whileHover={{ scale: 1.05 }}
						className="flex-shrink-0"
						style={{ width: cardWidth }}
					>
						<Card
							isBlurred
							isPressable
							onPress={() => (window.location.href = card.href)}
							shadow="lg"
							className="w-full h-[350px] lg:h-[400px] snap-start cursor-pointer shadow-lg overflow-hidden"
						>
							<CardHeader className="absolute z-10 top-1 flex-col !items-start">
								<p className="text-tiny text-white/60 uppercase font-bold">{card.title}</p>
								<h4 className="text-white font-medium text-sm md:text-base lg:text-lg">{card.description}</h4>
							</CardHeader>
							{card.type === 'video' ? (
								<video
									src={card.src}
									autoPlay
									muted
									loop
									playsInline
									className="z-0 w-full h-full object-cover"
								/>
							) : (
								<Image
									removeWrapper
									draggable="false"
									alt="Card background"
									className="z-0 w-full h-full object-cover"
									src={card.src}
								/>
							)}
						</Card>
					</motion.div>
				))}
			</div>

			<button
				onClick={() => handleScroll('left')}
				className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
			>
				<Icon icon="mdi:chevron-left" className="text-white" width={24} height={24} />
			</button>

			<button
				onClick={() => handleScroll('right')}
				className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
			>
				<Icon icon="mdi:chevron-right" className="text-white" width={24} height={24} />
			</button>
		</div>
	);
}
