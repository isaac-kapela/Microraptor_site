'use client';

import { useState } from 'react';
import Hamburger from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function HamburguerComponent() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className="fixed flex items-center justify-center font-[family-name:var(--spaceMono)] shadow-bottom w-full py-8 bg-black">
			<div className="absolute left-0 pl-4">
				<Link onClick={() => setOpen(false)} href="/">
					<Image src="/microraptor.png" alt="Logo" width={48} height={48} />
				</Link>
			</div>

			<div className="absolute right-0 mx-2 my-4 flex items-center gap-1">
				<Hamburger size={26} toggled={open} toggle={setOpen} color="#ffffff" />

				{open && (
					<div className="absolute right-4 top-full mt-2 flex flex-col gap-4 p-3 rounded-b-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-black">
						<Link
							onClick={() => setOpen(false)}
							href="/"
							className={pathname === '/' ? 'font-bold mr-4 flex items-center gap-2 text-white' : 'mr-4 text-red-500 flex items-center gap-2'}
						>
							<Icon icon="material-symbols-light:home-outline" width="24" height="24" />
							Início
						</Link>

						<Link
							onClick={() => setOpen(false)}
							href="/About"
							className={pathname === '/About' ? 'font-bold mr-4 flex items-center gap-2 text-white' : 'mr-4 text-red-500 flex items-center gap-2'}
						>
							<Icon icon="material-symbols-light:person-outline" width="24" height="24" />
							Sobre
						</Link>

						<Link
							onClick={() => setOpen(false)}
							href="/Competicao"
							className={pathname === '/Competicao' ? 'font-bold mr-4 flex items-center gap-2 text-white' : 'mr-4 text-red-500 flex items-center gap-2'}
						>
							<Icon icon="material-symbols-light:trophy-outline" width="24" height="24" />
							Competição
						</Link>

						<Link
							onClick={() => setOpen(false)}
							href="/Patrocinadores"
							className={pathname === '/Patrocinadores' ? 'font-bold mr-4 flex items-center gap-2 text-white' : 'mr-4 text-red-500 flex items-center gap-2'}
						>
							<Icon icon="material-symbols-light:handshake-outline" width="24" height="24" />
							Patrocinadores
						</Link>

						<Link
							onClick={() => setOpen(false)}
							href="/ProcessoSeletivo"
							className={pathname === '/ProcessoSeletivo' ? 'font-bold mr-4 flex items-center gap-2 text-white' : 'mr-4 text-red-500 flex items-center gap-2'}
						>
							<Icon icon="material-symbols-light:person-add-outline" width="24" height="24" />
							Processo Seletivo
						</Link>

						<Link
							onClick={() => setOpen(false)}
							href="/Contact"
							className={pathname === '/Contact' ? 'font-bold mr-4 flex items-center gap-2 text-white' : 'mr-4 text-red-500 flex items-center gap-2'}
						>
							<Icon icon="material-symbols-light:mail-outline" width="24" height="24" />
							Contato
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
