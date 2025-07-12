// components/CardSlide.tsx
'use client';

import { Card, CardHeader, Image } from '@heroui/react';
import { motion } from 'framer-motion';

export type CardInfo = {
	id: string;
	href: string;
	title: string;
	description: string;
	imageSrc: string;
};

interface CardSlideProps {
	data: CardInfo;
	index: number;
}

export const CardSlide: React.FC<CardSlideProps> = ({ data, index }) => {
	return (
		<motion.div key={`${index}-${data.description}`} whileHover={{ scale: 1.05 }} className="flex-shrink-0 px-2">
			<Card
				isBlurred
				isPressable
				onPress={() => (window.location.href = data.href)}
				shadow="lg"
				className="w-[320px] h-[350px] lg:h-[400px] snap-start cursor-pointer shadow-lg mt-4 mb-4"
			>
				<CardHeader className="absolute z-10 top-1 flex-col !items-start">
					<p className="text-tiny text-white/60 uppercase font-bold">{data.title}</p>
					<h4 className="text-white font-medium text-sm md:text-base lg:text-lg">{data.description}</h4>
				</CardHeader>
				<Image
					removeWrapper
					draggable="false"
					alt="Card background"
					className="z-0 w-full h-full object-cover"
					src={data.imageSrc}
				/>
			</Card>
		</motion.div>
	);
};
