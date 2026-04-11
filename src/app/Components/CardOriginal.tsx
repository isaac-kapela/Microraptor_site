/**
 * @file CardOriginal.tsx
 * @brief Componentes de card e carrossel Embla para áreas da equipe.
 * @description Define o tipo `CardInfo` e os componentes `CardSlide` (card
 *   individual) e o carrossel baseado na biblioteca Embla Carousel.
 * @module Components/CardOriginal
 */

// components/CardSlide.tsx
'use client';

import { Card, CardHeader, Image } from '@heroui/react';
import { motion } from 'framer-motion';

/**
 * @brief Dados necessários para renderizar um card de área.
 */
export type CardInfo = {
	/** @brief Identificador único do card. */
	id: string;
	/** @brief URL de destino ao clicar no card. */
	href: string;
	/** @brief Título exibido no cabeçalho do card. */
	title: string;
	/** @brief Descrição exibida abaixo do título. */
	description: string;
	/** @brief Caminho da imagem de fundo do card. */
	imageSrc: string;
};

/**
 * @brief Props do componente CardSlide.
 */
interface CardSlideProps {
	/** @brief Dados do card a ser exibido. */
	data: CardInfo;
	/** @brief Índice do card na lista (usado como key). */
	index: number;
}

/**
 * @brief Card individual com imagem de fundo e animação de hover.
 * @description Ao ser pressionado, redireciona o usuário para `data.href`.
 * @param data Dados do card (título, descrição, imagem, link).
 * @param index Posição do card no carrossel.
 */
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
