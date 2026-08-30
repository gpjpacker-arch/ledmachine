import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers,
  Eye,
  Sliders,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  X,
  Info
} from 'lucide-react';

import imgCurvedLiving from '../assets/images/led_curved_living_1788059274464.jpg';
import imgLoungeSports from '../assets/images/led_lounge_sports_1788059299151.jpg';
import imgDiningRoom from '../assets/images/led_dining_room_1788059416951.jpg';
import imgHallAutumn from '../assets/images/led_hall_autumn_1788059379228.jpg';

interface ProductView {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  imageUrl: string;
  hotspots?: { x: number; y: number; label: string; desc: string }[];
}

interface FeaturedProductGallerySectionProps {
  onOpenProductQuote: (productName: string) => void;
}

export const FeaturedProductGallerySection: React.FC<FeaturedProductGallerySectionProps> = ({
  onOpenProductQuote,
}) => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Gallery views of this single flagship product (angles, integration, lighting, details)
  const productViews: ProductView[] = [
    {
      id: 'panoramica',
      title: 'Visão Panorâmica do Ambiente',
      subtitle: 'Integração completa ao living & espaço gourmet',
      description:
        'O painel se torna o ponto central do espaço, oferecendo imersão visual contínua com moldura invisível e curvatura personalizada sob medida.',
      badge: 'Vista Principal',
      imageUrl: imgCurvedLiving,
      hotspots: [
        {
          x: 48,
          y: 40,
          label: 'Módulos Fine-Pitch P1.5',
          desc: 'Densidade de pixels ultrafina para visualização nítida mesmo a curta distância.',
        },
        {
          x: 25,
          y: 65,
          label: 'Curvatura Sob Medida',
          desc: 'Ângulo de visão de 160° sem distorções de cor ou perda de luminosidade.',
        },
        {
          x: 75,
          y: 70,
          label: 'Estrutura Slim Front-Service',
          desc: 'Manutenção frontal magnética rápida sem necessidade de desmontar marcenaria.',
        },
      ],
    },
    {
      id: 'contraste',
      title: 'Contraste Profundo & Nível de Preto',
      subtitle: 'Tecnologia HDR10+ com calibração precisa de cores',
      description:
        'Pretos verdadeiramente profundos e taxa de atualização de 3840Hz, eliminando reflexos indesejados e entregando fidelidade cinematográfica.',
      badge: 'Detalhe & Contraste',
      imageUrl: imgLoungeSports,
      hotspots: [
        {
          x: 50,
          y: 45,
          label: '3.840Hz Refresh Rate',
          desc: 'Fluidez impecável para transmissões esportivas e cenas de ação rápida.',
        },
        {
          x: 35,
          y: 75,
          label: 'Brilho Autoajustável',
          desc: 'Sensor inteligente que calibra a intensidade luminosa conforme o ambiente.',
        },
      ],
    },
    {
      id: 'marcenaria',
      title: 'Integração Arquitetônica & Acabamento',
      subtitle: 'Harmonia milimétrica com painéis de madeira e pedras nobres',
      description:
        'Desenvolvido para dialogar perfeitamente com projetos de arquitetura e design de interiores, sem cabos visíveis e com ventilação silenciosa.',
      badge: 'Arquitetura & Design',
      imageUrl: imgDiningRoom,
      hotspots: [
        {
          x: 55,
          y: 50,
          label: 'Zero Cabos Visíveis',
          desc: 'Passagem interna estruturada com central de comando oculta.',
        },
        {
          x: 30,
          y: 35,
          label: 'Operação 100% Silenciosa',
          desc: 'Dissipação passiva de calor sem ventiladores ruidosos.',
        },
      ],
    },
    {
      id: 'escala',
      title: 'Impacto Visual & Resolução Imersiva',
      subtitle: 'Experiência imersiva de ponta a ponta sem emendas',
      description:
        'Superfície contínua e uniforme, proporcionando uma experiência muito superior a TVs convencionais em grandes formatos.',
      badge: 'Escala & Fidelidade',
      imageUrl: imgHallAutumn,
      hotspots: [
        {
          x: 45,
          y: 38,
          label: 'Painel Sem Linhas ou Emendas',
          desc: 'Acoplamento magnético micrométrico entre os módulos para imagem contínua.',
        },
      ],
    },
  ];

  const currentView = productViews[activeViewIndex];

  const handleNext = () => {
    setActiveViewIndex((prev) => (prev + 1) % productViews.length);
    setActiveHotspot(null);
  };

  const handlePrev = () => {
    setActiveViewIndex((prev) => (prev - 1 + productViews.length) % productViews.length);
    setActiveHotspot(null);
  };

  const productName = 'Painel LED Machine Cinema Series • Fine-Pitch Master Wall';

  return (
    <section
      id="produto-destaque-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Atmosphere Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
          LED Machine <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Cinema Series</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
          Conheça cada detalhe do nosso painel <strong className="text-white">Fine-Pitch Master Wall</strong> sob medida: engenharia de precisão, contraste absoluto e acabamento arquitetônico sem emendas.
        </p>
      </div>

      {/* Main Showcase Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left/Main Column: Interactive Large Viewer */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Image Frame */}
          <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a1026] border border-blue-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
            <img
              src={currentView.imageUrl}
              alt={currentView.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030614]/90 via-[#030614]/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030614]/40 via-transparent to-transparent pointer-events-none" />

            {/* Top Bar inside image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wide uppercase shadow-lg border border-blue-400/30">
                {currentView.badge}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-2 rounded-full bg-black/60 hover:bg-blue-600/80 backdrop-blur-md text-white/90 hover:text-white transition-all border border-white/10 hover:border-blue-400/40 cursor-pointer shadow-md"
                  title="Expandir imagem"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Hotspots Pins */}
            {currentView.hotspots?.map((spot, idx) => (
              <div
                key={idx}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="relative group/hotspot">
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-300 cursor-pointer ${
                      activeHotspot === idx
                        ? 'bg-blue-500 text-white scale-125 shadow-[0_0_25px_rgba(59,130,246,0.9)]'
                        : 'bg-white/90 text-blue-900 hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.7)]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping opacity-75 absolute" />
                    <Info className="w-3.5 h-3.5 relative z-10" />
                  </button>

                  {/* Hotspot Tooltip */}
                  {(activeHotspot === idx || undefined) && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 sm:w-64 p-3 rounded-xl bg-[#080d22]/95 border border-blue-400/40 shadow-2xl backdrop-blur-xl z-30 text-left transition-all animate-in fade-in zoom-in-95">
                      <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold mb-1">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>{spot.label}</span>
                      </div>
                      <p className="text-[11px] text-white/80 leading-snug">{spot.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-blue-600/80 backdrop-blur-md text-white/80 hover:text-white transition-all border border-white/10 hover:border-blue-400/30 cursor-pointer shadow-lg z-10"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-blue-600/80 backdrop-blur-md text-white/80 hover:text-white transition-all border border-white/10 hover:border-blue-400/30 cursor-pointer shadow-lg z-10"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Caption inside Image */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-md">
                {currentView.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-1 drop-shadow">
                {currentView.subtitle}
              </p>
            </div>
          </div>

          {/* Thumbnails Row (Angulos do Produto) */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {productViews.map((view, index) => {
              const isActive = activeViewIndex === index;
              return (
                <button
                  key={view.id}
                  onClick={() => {
                    setActiveViewIndex(index);
                    setActiveHotspot(null);
                  }}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden text-left transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'border-blue-400 ring-2 ring-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-[1.02]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img
                    src={view.imageUrl}
                    alt={view.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-semibold text-white truncate drop-shadow">
                    {index + 1}. {view.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Product Specs, Value Prop & Direct Quote CTA */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-[#070c20]/60 rounded-3xl p-6 sm:p-8 border border-blue-500/15 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Garantia de 2 Anos Inclusa</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Engenharia e Imagem em Nível Cinema
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
              {currentView.description}
            </p>
          </div>

          {/* Quick Specifications Pill Grid */}
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-widest">
              Especificações do Modelo
            </h4>

            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-white/50 block font-medium">Pixel Pitch</span>
                <span className="text-xs sm:text-sm font-bold text-white">P1.2 a P1.8 mm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-white/50 block font-medium">Taxa de Atualização</span>
                <span className="text-xs sm:text-sm font-bold text-white">3.840 Hz HDR</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-white/50 block font-medium">Brilho Calibrado</span>
                <span className="text-xs sm:text-sm font-bold text-white">Até 1.600 nits</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] text-white/50 block font-medium">Manutenção</span>
                <span className="text-xs sm:text-sm font-bold text-white">100% Frontal</span>
              </div>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="space-y-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Formatos planos, curvos ou em ângulo 90°</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Compatível com Apple TV, PS5, Automação Control4/Crestron</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instalação estrutural e calibração por equipe própria</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onOpenProductQuote(productName)}
              className="w-full py-3.5 px-5 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.28)] border border-white transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Solicitar Orçamento Deste Produto</span>
              <ArrowRight className="w-4 h-4 text-[#070c20]" />
            </button>

            <a
              href={`https://wa.me/5519999107788?text=${encodeURIComponent(
                `Olá, vi os detalhes do ${productName} no site da LED Machine e gostaria de um orçamento personalizado para o meu espaço.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Tirar Dúvidas com Especialista no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in">
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50 border border-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={currentView.imageUrl}
              alt={currentView.title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl border border-white/10 shadow-2xl"
            />

            {/* Prev / Next inside Lightbox */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-blue-600 text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-blue-600 text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-white font-bold text-base sm:text-lg">{currentView.title}</p>
            <p className="text-white/60 text-xs sm:text-sm">{currentView.subtitle}</p>
          </div>
        </div>
      )}
    </section>
  );
};
