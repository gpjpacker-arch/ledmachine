import imgCurvedLiving from '../assets/images/led_curved_living_1788059274464.jpg';
import imgLoungeSports from '../assets/images/led_lounge_sports_1788059299151.jpg';
import imgPoolMorning from '../assets/images/led_pool_morning_1788059317234.jpg';
import imgPoolSmartTv from '../assets/images/led_pool_smarttv_1788059337511.jpg';
import imgShowroomBirds from '../assets/images/led_showroom_birds_1788059359592.jpg';
import imgHallAutumn from '../assets/images/led_hall_autumn_1788059379228.jpg';
import imgPoolMatch from '../assets/images/led_pool_match_1788059400102.jpg';
import imgDiningRoom from '../assets/images/led_dining_room_1788059416951.jpg';

export interface SiteContent {
  general: {
    siteName: string;
    logoUrl?: string;
    logoHeight?: number;
    tagline: string;
    whatsappNumber: string;
    whatsappMessage: string;
    instagramUrl: string;
    youtubeUrl: string;
    facebookUrl: string;
    linkedinUrl: string;
    emailContact: string;
    phoneContact: string;
    address: string;
  };
  navbar: {
    buttonCtaText: string;
    navLinks: { id: string; label: string }[];
  };
  hero: {
    badgeText: string;
    clientCountText: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    guaranteeNotice: string;
  };
  carousel: {
    title: string;
    subtitle: string;
    projects: {
      id: number;
      tag: string;
      category: 'Residencial' | 'Comercial' | 'Corporativo' | 'Varejo';
      title: string;
      subtitle: string;
      description: string;
      pitch: string;
      brightness: string;
      resolution: string;
      imageUrl: string;
    }[];
  };
  whyUs: {
    badge: string;
    title: string;
    subtitle: string;
    cards: {
      id: number;
      title: string;
      highlight: string;
      description: string;
    }[];
  };
  widescreenBanner: {
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    imageUrl: string;
  };
  solutions: {
    badge: string;
    title: string;
    subtitle: string;
    commercial: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      imageUrl: string;
      ctaText: string;
    };
    residential: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      imageUrl: string;
      ctaText: string;
    };
  };
  warranty: {
    title: string;
    badge: string;
    description: string;
    features: string[];
    ctaText: string;
  };
  featuredGallery: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    productTitle: string;
    productCategory: string;
    productDescription: string;
    specs: { label: string; value: string; desc: string }[];
    images: { id: number; title: string; subtitle: string; url: string }[];
  };
  moreThanPanel: {
    badge: string;
    title: string;
    titleHighlight: string;
    p1: string;
    companyTitle: string;
    companyDesc: string;
    homeTitle: string;
    homeDesc: string;
    p2: string;
    bannerText: string;
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      stepNumber: string;
      title: string;
      description: string;
      highlight: string;
    }[];
  };
  authority: {
    quote: string;
    text1: string;
    text2: string;
    author: string;
    role: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      id: string;
      question: string;
      answer: string;
    }[];
  };
  social: {
    badge: string;
    title: string;
    subtitle: string;
    instagramFollowText: string;
    youtubeSubText: string;
    cards: {
      id: number;
      tag: string;
      title: string;
      likes: string;
      imageUrl: string;
      caption: string;
    }[];
  };
  finalCta: {
    badge: string;
    title: string;
    subtitle: string;
    btnPrimary: string;
    btnSecondary: string;
    guaranteeSeal: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
  };
}

