'use client';

import { useEffect, useState } from 'react';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ListarDados() {
	const [registros, setRegistros] = useState<any[]>([]);
	const [carregando, setCarregando] = useState(true);

	async function buscarDados() {
		try {
			const res = await fetch('/api/sensores');
			const json = await res.json();
			if (json.success) {
				setRegistros(json.registros);
			}
		} catch (e) {
			console.error('Erro ao buscar dados:', e);
		} finally {
			setCarregando(false);
		}
	}

	useEffect(() => {
		buscarDados();
		const intervalo = setInterval(buscarDados, 10000);
		return () => clearInterval(intervalo);
	}, []);

	const dadosCompletos = registros.map(r => ({
		time: new Date(r.reading_time).toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}),
		temp1: r.temp1,
		temp2: r.temp2,
		hum: r.hum,
		press: r.press,
		alt: r.alt,
		alt_dens: r.alt_dens,
	}));

	const cores = {
		temp1:    '#a80303',
		temp2:    '#e53e3e',
		hum:      '#c53030',
		press:    '#fc8181',
		alt:      '#9b130f',
		alt_dens: '#feb2b2',
	};

	const graficos = [
		{ key: 'temp1', label: 'Temperatura 1' },
		{ key: 'temp2', label: 'Temperatura 2' },
		{ key: 'hum', label: 'Umidade' },
		{ key: 'press', label: 'Pressão' },
		{ key: 'alt', label: 'Altitude' },
		{ key: 'alt_dens', label: 'Alt. Densidade' },
	];

	return (
		<main className="p-4">
			<h1 className="text-xl font-bold mb-6">Gráficos dos Sensores</h1>
			{carregando ? (
				<p>Carregando...</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{graficos.map(({ key, label }) => (
						<div key={key} className="h-full w-full">
							<ChartContainer
								config={{
									[key]: { label, color: cores[key as keyof typeof cores] },
								}}
								className="h-full w-full"
							>
								<AreaChart data={dadosCompletos}>
									<defs>
										<linearGradient id={`${key}-gradient`} x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor={cores[key as keyof typeof cores]} stopOpacity={0.8} />
											<stop offset="95%" stopColor={cores[key as keyof typeof cores]} stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#cccccc" />
									<XAxis dataKey="time" stroke="#ffffff" />
									<YAxis stroke="#ffffff" />
									<ChartTooltip content={<ChartTooltipContent />} />
									<ChartLegend content={<ChartLegendContent />} />
									<Area
										type="monotone"
										dataKey={key}
										stroke={cores[key as keyof typeof cores]}
										fill={`url(#${key}-gradient)`}
										strokeWidth={1}
										dot={false}
										name={label}
									/>
								</AreaChart>
							</ChartContainer>
						</div>
					))}
				</div>
			)}
		</main>
	);
}
