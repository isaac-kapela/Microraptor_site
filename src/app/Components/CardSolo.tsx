'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, Image } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const cardData = [
	{
		href: '/event',
		title: 'What to watch',
		description: '1',
		imageSrc: 'https://heroui.com/images/card-example-4.jpeg',
	},
	{
		href: '/plant',
		title: 'Plant a tree',
		description: '2',
		imageSrc: 'https://heroui.com/images/card-example-3.jpeg',
	},
	{
		href: '/supercharged',
		title: 'Supercharged',
		description: '3',
		imageSrc: 'https://heroui.com/images/card-example-2.jpeg',
	},
	{ href: '/supercharged', title: 'Supercharged', description: '4', imageSrc: './imagemTexto2.png' },
	{
		href: '/supercharged',
		title: 'Supercharged',
		description: '5',
		imageSrc: 'https://heroui.com/images/card-example-2.jpeg',
	},
	{
		href: '/supercharged',
		title: 'Supercharged',
		description: '6',
		imageSrc: 'https://heroui.com/images/card-example-2.jpeg',
	},
	{
		href: '/event',
		title: 'What to watch',
		description: '7',
		imageSrc: 'https://heroui.com/images/card-example-4.jpeg',
	},
	{
		href: '/plant',
		title: 'Plant a tree',
		description: '8',
		imageSrc: 'https://heroui.com/images/card-example-3.jpeg',
	},
	{
		href: '/supercharged',
		title: 'Supercharged',
		description: '9',
		imageSrc: 'https://heroui.com/images/card-example-2.jpeg',
	},
	{ href: '/supercharged', title: 'Supercharged', description: '10', imageSrc: './imagemTexto2.png' },
	{
		href: '/supercharged',
		title: 'Supercharged',
		description: '11',
		imageSrc: 'https://heroui.com/images/card-example-2.jpeg',
	},
	{
		href: '/supercharged',
		title: 'Supercharged',
		description: '12',
		imageSrc: 'https://heroui.com/images/card-example-2.jpeg',
	},
];

export default function InfiniteScrollCards() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [cardsPerPage, setCardsPerPage] = useState(4);
	const cardWidth = 340;
	const gap = 16;
	const totalCards = cardData.length;
	const scrollOffset = (cardWidth + gap) * cardsPerPage;
	const isTransitioningRef = useRef(false);

	// Duplica os cards para criar o efeito infinito
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
							className="w-full h-[350px] lg:h-[400px] snap-start cursor-pointer shadow-lg"
						>
							<CardHeader className="absolute z-10 top-1 flex-col !items-start">
								<p className="text-tiny text-white/60 uppercase font-bold">{card.title}</p>
								<h4 className="text-white font-medium text-sm md:text-base lg:text-lg">{card.description}</h4>
							</CardHeader>
							<Image
								removeWrapper
								draggable="false"
								alt="Card background"
								className="z-0 w-full h-full object-cover"
								src={card.imageSrc}
							/>
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
