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
      { name: 'Daniel', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510360/microraptor/fotosMembrosAtuais/aerodinamica/plpshfnq57dswpltr6bj.jpg', leader: true },
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
      { name: 'Enzo Giradi', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510412/microraptor/fotosMembrosAtuais/estabilidade/rcgi921dsg5vxnthzn8p.jpg', leader: true },
      { name: 'Elias',       photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510411/microraptor/fotosMembrosAtuais/estabilidade/mlcahlx2tevmfmdsiuh9.jpg'                    },
      { name: 'Isis',        photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510415/microraptor/fotosMembrosAtuais/estabilidade/xns837hunhqkfli22l5t.jpg'                     },
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
      { name: 'Pedro Breder', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510407/microraptor/fotosMembrosAtuais/desempenho/k6za6rpixoujx22q9ibl.jpg', leader: true },
      { name: 'Luis',         photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510400/microraptor/fotosMembrosAtuais/desempenho/lqjib8kpaycmho1bmeyo.jpg' },
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
      { name: 'Arthur Padilha', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510408/microraptor/fotosMembrosAtuais/eletrica/lqxnmllgxhkpjzml1l5j.jpg', leader: true },
      { name: 'Mariana',        photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510410/microraptor/fotosMembrosAtuais/eletrica/eilxdrk61cnmj0vi83wy.jpg' },
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
      { name: 'Lorena',  photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510382/microraptor/fotosMembrosAtuais/cargas/n6ofcjmesagjhop01v4r.jpg', leader: true },
      { name: 'Breno',   photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510381/microraptor/fotosMembrosAtuais/cargas/pxs9jed0b8yjpjygjrdl.jpg'                },
      { name: 'Mauler',  photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510383/microraptor/fotosMembrosAtuais/cargas/wwcmyejky1uk0dcsguw5.jpg'               },
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
      { name: 'Maria Clara', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510416/microraptor/fotosMembrosAtuais/estruturas/kzpgy6lh19iquoyiawg2.jpg', leader: true },
      { name: 'Mima',        photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510417/microraptor/fotosMembrosAtuais/estruturas/sqjkxyxcgldibwvsrcmm.jpg'                    },
      { name: 'Vitão',       photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510419/microraptor/fotosMembrosAtuais/estruturas/tbs3bxhgu6dpvxqvsrsm.jpg'                   },
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
      { name: 'Enzo',     photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510427/microraptor/fotosMembrosAtuais/plantas/ycusjcyoqkjtudm6tbcf.jpg',   leader: true },
      { name: 'Leonardo', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510429/microraptor/fotosMembrosAtuais/plantas/vhz1kwkbzmjrc16or1sq.jpg'               },
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
    whatsapp: '553288706174',
    members: [
      { name: 'Vitão',       photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510419/microraptor/fotosMembrosAtuais/estruturas/tbs3bxhgu6dpvxqvsrsm.jpg',                        leader: true },
      { name: 'Enzo Giradi', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510420/microraptor/fotosMembrosAtuais/fusecoLamina%C3%A7%C3%A3o/tl3yxl88aqwsdczgt50g.jpg'               },
      { name: 'João Kleber', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510421/microraptor/fotosMembrosAtuais/fusecoLamina%C3%A7%C3%A3o/ccz8zgqrswfd8geyblxk.jpg'              },
      { name: 'Lorena',      photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510422/microraptor/fotosMembrosAtuais/fusecoLamina%C3%A7%C3%A3o/wekkigyvv08qaul77er8.jpg'                   },
      { name: 'Maria Clara', photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510423/microraptor/fotosMembrosAtuais/fusecoLamina%C3%A7%C3%A3o/mcbrmd2zraeb4ykch9ta.jpg'               },
      { name: 'Mima',        photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510424/microraptor/fotosMembrosAtuais/fusecoLamina%C3%A7%C3%A3o/wzmzewphfxhlpndzpbwl.jpg'                     },
      { name: 'Rodolfo',     photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510425/microraptor/fotosMembrosAtuais/fusecoLamina%C3%A7%C3%A3o/t6inka9mnr723ipfl7ls.jpg'                  },
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
      { name: 'Mauler',        photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510398/microraptor/fotosMembrosAtuais/cauda/ol8jargaxfy9shez4e4x.jpg',        leader: true },
      { name: 'Arthur Padilha',photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510389/microraptor/fotosMembrosAtuais/cauda/r6oqhzg8u8msbhnykpmq.jpg'              },
      { name: 'Bernadu',       photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510389/microraptor/fotosMembrosAtuais/cauda/f40wp6whumca9dxhcqq5.jpg'                     },
      { name: 'Elias',         photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510388/microraptor/fotosMembrosAtuais/cauda/udf0yxnqkmuoxdlpr5ar.jpg'                       },
      { name: 'Luis',          photo: 'https://res.cloudinary.com/eufumarc/image/upload/v1784510396/microraptor/fotosMembrosAtuais/cauda/ptb4zwe875k9iuuhiijt.jpg'                        },
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