export const defaultSiteContent: SiteContent = {
  general: {
    siteName: 'LED MACHINE',
    tagline: 'Painéis de LED High-End sob Medida',
    whatsappNumber: '5511999999999',
    whatsappMessage: 'Olá! Gostaria de um orçamento para painel de LED.',
    instagramUrl: 'https://instagram.com/ledmachine',
    youtubeUrl: 'https://youtube.com',
    facebookUrl: 'https://facebook.com',
    linkedinUrl: 'https://linkedin.com',
    emailContact: 'contato@ledmachine.com.br',
    phoneContact: '(11) 99999-9999',
    address: 'São Paulo - SP | Atendimento em todo o Brasil',
  },
  navbar: {
    buttonCtaText: 'Fale com Especialista',
    navLinks: [
      { id: 'home', label: 'Início' },
      { id: 'diferenciais', label: 'Diferenciais' },
      { id: 'solucoes', label: 'Soluções' },
      { id: 'garantia', label: 'Garantia' },
      { id: 'experiencia', label: 'Como Funciona' },
      { id: 'faq', label: 'Dúvidas' },
    ],
  },
  hero: {
    badgeText: 'Projetos Exclusivos em Todo o Brasil',
    clientCountText: '+500 Projetos Entregues',
    titleLine1: 'Painéis de LED de Alta Resolução',
    titleLine2: 'Sob Medida para o Seu Espaço',
    titleHighlight: 'Sob Medida para o Seu Espaço',
    subtitle: 'Tecnologia de ponta, acabamento impecável e suporte especializado para residências e empresas.',
    ctaPrimaryText: 'Solicitar Projeto Personalizado',
    ctaSecondaryText: 'Falar com Especialista',
    guaranteeNotice: '2 anos de garantia com suporte técnico especializado.',
  },
  carousel: {
    title: 'Galeria de Projetos Realizados',
    subtitle: 'Arraste para o lado ou clique para ver cada instalação em detalhes de alta definição.',
    projects: [
      {
        id: 1,
        tag: '#Living & Gourmet Curvo',
        category: 'Residencial',
        title: 'PAINEL CURVO PANORÂMICO',
        subtitle: 'Living integrado & espaço gourmet com ângulo de visão envolvente',
        description: 'Painel de LED curvo de altíssima definição integrado à marcenaria e bar gourmet, entregando imersão total e cores deslumbrantes em qualquer ângulo.',
        pitch: 'P1.5 Fine-Pitch Curvo',
        brightness: '1.200 nits Auto-dim',
        resolution: 'Curvatura Sob Medida',
        imageUrl: imgCurvedLiving,
      },
      {
        id: 2,
        tag: '#Lounge & Arena Sports',
        category: 'Residencial',
        title: 'LOUNGE CINEMA & ESPORTES',
        subtitle: 'Espaço gamer & cinema privativo com iluminação imersiva',
        description: 'Integração de áudio Hi-Fi e display Fine-Pitch de altíssimo contraste para assistir a jogos, filmes e simuladores com realismo absoluto.',
        pitch: 'P1.8 High Refresh Rate',
        brightness: '1.000 nits HDR10+',
        resolution: '4K Ultra HD',
        imageUrl: imgLoungeSports,
      },
      {
        id: 3,
        tag: '#Área Externa & Piscina',
        category: 'Residencial',
        title: 'OUTDOOR WEATHERPROOF POOL',
        subtitle: 'Painel ultra brilhante com proteção IP65 à prova de sol e chuva',
        description: 'Visibilidade cristalina mesmo sob luz solar direta ao meio-dia, com tratamento anti-reflexo e vedação militar para áreas de piscina.',
        pitch: 'P2.9 Outdoor Gold-Wire',
        brightness: '5.500 nits High Bright',
        resolution: 'Visível sob Sol Pleno',
        imageUrl: imgPoolMorning,
      },
      {
        id: 4,
        tag: '#Pool Sunset Cinema',
        category: 'Residencial',
        title: 'ENTERTAINMENT POOL WALL',
        subtitle: 'Cinema ao ar livre para momentos inesquecíveis com a família',
        description: 'Transmissões esportivas e streaming com máxima fidelidade em área de convivência externa premium, sem reflexos.',
        pitch: 'P3.9 Weatherproof',
        brightness: '6.000 nits Sunproof',
        resolution: 'Resistente a Chuva IP65',
        imageUrl: imgPoolSmartTv,
      },
      {
        id: 5,
        tag: '#Showroom & Corporativo',
        category: 'Comercial',
        title: 'SHOWROOM & FLAGSHIP STORE',
        subtitle: 'Impacto visual imersivo para valorizar marcas e produtos de luxo',
        description: 'Painel sem emendas perfeito para lojas conceito, recepções corporativas e stands que exigem elegância máxima.',
        pitch: 'P1.2 MicroLED Pitch',
        brightness: '1.500 nits Rec.709',
        resolution: 'Sem Emendas Visíveis',
        imageUrl: imgShowroomBirds,
      },
      {
        id: 6,
        tag: '#Hall Nobre & Recepção',
        category: 'Corporativo',
        title: 'PAINEL ARQUITETÔNICO VERTICAL',
        subtitle: 'Arte digital em grande formato para halls e entradas imponentes',
        description: 'Instalação vertical sofisticada com transições dinâmicas de cores para edifícios corporativos e condomínios de alto padrão.',
        pitch: 'P1.9 Architectural Line',
        brightness: '1.200 nits True-Tone',
        resolution: 'Fidelidade de Cores',
        imageUrl: imgHallAutumn,
      },
      {
        id: 7,
        tag: '#Arena Pool Party',
        category: 'Residencial',
        title: 'ESTRUTURA GOURMET EXTERNA',
        subtitle: 'O melhor do entretenimento para festas e recepções ao ar livre',
        description: 'Design robusto e moderno para resistir a qualquer intempérie com funcionamento silencioso e zero aquecimento.',
        pitch: 'P3.9 Outdoor Pro',
        brightness: '5.500 nits',
        resolution: 'IP65 Full Sealed',
        imageUrl: imgPoolMatch,
      },
      {
        id: 8,
        tag: '#Home Gourmet & Dining',
        category: 'Residencial',
        title: 'SALA DE JANTAR INTEGRADA',
        subtitle: 'Painel decorativo em marcenaria nobre de alta resolução',
        description: 'Transforma qualquer parede em uma tela de cinema ou galeria de arte digital interativa com controle por aplicativo ou automação.',
        pitch: 'P1.5 Micro-Pitch',
        brightness: '1.100 nits Flicker-Free',
        resolution: 'Harmonia com Marcenaria',
        imageUrl: imgDiningRoom,
      },
    ],
  },
  whyUs: {
    badge: 'Por que escolher a LED Machine',
    title: 'Engenharia de precisão.',
    subtitle: 'Unimos tecnologia avançada, estética de alto padrão e garantia estendida para entregar a melhor experiência visual do mercado.',
    cards: [
      {
        id: 1,
        title: 'Projetos 100% Personalizados',
        highlight: 'Sob medida para o seu espaço',
        description: 'Desenvolvemos o tamanho, formato e curvatura exatos para harmonizar perfeitamente com sua arquitetura ou marcenaria.',
      },
      {
        id: 2,
        title: 'Alta Definição e Brilho',
        highlight: 'Visibilidade perfeita em qualquer luz',
        description: 'Painéis com tecnologia Fine-Pitch e ajuste inteligente de luminosidade para máximo conforto visual dia e noite.',
      },
      {
        id: 3,
        title: 'Instalação Limpa e Rápida',
        highlight: 'Equipe própria especializada',
        description: 'Montagem estruturada, passagem de cabos invisível e integração completa com seus sistemas de automação e áudio.',
      },
      {
        id: 4,
        title: 'Garantia de 2 Anos e Suporte',
        highlight: 'Tranquilidade total para o seu projeto',
        description: 'Garantia estendida com peças de reposição imediatas e suporte técnico prioritário sempre que precisar.',
      },
    ],
  },
  widescreenBanner: {
    tag: 'Outdoor & Grandes Formatos',
    title: 'PAINÉIS DE ALTA ESCALA PARA FACHADAS E EVENTOS',
    subtitle: 'Brilho incomparável, resistência extrema e impacto inesquecível',
    description: 'Projetados para suportar sol escaldante, chuva torrencial e ventos fortes mantendo cores vívidas e alta taxa de atualização.',
    ctaText: 'Solicitar Projeto para Fachada',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=80',
  },
  solutions: {
    badge: 'Aplicações Sob Medida',
    title: 'Soluções para Empresas e Residências',
    subtitle: 'Seja para valorizar a sua marca ou transformar a sua casa em uma experiência cinematográfica.',
    commercial: {
      title: 'Comercial & Corporativo',
      subtitle: 'Para empresas, lojas, recepções e eventos que buscam autoridade imediata.',
      description: 'Destaque seus produtos, comunique com clareza institucional e crie ambientes modernos que impressionam clientes e parceiros.',
      features: [
        'Painéis para Fachadas & Vitrines de Alto Brilho',
        'Salas de Reunião e Diretoria com Micro-LED',
        'Showrooms, Lojas Conceito e Lobbies',
        'Controle centralizado de conteúdo em tempo real',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Quero um Projeto Comercial',
    },
    residential: {
      title: 'Residencial & Áreas Gourmet',
      subtitle: 'Para salas de estar, home theaters, áreas de piscina e espaços de lazer.',
      description: 'Substitua TVs convencionais por uma tela monumental sem emendas, perfeitamente integrada à decoração do seu imóvel.',
      features: [
        'Home Cinema sem emendas com contraste profundo',
        'Painéis Curvos para Living & Espaços Gourmet',
        'Áreas de Piscina e Lazer com Proteção IP65 Solar',
        'Integração total com Automação Residencial (Control4, Crestron, Alexa)',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Quero um Projeto Residencial',
    },
  },
  warranty: {
    badge: 'Confiança Inabalável',
    title: '2 Anos de Garantia com Suporte Nacional',
    description: 'Nossos módulos passam por rigorosos testes de qualidade antes de cada entrega. Você tem total segurança com nosso suporte pós-venda direto e estoque local de reposição.',
    features: [
      'Garantia completa de 24 meses em módulos e controladores',
      'Atendimento técnico prioritário e peças de reposição rápida',
      'Treinamento operacional incluso para a sua equipe ou família',
    ],
    ctaText: 'Falar com Especialista de Garantia',
  },
  featuredGallery: {
    title: 'LED Machine',
    titleHighlight: 'Cinema Series',
    subtitle: 'Conheça cada detalhe do nosso painel Fine-Pitch Master Wall sob medida: engenharia de precisão, contraste absoluto e acabamento arquitetônico sem emendas.',
    productTitle: 'Fine-Pitch Master Wall P1.5',
    productCategory: 'Residencial & Corporativo High-End',
    productDescription: 'Desenvolvido especificamente para ambientes que exigem proximidade de visão e fidelidade cromática impecável, sem gerar fadiga visual.',
    specs: [
      { label: 'Pixel Pitch', value: 'P1.53 mm', desc: 'Distância ultra fina para visão perfeita a partir de 1 metro' },
      { label: 'Taxa de Atualização', value: '3.840 Hz', desc: 'Sem efeito flicker em gravações e vídeos de alta velocidade' },
      { label: 'Brilho Inteligente', value: '1.200 nits', desc: 'Sensor automático para ajuste de luminosidade dia e noite' },
      { label: 'Gabinete Slim', value: 'Alumínio CNC', desc: 'Espessura ultrafina com dissipação térmica 100% silenciosa' },
    ],
    images: [
      { id: 1, title: 'Living Integrado', subtitle: 'Harmonia com marcenaria nobre', url: imgCurvedLiving },
      { id: 2, title: 'Lounge Esportivo', subtitle: 'Imersão em jogos e transmissões', url: imgLoungeSports },
      { id: 3, title: 'Área Gourmet Externa', subtitle: 'Visibilidade à prova de sol', url: imgPoolMorning },
      { id: 4, title: 'Hall Arquitetônico', subtitle: 'Impacto visual imponente', url: imgHallAutumn },
    ],
  },
  moreThanPanel: {
    badge: 'Impacto Visual Real',
    title: 'Não é apenas uma tela.',
    titleHighlight: 'É uma nova experiência.',
    p1: 'Um painel de LED transforma a maneira como as pessoas percebem um ambiente.',
    companyTitle: 'Para sua Empresa',
    companyDesc: 'Posiciona sua marca como inovadora, moderna e profissional, atraindo olhares e fixando sua mensagem.',
    homeTitle: 'Para sua Residência',
    homeDesc: 'Cria um ambiente sofisticado para reunir família e amigos com momentos de entretenimento inigualáveis.',
    p2: 'Não vendemos apenas tecnologia;',
    bannerText: 'Entregamos impacto, estética, tecnologia e uma experiência premium do início ao fim.',
  },
  experience: {
    badge: 'Atendimento de Alto Padrão',
    title: 'Do primeiro contato à instalação, uma experiência premium.',
    subtitle: 'Um projeto de alto padrão merece um atendimento à altura.',
    steps: [
      {
        stepNumber: '01',
        title: 'Consultoria Personalizada',
        description: 'Entendemos a planta, iluminação, distância de visão e objetivo do seu espaço.',
        highlight: 'Análise técnica precisa',
      },
      {
        stepNumber: '02',
        title: 'Projeto Sob Medida & 3D',
        description: 'Apresentamos a especificação exata de pixel pitch, gabinete e infraestrutura.',
        highlight: 'Sem custos imprevistos',
      },
      {
        stepNumber: '03',
        title: 'Instalação e Calibração',
        description: 'Nossa equipe técnica cuida de toda a fixação, conexões e calibração de cores.',
        highlight: 'Acabamento invisível',
      },
      {
        stepNumber: '04',
        title: 'Pós-Venda e Garantia',
        description: 'Garantia de 2 anos e suporte com peças de reposição imediatas.',
        highlight: 'Tranquilidade contínua',
      },
    ],
  },
  authority: {
    quote: 'Tecnologia que valoriza o que realmente importa.',
    text1: 'Na LED Machine, acreditamos que a tecnologia deve servir para valorizar momentos, marcas e espaços.',
    text2: 'Cada projeto é tratado com rigor técnico e atenção artesanal aos detalhes, para que você receba um resultado duradouro, impactante e perfeito.',
    author: 'Equipe LED Machine',
    role: 'Engenharia & Design de Displays',
  },
  faq: {
    badge: 'Perguntas Frequentes',
    title: 'Tire suas dúvidas',
    subtitle: 'Tudo o que você precisa saber para planejar seu projeto de painel de LED com segurança e clareza.',
    items: [
      {
        id: 'faq-1',
        question: 'Qual a diferença entre uma TV convencional e um painel de LED sob medida?',
        answer: 'Ao contrário das TVs, os painéis de LED não possuem limites de tamanho nem emendas (bordas). Eles são modulares, oferecem brilho até 10x maior para ambientes iluminados e durabilidade superior a 100.000 horas de uso contínuo.',
      },
      {
        id: 'faq-2',
        question: 'Como escolher o Pixel Pitch ideal para o meu ambiente?',
        answer: 'O Pixel Pitch define a distância entre os LEDs. Para ambientes residenciais ou salas corporativas onde as pessoas ficam próximas (1 a 3 metros), recomendamos P1.2 a P1.8 (Fine-Pitch). Para áreas externas ou fachadas com maior distância, utilizamos P2.9 a P3.9.',
      },
      {
        id: 'faq-3',
        question: 'O painel pode ficar em área externa exposto a sol e chuva?',
        answer: 'Sim! Nossos modelos Outdoor contam com vedação IP65/IP66 e tecnologia de altíssimo brilho (acima de 5.500 nits), garantindo imagem límpida mesmo sob sol direto e total resistência a intempéries.',
      },
      {
        id: 'faq-4',
        question: 'Como funciona a garantia de 2 anos e a manutenção?',
        answer: 'Oferecemos garantia de 24 meses cobrindo módulos de LED, placas de controle e fontes de alimentação. Mantemos estoque nacional de peças de reposição e oferecemos suporte técnico direto para manutenções rápidas.',
      },
      {
        id: 'faq-5',
        question: 'Vocês atendem e instalam fora de São Paulo?',
        answer: 'Sim! Entregamos e instalamos projetos residenciais, corporativos e comerciais em todo o território nacional através de nossa equipe técnica especializada.',
      },
    ],
  },
  social: {
    badge: 'Nossa Comunidade',
    title: 'Acompanhe a LED Machine nas Redes',
    subtitle: 'Inspire-se com projetos reais, novidades de tecnologia de ponta, bastidores das nossas instalações e conteúdos exclusivos para arquitetos e empresas.',
    instagramFollowText: 'Seguir no Instagram',
    youtubeSubText: 'Inscrever-se no YouTube',
    cards: [
      {
        id: 1,
        tag: '#LivingGourmet',
        title: 'Instalação Curva em Alphaville',
        likes: '1.240 curtidas',
        imageUrl: imgCurvedLiving,
        caption: 'Acabamento perfeito integrado com a marcenaria de madeira nobre. O que acharam dessa curvatura?',
      },
      {
        id: 2,
        tag: '#LoungeSports',
        title: 'Cinema & Sports Bar Privativo',
        likes: '890 curtidas',
        imageUrl: imgLoungeSports,
        caption: 'Dia de clássico visto com contraste 4K e som espacial. A sala dos sonhos de qualquer torcedor.',
      },
      {
        id: 3,
        tag: '#OutdoorPool',
        title: 'Pool Wall no Litoral Norte',
        likes: '2.150 curtidas',
        imageUrl: imgPoolMorning,
        caption: 'Sol do meio-dia e a nitidez continua impecável. Tecnologia IP65 com 6.000 nits de brilho.',
      },
      {
        id: 4,
        tag: '#Corporativo',
        title: 'Fachada Flagship Jardins',
        likes: '1.560 curtidas',
        imageUrl: imgHallAutumn,
        caption: 'Arte digital contínua para recepção corporativa com automação de horário.',
      },
    ],
  },
  finalCta: {
    badge: 'Pronto para Transformar seu Espaço?',
    title: 'Transforme seu ambiente com a tecnologia LED Machine.',
    subtitle: 'Converse com nossos consultores, receba uma consultoria técnica sem compromisso e descubra o painel perfeito para o seu projeto.',
    btnPrimary: 'Solicitar Consultoria Gratuita',
    btnSecondary: 'Falar Direto no WhatsApp',
    guaranteeSeal: 'Garantia de 2 anos • Suporte em todo o Brasil • Instalação técnica inclusa',
  },
  footer: {
    aboutText: 'Especialistas em engenharia visual de alta definição, painéis de LED modulares e telas monumentais para projetos comerciais e residenciais de alto padrão.',
    copyrightText: '© 2026 LED MACHINE Displays & Engineering. Todos os direitos reservados.',
  },
};
