"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DesktopNav = () => {
  const pathname = usePathname();

  return (
		<nav className="fixed flex items-center justify-center font-[family-name:var(--spaceMono)] shadow-bottom bg-black w-full py-8">
			<div className="absolute left-0 pl-4">
				<Link href="/">
					<Image src="/microraptor.png" alt="Logo" width={64} height={64} />
				</Link>
			</div>

			<div className="flex gap-4 ">
				<Link href="/" className={pathname == '/' ? 'font-bold mr-4 text-white' : 'mr-4 text-red-500'}>
					Home
				</Link>

				<Link href="/About" className={pathname == '/About' ? 'font-bold mr-4 text-white' : 'mr-4 text-red-500'}>
					About
				</Link>

				<Link href="/Contact" className={pathname == '/Contact' ? 'font-bold mr-4 text-white' : 'mr-4 text-red-500'}>
					Contact
				</Link>

				<Link href="/Sensor" className={pathname == '/Sensor' ? 'font-bold mr-4 text-white' : 'mr-4 text-red-500'}>
					Sensor
				</Link>
			</div>
		</nav>
	);
};
