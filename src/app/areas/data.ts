export type Member = {
  name: string;
  photo: string;
  leader?: boolean;
};

export type Area = {
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  tools: string[];
  skills: string[];
  color: string;
  whatsapp?: string;
  members?: Member[];
};

export const areas: Area[] = [
  {
    slug: 'aerodinamica',
    icon: '✈️',
    name: 'Aerodinâmica',
    tagline: 'A ciência por trás do voo.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod', 'Tempor incididunt'],
    color: 'from-[#a80303] to-[#980101]',
    whatsapp: '5524988467983',
    members: [
      { name: 'Daniel', photo: '/fotosMembrosAtuais/aerodinamica/daniel.jpeg', leader: true },
    ],
  },
  {
    slug: 'estabilidade',
    icon: '🎯',
    name: 'Estabilidade e Controle',
    tagline: 'Domínio total sobre a aeronave.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#9b130f] to-[#980101]',
    whatsapp: '553288374710',
    members: [
      { name: 'Enzo Giradi', photo: '/fotosMembrosAtuais/estabilidade/enzoGiradi.jpeg', leader: true },
      { name: 'Elias',       photo: '/fotosMembrosAtuais/estabilidade/Elias.jpeg'                    },
      { name: 'Isis',        photo: '/fotosMembrosAtuais/estabilidade/isis.jpeg'                     },
    ],
  },
  {
    slug: 'desempenho',
    icon: '⚙️',
    name: 'Desempenho',
    tagline: 'Extraindo o máximo de cada voo.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#a80303] to-[#7a0101]',
    whatsapp: '5521969741778',
    members: [
      { name: 'Pedro Breder', photo: '/fotosMembrosAtuais/desempenho/pedro_breder.jpg', leader: true },
      { name: 'Luis',         photo: '/fotosMembrosAtuais/desempenho/luis.jpeg' },
    ],
  },
  {
    slug: 'eletrica',
    icon: '🔌',
    name: 'Elétrica',
    tagline: 'Inteligência embarcada e potência no motor.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#980101] to-[#6b0101]',
    whatsapp: '553291858659',
    members: [
      { name: 'Arthur Padilha', photo: '/fotosMembrosAtuais/eletrica/arthur_padilha.jpeg', leader: true },
      { name: 'Mariana',        photo: '/fotosMembrosAtuais/eletrica/mariana.jpeg' },
    ],
  },
  {
    slug: 'aeroelasticidade',
    icon: '🌪️',
    name: 'Aeroelasticidade',
    tagline: 'Onde a estrutura encontra o ar.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#a80303] to-[#980101]',
    whatsapp: '553284268591',
  },
  {
    slug: 'cargas',
    icon: '📊',
    name: 'Cargas',
    tagline: 'Calculando os esforços que a aeronave enfrenta.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do', 'Eiusmod'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#9b130f] to-[#7a0101]',
    whatsapp: '553299677341',
    members: [
      { name: 'Lorena',  photo: '/fotosMembrosAtuais/cargas/lorena.jpeg', leader: true },
      { name: 'Breno',   photo: '/fotosMembrosAtuais/cargas/breno.jpeg'                },
      { name: 'Mauler',  photo: '/fotosMembrosAtuais/cargas/mauler.jpeg'               },
    ],
  },
  {
    slug: 'estruturas',
    icon: '🏗️',
    name: 'Estruturas',
    tagline: 'Resistência, leveza e segurança.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#a80303] to-[#980101]',
    whatsapp: '553299997408',
    members: [
      { name: 'Maria Clara', photo: '/fotosMembrosAtuais/estruturas/mariaClara.jpeg', leader: true },
      { name: 'Mima',        photo: '/fotosMembrosAtuais/estruturas/mima.jpeg'                    },
      { name: 'Vitão',       photo: '/fotosMembrosAtuais/estruturas/vitao.jpeg'                   },
    ],
  },
  {
    slug: 'plantas',
    icon: '📐',
    name: 'Plantas',
    tagline: 'Do conceito ao modelo tridimensional.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#980101] to-[#6b0101]',
    members: [
      { name: 'Enzo',     photo: '/fotosMembrosAtuais/plantas/enzoFre.jpeg',   leader: true },
      { name: 'Leonardo', photo: '/fotosMembrosAtuais/plantas/leonardo.jpeg'               },
    ],
  },
  {
    slug: 'gestao',
    icon: '📈',
    name: 'Gestão',
    tagline: 'Organizando para vencer.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
      'Aute irure dolor in reprehenderit voluptate velit',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod', 'Tempor incididunt', 'Ut labore', 'Et dolore', 'Magna aliqua', 'Ut enim', 'Ad minim'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod', 'Tempor incididunt'],
    color: 'from-[#9b130f] to-[#980101]',
    whatsapp: '553284823076',
  },
  {
    slug: 'fuselagem-e-laminacao',
    icon: '🛠️',
    name: 'Fuselagem e Laminação',
    tagline: 'Onde a aeronave ganha forma.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
      'Nisi ut aliquip ex ea commodo consequat duis',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod', 'Tempor incididunt'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#7a0101] to-[#5a0101]',
    members: [
      { name: 'Vitão',       photo: '/fotosMembrosAtuais/estruturas/vitao.jpeg',                        leader: true },
      { name: 'Enzo Giradi', photo: '/fotosMembrosAtuais/fusecoLaminação/enzoGiradi.jpeg'               },
      { name: 'João Kleber', photo: '/fotosMembrosAtuais/fusecoLaminação/joao_kleber.jpeg'              },
      { name: 'Lorena',      photo: '/fotosMembrosAtuais/fusecoLaminação/lorena.jpeg'                   },
      { name: 'Maria Clara', photo: '/fotosMembrosAtuais/fusecoLaminação/mariaClara.jpeg'               },
      { name: 'Mima',        photo: '/fotosMembrosAtuais/fusecoLaminação/mima.jpeg'                     },
      { name: 'Rodolfo',     photo: '/fotosMembrosAtuais/fusecoLaminação/rodolfo.jpeg'                  },
    ],
  },
  {
    slug: 'cauda',
    icon: '🔩',
    name: 'Cauda',
    tagline: 'Estabilidade e controle na traseira.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#7a0101] to-[#5a0101]',
    whatsapp: '5524998474461',
    members: [
      { name: 'Mauler',        photo: '/fotosMembrosAtuais/cauda/mauler.jpeg',        leader: true },
      { name: 'Arthur Padilha',photo: '/fotosMembrosAtuais/cauda/arthur_padilha.jpeg'              },
      { name: 'Bernadu',       photo: '/fotosMembrosAtuais/cauda/bernadu.jpeg'                     },
      { name: 'Elias',         photo: '/fotosMembrosAtuais/cauda/Elias.jpeg'                       },
      { name: 'Luis',          photo: '/fotosMembrosAtuais/cauda/luis.jpeg'                        },
    ],
  },
  {
    slug: 'asa',
    icon: '🪁',
    name: 'Asa',
    tagline: 'A sustentação começa aqui.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    responsibilities: [
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      'Sed do eiusmod tempor incididunt ut labore',
      'Dolore magna aliqua ut enim ad minim',
      'Veniam quis nostrud exercitation ullamco laboris',
    ],
    tools: ['Lorem ipsum', 'Dolor sit amet'],
    skills: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    color: 'from-[#7a0101] to-[#5a0101]',
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
