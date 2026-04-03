export type Area = {
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  tools: string[];
  skills: string[];
  color: string; // tailwind gradient classes
};

export const areas: Area[] = [
  {
    slug: 'aerodinamica',
    icon: '✈️',
    name: 'Aerodinâmica',
    tagline: 'A ciência por trás do voo.',
    description:
      'A área de Aerodinâmica é responsável por estudar e compreender o comportamento do escoamento de ar ao redor da aeronave. É o coração técnico do projeto: sem um bom projeto aerodinâmico, a aeronave não voa com eficiência. A equipe analisa perfis aerodinâmicos, calcula coeficientes de sustentação e arrasto, define a geometria das asas e superfícies de controle, e valida os resultados por meio de simulações computacionais e ensaios.',
    responsibilities: [
      'Seleção e análise de perfis aerodinâmicos (airfoils)',
      'Cálculo de coeficientes de sustentação (CL) e arrasto (CD)',
      'Dimensionamento da asa principal e empenagens',
      'Simulações em software CFD (XFLR5, OpenFOAM)',
      'Análise polar e curvas de desempenho',
      'Interface com as equipes de Desempenho e Estabilidade',
    ],
    tools: ['XFLR5', 'OpenFOAM', 'MATLAB', 'Python (numpy/scipy)', 'SolidWorks Flow Simulation'],
    skills: ['Mecânica dos Fluidos', 'Cálculo Diferencial', 'CFD', 'Análise de dados', 'Programação Python'],
    color: 'from-[#a80303] to-[#980101]',
  },
  {
    slug: 'estabilidade',
    icon: '🎯',
    name: 'Estabilidade e Controle',
    tagline: 'Domínio total sobre a aeronave.',
    description:
      'A equipe de Estabilidade e Controle garante que a aeronave se comporte de forma segura e previsível em todas as condições de voo. Estudamos a dinâmica de voo, a resposta da aeronave a perturbações externas e aos comandos do piloto. O objetivo é que a aeronave mantenha sua trajetória, recupere-se de distúrbios e responda com precisão — sem isso, não há voo controlado.',
    responsibilities: [
      'Análise de estabilidade estática e dinâmica',
      'Dimensionamento de superfícies de controle (leme, profundor, aileron)',
      'Cálculo do ponto neutro e margem estática',
      'Avaliação de modos de voo (fugóide, espiral, Dutch roll)',
      'Simulações de resposta temporal',
      'Definição de limites do centro de gravidade (CG)',
    ],
    tools: ['XFLR5', 'MATLAB/Simulink', 'AVL (Athena Vortex Lattice)', 'Python'],
    skills: ['Dinâmica de Voo', 'Sistemas de Controle', 'Álgebra Linear', 'Equações Diferenciais'],
    color: 'from-[#9b130f] to-[#980101]',
  },
  {
    slug: 'desempenho',
    icon: '⚙️',
    name: 'Desempenho',
    tagline: 'Extraindo o máximo de cada voo.',
    description:
      'A área de Desempenho é responsável por otimizar a missão da aeronave. Analisamos as condições de voo, calculamos velocidades ótimas, alcance, autonomia e capacidade de carga útil. Em competições de Aerodesign, a pontuação é diretamente ligada ao desempenho — por isso essa equipe é fundamental para maximizar o score da Microraptor em cada disputa.',
    responsibilities: [
      'Análise de missão e definição de parâmetros de voo',
      'Cálculo de velocidade de cruzeiro, decolagem e pouso',
      'Otimização da razão carga útil / peso total',
      'Estimativa de consumo energético e autonomia',
      'Análise de sensibilidade e trade-offs de projeto',
      'Elaboração do relatório de desempenho para a competição',
    ],
    tools: ['MATLAB', 'Python', 'Excel', 'XFLR5'],
    skills: ['Aerodinâmica Aplicada', 'Otimização', 'Análise Numérica', 'Estatística'],
    color: 'from-[#a80303] to-[#7a0101]',
  },
  {
    slug: 'eletrica',
    icon: '🔌',
    name: 'Elétrica',
    tagline: 'Inteligência embarcada e potência no motor.',
    description:
      'A área Elétrica cuida de todo o sistema propulsivo e eletrônico embarcado na aeronave. Isso inclui a seleção de motor, bateria, controlador de velocidade (ESC) e hélice, além da instrumentação que coleta dados durante o voo. A equipe também desenvolve os sistemas de telemetria e controle remoto, sendo responsável por sensores como os que alimentam o dashboard do projeto Microraptor.',
    responsibilities: [
      'Seleção e teste de motor brushless, bateria LiPo e ESC',
      'Cálculo de empuxo, eficiência elétrica e autonomia',
      'Projeto e montagem do sistema de instrumentação (sensores)',
      'Desenvolvimento de firmware para coleta de dados (Arduino/ESP)',
      'Integração com sistemas de telemetria',
      'Elaboração do Relatório de Elétrica (premiado em 2025)',
    ],
    tools: ['Arduino', 'ESP32', 'KiCad', 'BLHeli', 'eCalc', 'Multímetro / Osciloscópio'],
    skills: ['Eletrônica', 'Programação Embarcada (C/C++)', 'Eletromagnetismo', 'Sistemas de Potência'],
    color: 'from-[#980101] to-[#6b0101]',
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
      'Acoplamento de modelos estruturais e aerodinâmicos',
      'Simulações de resposta dinâmica em voo',
      'Recomendações para o projeto estrutural',
    ],
    tools: ['NASTRAN', 'MATLAB', 'Python', 'XFLR5', 'Abaqus'],
    skills: ['Mecânica dos Sólidos', 'Mecânica dos Fluidos', 'Análise Modal', 'Método dos Elementos Finitos'],
    color: 'from-[#a80303] to-[#980101]',
  },
  {
    slug: 'cargas',
    icon: '📊',
    name: 'Cargas',
    tagline: 'Calculando os esforços que a aeronave enfrenta.',
    description:
      'A equipe de Cargas é responsável por calcular todas as forças e momentos que atuam na aeronave durante o voo, a decolagem e o pouso. Esses dados são fundamentais para o dimensionamento estrutural — sem saber quais cargas a aeronave vai suportar, é impossível projetar uma estrutura adequada. A equipe de Cargas é a ponte entre Aerodinâmica e Estruturas.',
    responsibilities: [
      'Cálculo do envelope de voo (diagrama V-n)',
      'Determinação de cargas de manobra e rajada',
      'Análise de cargas de trem de pouso (impacto)',
      'Cálculo de momentos fletores e torção nas asas',
      'Distribuição de cargas ao longo da envergadura',
      'Documentação e repasse para a equipe de Estruturas',
    ],
    tools: ['MATLAB', 'Python', 'Excel', 'XFLR5', 'AVL'],
    skills: ['Resistência dos Materiais', 'Mecânica Vetorial', 'Aerodinâmica', 'Análise Numérica'],
    color: 'from-[#9b130f] to-[#7a0101]',
  },
  {
    slug: 'estruturas',
    icon: '🏗️',
    name: 'Estruturas',
    tagline: 'Resistência, leveza e segurança.',
    description:
      'A área de Estruturas projeta a "espinha dorsal" da aeronave — a estrutura que suporta todas as cargas calculadas, mantém a geometria e sobrevive a todas as condições de voo. O desafio central é ser ao mesmo tempo resistente e leve: cada grama a mais penaliza o desempenho. A equipe trabalha com materiais compostos (fibra de carbono, Kevlar) e madeiras leves (balsa), além de realizar análises por elementos finitos.',
    responsibilities: [
      'Dimensionamento de longarina, nervuras e revestimento',
      'Escolha de materiais (balsa, fibra de vidro, fibra de carbono)',
      'Análise por Método dos Elementos Finitos (MEF)',
      'Fabricação e teste de corpos de prova',
      'Cálculo de coeficientes de segurança',
      'Interface com a equipe de Plantas para modelagem CAD',
    ],
    tools: ['SolidWorks Simulation', 'Abaqus', 'ANSYS', 'MATLAB'],
    skills: ['Resistência dos Materiais', 'Materiais Compostos', 'MEF', 'Fabricação Manual'],
    color: 'from-[#a80303] to-[#980101]',
  },
  {
    slug: 'plantas',
    icon: '📐',
    name: 'Plantas',
    tagline: 'Do conceito ao modelo tridimensional.',
    description:
      'A área de Plantas é responsável pela modelagem CAD completa da aeronave, integrando os resultados de todas as outras equipes em um modelo 3D coeso e fabricável. Utilizamos SolidWorks para criar cada componente com precisão, gerar os desenhos técnicos e planejar o processo de fabricação. É uma área interdisciplinar que exige comunicação constante com todas as outras equipes do projeto.',
    responsibilities: [
      'Modelagem 3D completa da aeronave no SolidWorks',
      'Geração de desenhos técnicos e plantas baixas',
      'Controle de versões do modelo CAD',
      'Planejamento e documentação do processo de fabricação',
      'Integração geométrica de todos os subsistemas',
      'Suporte à fabricação durante a construção da aeronave',
    ],
    tools: ['SolidWorks', 'AutoCAD', 'Fusion 360', 'Adobe Illustrator'],
    skills: ['CAD 3D', 'Desenho Técnico', 'Geometria Descritiva', 'Tolerâncias e Ajustes', 'GD&T'],
    color: 'from-[#980101] to-[#6b0101]',
  },
  {
    slug: 'gestao',
    icon: '📈',
    name: 'Gestão',
    tagline: 'Organizando para vencer.',
    description:
      'A área de Gestão é o elo que mantém todo o projeto funcionando. Cuida do planejamento estratégico, cronogramas, finanças, marketing, divulgação nas redes sociais e captação de patrocínios. Sem uma boa gestão, nem o melhor projeto técnico consegue chegar às competições. A equipe também é responsável por representar a Microraptor perante a universidade, parceiros e a comunidade.',
    responsibilities: [
      'Planejamento estratégico e cronograma anual do projeto',
      'Gestão financeira e prestação de contas',
      'Captação de patrocínios e parcerias',
      'Marketing digital e gestão das redes sociais',
      'Organização de eventos internos e processos seletivos',
      'Comunicação institucional com a UFJF',
    ],
    tools: ['Notion', 'Trello', 'Google Workspace', 'Canva', 'Instagram / LinkedIn'],
    skills: ['Gestão de Projetos', 'Comunicação', 'Finanças', 'Marketing Digital', 'Liderança'],
    color: 'from-[#9b130f] to-[#980101]',
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
