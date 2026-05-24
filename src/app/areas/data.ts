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
      'A área de Aerodinâmica é responsável por estudar e compreender o comportamento do escoamento de ar ao redor da aeronave. É o coração técnico do projeto: sem um bom projeto aerodinâmico, a aeronave não voa com eficiência. A área analisa perfis aerodinâmicos, calcula coeficientes de sustentação e arrasto, define a geometria das asas e superfícies de controle, e valida os resultados por meio de simulações computacionais e ensaios.',
    responsibilities: [
      'Seleção e análise de perfis aerodinâmicos (airfoils)',
      'Cálculo de coeficientes de sustentação (CL) e arrasto (CD)',
      'Dimensionamento da asa principal e empenagens',
      'Simulações em software CFD (XFLR5, OpenFOAM)',
      'Análise polar e curvas de desempenho',
      'Interface com as áreas de Desempenho e Estabilidade',
    ],
    tools: ['XFLR5', 'MATLAB', 'Python (numpy/scipy)', 'SolidWorks Flow Simulation'],
    skills: ['Mecânica dos Fluidos', 'Cálculo Diferencial', 'CFD', 'Análise de dados', 'Programação Python'],
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
      'A área de Estabilidade e Controle garante que a aeronave se comporte de forma segura e previsível em todas as condições de voo. Estudamos a dinâmica de voo, a resposta da aeronave a perturbações externas e aos comandos do piloto. O objetivo é que a aeronave mantenha sua trajetória, recupere-se de distúrbios e responda com precisão — sem isso, não há voo controlado.',
    responsibilities: [
      'Análise de estabilidade estática e dinâmica',
      'Dimensionamento de superfícies de controle (leme, profundor, aileron)',
      'Cálculo do ponto neutro e margem estática',
      'Avaliação de modos de voo',
      'Simulações de resposta temporal',
      'Definição de limites do centro de gravidade (CG)',
    ],
    tools: ['XFLR5', 'MATLAB', 'AVL (Athena Vortex Lattice)', 'Python'],
    skills: ['Dinâmica de Voo', 'Sistemas de Controle', 'Álgebra Linear', 'Equações Diferenciais'],
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
      'A área de Desempenho é responsável por otimizar a missão da aeronave. Analisamos as condições de voo, calculamos velocidades ótimas, alcance, autonomia e capacidade de carga útil. Em competições de Aerodesign, a pontuação é diretamente ligada ao desempenho — por isso essa área é fundamental para maximizar o score da Microraptor em cada disputa.',
    responsibilities: [
      'Análise de missão e definição de parâmetros de voo',
      'Cálculo de velocidade de cruzeiro, decolagem e pouso',
      'Otimização da razão carga útil / peso total',
      'Estimativa de consumo energético e autonomia',
      'Análise de sensibilidade e trade-offs de projeto',
      'Elaboração do relatório de desempenho para a competição',
    ],
    tools: ['MATLAB', 'Python', 'Excel', 'C++', 'C'],
    skills: ['Aerodinâmica Aplicada', 'Otimização', 'Análise Numérica', 'Estatística'],
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
      'A área Elétrica cuida de todo o sistema propulsivo e eletrônico embarcado na aeronave. Isso inclui a seleção de motor, bateria, controlador de velocidade (ESC) e hélice, além da instrumentação que coleta dados durante o voo. A área também desenvolve os sistemas de telemetria.',
    responsibilities: [
      'Seleção do GMP (Grupo Motor Propulsor)',
      'Cálculo de empuxo, eficiência elétrica e autonomia',
      'Projeto e montagem do sistema de instrumentação (sensores)',
      'Desenvolvimento de firmware para coleta de dados (Arduino/ESP)',
      'Integração com sistemas de telemetria',
      'Elaboração do Relatório de Elétrica (premiado em 2025)',
    ],
    tools: ['Arduino', 'Python', 'C++', 'MATLAB'],
    skills: ['Eletrônica', 'Programação Embarcada (C/C++)', 'Eletromagnetismo', 'Sistemas de Potência'],
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
      'Aeroelasticidade é a disciplina que estuda a interação entre as forças aerodinâmicas e a deformação estrutural da aeronave. Fenômenos como flutter (oscilações instáveis que podem destruir a asa), divergência e reversão de controle são analisados aqui. É uma área altamente especializada que une conhecimentos de aerodinâmica, estruturas e dinâmica, sendo essencial para garantir a integridade da aeronave em voo.',
    responsibilities: [
      'Análise de flutter e determinação da velocidade crítica',
      'Estudo de divergência aeroelástica',
      'Avaliação de reversão de controle',
      'Simulações de resposta dinâmica em voo',
      'Recomendações para o projeto estrutural',
    ],
    tools: ['MATLAB', 'Python', 'XFLR5'],
    skills: ['Mecânica dos Sólidos', 'Mecânica dos Fluidos', 'Análise Modal', 'Método dos Elementos Finitos'],
    color: 'from-[#a80303] to-[#980101]',
    whatsapp: '553284268591',
  },
  {
    slug: 'cargas',
    icon: '📊',
    name: 'Cargas',
    tagline: 'Calculando os esforços que a aeronave enfrenta.',
    description:
      'A área de Cargas é responsável por calcular todas as forças e momentos que atuam na aeronave durante o voo, a decolagem e o pouso. Esses dados são fundamentais para o dimensionamento estrutural — sem saber quais cargas a aeronave vai suportar, é impossível projetar uma estrutura adequada. A área de Cargas é a ponte entre Aerodinâmica e Estruturas.',
    responsibilities: [
      'Cálculo do envelope de voo (diagrama V-n)',
      'Determinação de cargas de manobra e rajada',
      'Análise de cargas de trem de pouso (impacto)',
      'Cálculo de momentos fletores e torção nas asas',
      'Distribuição de cargas ao longo da envergadura',
      'Documentação e repasse para a área de Estruturas',
    ],
    tools: ['MATLAB', 'Python', 'Excel', 'XFLR5', 'AVL'],
    skills: ['Resistência dos Materiais', 'Mecânica Vetorial', 'Aerodinâmica', 'Análise Numérica'],
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
      'A área de Estruturas projeta a "espinha dorsal" da aeronave — a estrutura que suporta todas as cargas calculadas, mantém a geometria e sobrevive a todas as condições de voo. O desafio central é ser ao mesmo tempo resistente e leve: cada grama a mais penaliza o desempenho. A área trabalha com materiais compostos (fibra de carbono) e madeiras leves (balsa), além de realizar análises por elementos finitos.',
    responsibilities: [
      'Dimensionamento de longarina, nervuras e revestimento',
      'Escolha de materiais (balsa, fibra de vidro, fibra de carbono)',
      'Análise por Método dos Elementos Finitos (MEF)',
      'Fabricação e teste de corpos de prova',
      'Cálculo de coeficientes de segurança',
      'Interface com a área de Plantas para modelagem CAD',
    ],
    tools: ['SolidWorks', 'MATLAB'],
    skills: ['Resistência dos Materiais', 'Materiais Compostos', 'MEF', 'Fabricação Manual'],
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
      'A área de Plantas é responsável pela modelagem CAD completa da aeronave, integrando os resultados de todas as outras áreas em um modelo 3D coeso e fabricável. Utilizamos SolidWorks para criar cada componente com precisão, gerar os desenhos técnicos e planejar o processo de fabricação. É uma área interdisciplinar que exige comunicação constante com todas as outras áreas do projeto.',
    responsibilities: [
      'Modelagem 3D completa da aeronave no SolidWorks',
      'Geração de desenhos técnicos e plantas baixas',
      'Controle de versões do modelo CAD',
      'Planejamento e documentação do processo de fabricação',
      'Integração geométrica de todos os subsistemas',
      'Suporte à fabricação durante a construção da aeronave',
    ],
    tools: ['SolidWorks', 'AutoCAD', 'Adobe Illustrator'],
    skills: ['CAD 3D', 'Desenho Técnico', 'Geometria Descritiva', 'Tolerâncias e Ajustes'],
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
      'A área de Gestão é o elo que mantém todo o projeto funcionando. Cuida do planejamento estratégico, cronogramas, finanças, marketing, divulgação nas redes sociais e captação de patrocínios. Sem uma boa gestão, nem o melhor projeto técnico consegue chegar às competições. A área também é responsável por representar a Microraptor perante a universidade, parceiros e a comunidade.',
    responsibilities: [
      'Planejamento estratégico e cronograma anual do projeto',
      'Gestão financeira e prestação de contas',
      'Captação de patrocínios e parcerias',
      'Marketing digital e gestão das redes sociais',
      'Organização de eventos internos e processos seletivos',
      'Comunicação institucional com a UFJF',
    ],
    tools: ['Notion / ClickUp / Trello', 'Google Workspace', 'Excel / Power BI', 'Canva / Photoshop', 'Produções Audiovisuais', 'Instagram / LinkedIn', 'Automações', 'C++', 'Python', 'C', 'JavaScript / React / Next.js'],
    skills: ['Gestão de Projetos', 'Comunicação', 'Finanças', 'Marketing Digital', 'Liderança'],
    color: 'from-[#9b130f] to-[#980101]',
    whatsapp: '553284823076',
  },
  {
    slug: 'fuselagem-e-laminacao',
    icon: '🛠️',
    name: 'Fuselagem e Laminação',
    tagline: 'Onde a aeronave ganha forma.',
    description:
      'A área de Fuselagem e Laminação é responsável pela fabricação do corpo principal da aeronave e das peças em materiais compostos. A área trabalha com fibra de carbono e fibra de vidro usando técnicas como laminação a vácuo e infusão de resina, garantindo estruturas leves, resistentes e geometricamente precisas.',
    responsibilities: [
      'Fabricação e montagem do corpo da fuselagem',
      'Laminação de peças em fibra de carbono e fibra de vidro',
      'Preparação e aplicação de resina epóxi',
      'Fabricação e manutenção de moldes',
      'Controle de peso, espessura e acabamento superficial',
    ],
    tools: ['Bomba de Vácuo', 'Moldes', 'Resina Epóxi', 'Tecidos de Fibra', 'Paquímetro'],
    skills: ['Materiais Compostos', 'Fabricação Manual', 'Montagem Mecânica', 'Controle de Qualidade'],
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
      'A área de Cauda é responsável pela fabricação das empenagens horizontal e vertical da aeronave. A área garante que os perfis projetados pela Aerodinâmica sejam reproduzidos com fidelidade, com geometria correta, baixo peso e instalação precisa das superfícies de controle (profundor e leme).',
    responsibilities: [
      'Fabricação da empenagem horizontal e vertical',
      'Revestimento com balsa, film ou compósitos',
      'Instalação do profundor e do leme',
      'Verificação geométrica e pesagem das superfícies',
    ],
    tools: ['Paquímetro', 'Moldes'],
    skills: ['Fabricação de Superfícies Aerodinâmicas', 'Montagem de Estruturas Leves', 'Materiais Compostos', 'Controle Dimensional'],
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
      'A área de Asa é responsável pela fabricação da asa principal da aeronave. É a superfície mais crítica do projeto: qualquer desvio geométrico impacta diretamente o desempenho aerodinâmico. A área reproduz com precisão o perfil definido pela Aerodinâmica, instalando ailerons e garantindo o menor peso possível.',
    responsibilities: [
      'Fabricação da asa principal',
      'Revestimento com balsa',
      'Instalação dos ailerons',
      'Verificação geométrica e pesagem da asa',
    ],
    tools: ['Paquímetro', 'Moldes de Asa'],
    skills: ['Fabricação de Superfícies Aerodinâmicas', 'Montagem de Estruturas Leves', 'Materiais Compostos', 'Controle Dimensional'],
    color: 'from-[#7a0101] to-[#5a0101]',
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
