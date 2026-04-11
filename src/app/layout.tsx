/**
 * @file layout.tsx
 * @brief Layout raiz da aplicação Next.js.
 * @description Define a estrutura HTML base (head, body, header e main) que
 *   envolve todas as páginas. Configura as fontes Google, injeta o script de
 *   tema bloqueante para evitar flash de tema e renderiza a navbar responsiva.
 * @module app/layout
 */

'use client';

import { Geist, Geist_Mono, Space_Mono, Montserrat } from 'next/font/google';
import './globals.css';

import HamburguerComponent from './Components/hamburguer';
import useWindowDimensions from './Components/windowDimension';
import { DesktopNav } from './Components/navigation';
import { ThemeProvider } from './Components/ThemeProvider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const spaceMono = Space_Mono({
	variable: '--font-space-mono',
	subsets: ['latin'],
	style: 'normal',
	weight: '400',
});

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
});

/**
 * @brief Componente responsivo que escolhe entre a navbar desktop e mobile.
 * @description Utiliza `useWindowDimensions` para selecionar `DesktopNav`
 *   (largura > 640 px) ou `HamburguerComponent` (mobile).
 */
const ResponsiveComponent = () => {
	const { width } = useWindowDimensions() || { width: 0 };
	return width > 640 ? <DesktopNav />  : <HamburguerComponent />;
};

/**
 * @brief Layout raiz compartilhado por todas as rotas da aplicação.
 * @description Envolve o conteúdo com `ThemeProvider`, injeta o script de
 *   inicialização de tema e renderiza o header fixo de 80 px de altura.
 * @param children Conteúdo da página corrente.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Script bloqueante: define o tema ANTES da primeira pintura, evitando flash */}
				<script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){document.documentElement.classList.add('dark')}})()` }} />
			</head>
			<body className={`antialiased`}>
				<ThemeProvider>
					<header className="fixed top-0 left-0 w-full z-50 shadow-lg h-[80px] flex items-center">
						{/* Navbar Responsiva */}
						<ResponsiveComponent />
					</header>

					{/* Adiciona margem para evitar que o conteúdo sobreponha o header */}
					<main className="pt-[80px] font-[family-name:var(--monstserrat)] transition-[filter] duration-300">{children}</main>

					<footer></footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
