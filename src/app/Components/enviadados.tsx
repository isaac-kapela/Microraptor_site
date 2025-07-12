'use client';

export default function EnviarDados() {
	async function enviar() {
		const dados = {
			sensor: 'ESP32',
			location: 'Sala',
			temp1: '25',
			temp2: '26',
			hum: '60',
			press: '1012',
			alt: '850',
			alt_dens: '2100',
		};

		try {
			const response = await fetch('/api/sensores', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dados),
			});

			const texto = await response.text();
			console.log('Resposta bruta:', texto);

			if (!texto) {
				alert('Resposta da API vazia');
				return;
			}

			const json = JSON.parse(texto);

			if (!response.ok) {
				alert('Erro da API: ' + json.error);
				return;
			}

			alert('Dados enviados com sucesso!');
		} catch (err) {
			alert('Erro na requisição: ' + err);
		}
	}

	return <button onClick={enviar}>Enviar dados</button>;
}
