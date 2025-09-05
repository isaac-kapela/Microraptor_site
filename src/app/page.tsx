'use client';

import Image from 'next/image';
import EmblaCarousel from './Components/EmblaCarousel';
import { CardInfo } from './Components/CardOriginal';
import EnviarDados from './Components/enviadados';
import useEmblaCarousel from 'embla-carousel-react';

const OPTIONS: Parameters<typeof useEmblaCarousel>[0] = {
  loop: true,
  containScroll: 'trimSnaps',
  skipSnaps: false,
};

const SLIDES: CardInfo[] = [
  {
    id: 'a',
    href: '/event',
    title: 'What to watch',
    description: '1',
    imageSrc: 'https://heroui.com/images/card-example-4.jpeg',
  },
  {
    id: 'b',
    href: '/plant',
    title: 'Plant a tree',
    description: '2',
    imageSrc: 'https://heroui.com/images/card-example-3.jpeg',
  },
  {
    id: 'c',
    href: '/supercharged',
    title: 'Supercharged',
    description: '3',
    imageSrc: 'https://heroui.com/images/card-example-2.jpeg',
  },
  {
    id: 'd',
    href: '/event',
    title: 'What to watch',
    description: '4',
    imageSrc: 'https://heroui.com/images/card-example-4.jpeg',
  },
  {
    id: 'e',
    href: '/event',
    title: 'What to watch',
    description: '5',
    imageSrc: 'https://heroui.com/images/card-example-4.jpeg',
  },
  {
    id: 'f',
    href: '/event',
    title: 'What to watch',
    description: '6',
    imageSrc: 'https://heroui.com/images/card-example-4.jpeg',
  },
];

const App: React.FC = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </>
);

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Seção da Imagem de Fundo */}
      <section className="w-full h-[25vh] xxs:h-[35vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] relative">
        <Image
          src="/imagemTexto2.png"
          alt="Imagem de fundo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          draggable={false}
          priority
        />
      </section>

      <div className="relative z-10 w-full flex">
        <App />
      </div>
    </div>
  );
}
