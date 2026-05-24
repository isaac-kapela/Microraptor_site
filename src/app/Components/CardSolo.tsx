'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, Image } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface CardItem {
	src: string;
	type: 'image' | 'video';
}

export default function InfiniteScrollCards() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [cardData, setCardData] = useState<CardItem[]>([]);
	const [lightbox, setLightbox] = useState<CardItem | null>(null);
	const [cardsPerPage, setCardsPerPage] = useState(4);
	const cardWidth = 340;
	const gap = 16;
	const totalCards = cardData.length;
	const scrollOffset = (cardWidth + gap) * cardsPerPage;
	const isTransitioningRef = useRef(false);

	const cyclicCards = [...cardData, ...cardData, ...cardData];

	// Busca fotos do carousel no banco
	useEffect(() => {
		fetch('/api/photos?category=carousel')
			.then((r) => r.json())
			.then((data: CardItem[]) => setCardData(data))
			.catch(() => setCardData([]));
	}, []);

	// Ajusta o número de cards visíveis conforme a tela
	useEffect(() => {
		const update = () => {
			if (window.innerWidth >= 1200) setCardsPerPage(4);
			else if (window.innerWidth >= 900) setCardsPerPage(3);
			else if (window.innerWidth >= 600) setCardsPerPage(2);
			else setCardsPerPage(1);
		};
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	// Garante que o carrossel inicie na posição correta
	useEffect(() => {
		if (containerRef.current && totalCards > 0) {
			containerRef.current.scrollLeft = totalCards * (cardWidth + gap);
		}
	}, [totalCards]);

	const handleScroll = (direction: 'left' | 'right') => {
		if (!containerRef.current || isTransitioningRef.current || totalCards === 0) return;

		isTransitioningRef.current = true;
		const container = containerRef.current;
		const scrollBase = totalCards * (cardWidth + gap);
		const maxScroll = totalCards * 2 * (cardWidth + gap);

		container.style.scrollBehavior = 'smooth';
		if (direction === 'right') {
			container.scrollLeft += scrollOffset;
		} else {
			container.scrollLeft -= scrollOffset;
		}

		setTimeout(() => {
			container.style.scrollBehavior = 'auto';
			if (container.scrollLeft >= maxScroll - scrollOffset) {
				container.scrollLeft = scrollBase;
			} else if (container.scrollLeft <= scrollBase - scrollOffset) {
				container.scrollLeft = scrollBase + (totalCards - cardsPerPage) * (cardWidth + gap);
			}
			isTransitioningRef.current = false;
		}, 500);
	};

	if (cardData.length === 0) return null;

	return (
		<>
		<AnimatePresence>
			{lightbox && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
					onClick={() => setLightbox(null)}
				>
					<button
						onClick={() => setLightbox(null)}
						className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 rounded-full w-10 h-10 flex items-center justify-center text-2xl leading-none"
					>
						×
					</button>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="max-w-5xl max-h-[90vh] w-full"
						onClick={(e) => e.stopPropagation()}
					>
						{lightbox.type === 'video' ? (
							<video
								src={lightbox.src}
								controls
								autoPlay
								className="w-full max-h-[90vh] rounded-2xl object-contain"
							/>
						) : (
							<img
								src={lightbox.src}
								alt=""
								className="w-full max-h-[90vh] rounded-2xl object-contain"
							/>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>

		<div className="relative overflow-hidden w-full">
			<div
				ref={containerRef}
				className="flex gap-4 pt-8 pb-8 overflow-x-auto scrollbar-hide"
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				{cyclicCards.map((card, index) => (
					<motion.div
						key={`${index}-${card.src}`}
						whileHover={{ scale: 1.05 }}
						className="flex-shrink-0"
						style={{ width: cardWidth }}
					>
						<Card
							isBlurred
							isPressable
							onPress={() => setLightbox(card)}
							shadow="lg"
							className="w-full h-[350px] lg:h-[400px] snap-start cursor-pointer shadow-lg overflow-hidden"
						>
							<CardHeader className="absolute z-10 top-1 flex-col !items-start">
								<p className="text-tiny text-white/60 uppercase font-bold">Nossa Equipe</p>
								<h4 className="text-white font-medium text-sm md:text-base lg:text-lg">Equipe Microraptor</h4>
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
		</>
	);
}
