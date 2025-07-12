// src/app/api/sensores/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const novo = await prisma.sensorData.create({
			data: {
				sensor: data.sensor,
				location: data.location,
				temp1: data.temp1,
				temp2: data.temp2,
				hum: data.hum,
				press: data.press,
				alt: data.alt,
				alt_dens: data.alt_dens,
			},
		});

		return NextResponse.json({ success: true, novo }, { status: 201 });
	} catch (error: any) {
		console.error('Erro na API:', error.message ?? error);
		return NextResponse.json({ success: false, error: error.message ?? 'Erro desconhecido' }, { status: 500 });
	}
}

export async function GET() {
	try {
		const registros = await prisma.sensorData.findMany({
			orderBy: { reading_time: 'desc' },
			take: 20,
		});
		return NextResponse.json({ success: true, registros });
	} catch (error: any) {
		console.error('Erro ao buscar dados:', error.message ?? error);
		return NextResponse.json({ success: false, error: error.message ?? 'Erro desconhecido' }, { status: 500 });
	}
}
