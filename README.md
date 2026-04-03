# Site_Microraptor 🦖

Dashboard de monitoramento IoT em tempo real para o projeto Microraptor. Exibe dados de sensores ambientais (temperatura, umidade, pressão, altitude) através de gráficos interativos.

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- **Node.js** v18 ou superior → https://nodejs.org
- **npm** v9 ou superior (já vem com o Node.js)
- **Banco de dados PostgreSQL** (local ou na nuvem)

> 💡 Recomendamos usar o [Neon](https://neon.tech) — PostgreSQL serverless gratuito, sem precisar instalar nada localmente.

---

## Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Site_Microraptor
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` e preencha com a URL do seu banco de dados:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST/BANCO?sslmode=require"
```

**Como obter a URL (Neon):**
1. Acesse [neon.tech](https://neon.tech) e crie uma conta gratuita
2. Crie um novo projeto
3. Vá em **Dashboard → Connection string** e copie a URL

### 4. Sincronize o banco de dados

```bash
npx prisma db push
```

Este comando cria as tabelas no banco conforme definido em `prisma/schema.prisma`.

---

## Rodando o projeto

### Desenvolvimento

```bash
npm run dev
```

Acesse em: http://localhost:3000

### Produção

```bash
npm run build
npm run start
```

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o linter (ESLint) |
| `npx prisma db push` | Sincroniza o schema com o banco |
| `npx prisma studio` | Abre interface visual do banco de dados |

---

## Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx          # Página inicial (carrossel)
│   ├── layout.tsx        # Layout raiz com navegação
│   ├── Sensor/
│   │   └── page.tsx      # Dashboard de sensores
│   ├── api/
│   │   └── sensores/
│   │       └── route.ts  # API REST dos sensores (GET/POST)
│   └── Components/       # Componentes da aplicação
├── components/
│   └── ui/               # Componentes de UI reutilizáveis
└── lib/
    ├── prisma.ts          # Cliente Prisma (singleton)
    └── utils.ts           # Funções utilitárias
prisma/
└── schema.prisma          # Schema do banco de dados
```

---

## API

### `GET /api/sensores`
Retorna os últimos 20 registros de sensores.

### `POST /api/sensores`
Cria um novo registro de sensor.

**Body (JSON):**
```json
{
  "sensor": "sensor-01",
  "location": "sala-1",
  "temp1": "25.3",
  "temp2": "24.8",
  "hum": "60.2",
  "press": "1013.25",
  "alt": "850.0",
  "alt_dens": "900.0"
}
```

---

## Tecnologias utilizadas

- **[Next.js 15](https://nextjs.org)** — Framework React
- **[TypeScript](https://www.typescriptlang.org)** — Tipagem estática
- **[Prisma](https://www.prisma.io)** — ORM para PostgreSQL
- **[Tailwind CSS](https://tailwindcss.com)** — Estilização
- **[HeroUI](https://www.heroui.com)** — Componentes de UI
- **[Recharts](https://recharts.org)** — Gráficos interativos
- **[Embla Carousel](https://www.embla-carousel.com)** — Carrossel
- **[Framer Motion](https://www.framer.com/motion)** — Animações