import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  X,
  Info,
  Camera,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Check,
  Loader2,
  ImageIcon,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { defaultSiteContent } from '../data/siteContent';
import { compressAndOptimizeImage } from '../utils/imageCompressor';
import { openButtonLink } from '../utils/linkHelper';

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

const defaultImages = [
  imgCurvedLiving,
  imgLoungeSports,
  imgDiningRoom,
  imgHallAutumn,
];

export const FeaturedProductGallerySection: React.FC<FeaturedProductGallerySectionProps> = ({
  onOpenProductQuote,
}) => {
  const { content, updateField } = useSiteContent();
  const savedImages = content.featuredGallery?.images || [];

  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Photo management modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editTabIndex, setEditTabIndex] = useState(0);
  const [draftImages, setDraftImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productViews: ProductView[] = [
    {
      id: 'panoramica',
      title: 'Visão Panorâmica do Ambiente',
      subtitle: 'Integração completa ao living & espaço gourmet',
      description:
        'O painel se torna o ponto central do espaço, oferecendo imersão visual contínua com moldura invisível e curvatura personalizada sob medida.',
      badge: 'Vista Principal',
      imageUrl: savedImages[0]?.url || defaultImages[0],
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
      imageUrl: savedImages[1]?.url || defaultImages[1],
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
      imageUrl: savedImages[2]?.url || defaultImages[2],
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
      imageUrl: savedImages[3]?.url || defaultImages[3],
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

  const handleOpenEditor = (targetIndex: number = activeViewIndex) => {
    setEditTabIndex(targetIndex);
    setDraftImages(productViews.map((pv) => pv.imageUrl));
    setUrlInput('');
    setErrorMessage('');
    setSaveSuccess(false);
    setIsEditorOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setErrorMessage('');
    try {
      const optimizedBase64 = await compressAndOptimizeImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
      });
      setDraftImages((prev) => {
        const next = [...prev];
        next[editTabIndex] = optimizedBase64;
        return next;
      });
    } catch (err: any) {
      console.error('Erro ao otimizar imagem:', err);
      setErrorMessage(err.message || 'Erro ao processar imagem selecionada.');
    } finally {
      setIsProcessing(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setDraftImages((prev) => {
      const next = [...prev];
      next[editTabIndex] = trimmed;
      return next;
    });
    setUrlInput('');
  };

  const handleRestoreCurrentToDefault = () => {
    setDraftImages((prev) => {
      const next = [...prev];
      next[editTabIndex] = defaultImages[editTabIndex];
      return next;
    });
    setErrorMessage('');
  };

  const handleRestoreAllToDefault = () => {
    setDraftImages([...defaultImages]);
    setErrorMessage('');
  };

  const handleSaveAll = () => {
    const baseFeatured = content.featuredGallery || defaultSiteContent.featuredGallery;
    const currentBaseImages = baseFeatured.images || [];

    const updatedImages = productViews.map((pv, idx) => ({
      id: currentBaseImages[idx]?.id || idx + 1,
      title: pv.title,
      subtitle: pv.subtitle,
      url: draftImages[idx] || pv.imageUrl,
    }));

    updateField('featuredGallery', {
      ...baseFeatured,
      images: updatedImages,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditorOpen(false);
    }, 900);
  };

  const flagshipProductTitle = 'Painel LED Machine Cinema Series • Fine-Pitch Master Wall';

  return (
    <section
      id="produto-destaque-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
          LED Machine{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
            Cinema Series
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
          Conheça cada detalhe do nosso painel <strong className="text-white">Fine-Pitch Master Wall</strong> sob medida: engenharia de precisão, contraste absoluto e acabamento arquitetônico sem emendas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Stage & Thumbnails */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a1026] border border-blue-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
            <img
              src={currentView.imageUrl}
              alt={currentView.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030614]/90 via-[#030614]/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030614]/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wide uppercase shadow-lg border border-blue-400/30">
                {currentView.badge}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-alterar-fotos-galeria-cinema"
                  onClick={() => handleOpenEditor(activeViewIndex)}
                  className="px-3.5 py-1.5 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-xl border border-white/20 hover:border-white/40 text-xs font-semibold text-white flex items-center gap-2 shadow-lg transition-all duration-200 cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
                  title="Trocar fotos desta galeria"
                >
                  <Camera className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>Trocar Fotos</span>
                </button>
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-2 rounded-full bg-black/60 hover:bg-blue-600/80 backdrop-blur-md text-white/90 hover:text-white transition-all border border-white/10 hover:border-blue-400/40 cursor-pointer shadow-md"
                  title="Expandir imagem"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hotspots */}
            {currentView.hotspots?.map((hotspot, idx) => (
              <div
                key={idx}
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
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
                    <Sparkles className="w-3.5 h-3.5 relative z-10" />
                  </button>

                  {activeHotspot === idx && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 sm:w-64 p-3 rounded-xl bg-[#080d22]/95 border border-blue-400/40 shadow-2xl backdrop-blur-xl z-30 text-left transition-all animate-in fade-in zoom-in-95">
                      <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold mb-1">
                        <Info className="w-3 h-3 shrink-0" />
                        <span>{hotspot.label}</span>
                      </div>
                      <p className="text-[11px] text-white/80 leading-snug">{hotspot.desc}</p>
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

            {/* Bottom Title on Image */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-md">
                {currentView.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-1 drop-shadow">
                {currentView.subtitle}
              </p>
            </div>
          </div>

          {/* Thumbnails Row Header */}
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
              Ângulos & Aplicações ({activeViewIndex + 1}/4)
            </span>
            <button
              type="button"
              onClick={() => handleOpenEditor(activeViewIndex)}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer hover:underline"
              title="Abrir gerenciador de fotos"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Alterar Fotos da Galeria</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {productViews.map((view, idx) => {
              const isActive = activeViewIndex === idx;
              return (
                <div key={view.id} className="relative group/thumb">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveViewIndex(idx);
                      setActiveHotspot(null);
                    }}
                    className={`w-full relative aspect-[16/10] rounded-xl overflow-hidden text-left transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'border-blue-400 ring-2 ring-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-[1.02]'
                        : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img src={view.imageUrl} alt={view.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/10 transition-colors" />
                    <span className="absolute bottom-1.5 left-2 right-2 text-[10px] sm:text-xs font-semibold text-white truncate drop-shadow">
                      {idx + 1}. {view.badge}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditor(idx);
                    }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-black/75 hover:bg-sky-500 text-white/80 hover:text-white flex items-center justify-center transition-all shadow-md cursor-pointer border border-white/15 opacity-0 group-hover/thumb:opacity-100 z-20"
                    title={`Trocar foto ${idx + 1}: ${view.badge}`}
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Details Sidebar */}
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

          <div className="space-y-3 pt-2">
            <button
              onClick={() =>
                openButtonLink(
                  content.buttonLinks?.featuredProductQuote,
                  () => onOpenProductQuote(flagshipProductTitle)
                )
              }
              className="w-full py-3.5 px-5 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.28)] border border-white transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Solicitar Orçamento Deste Produto</span>
              <ArrowRight className="w-4 h-4 text-[#070c20]" />
            </button>

            <button
              onClick={() => {
                const defaultWhatsapp = `https://wa.me/5519999107788?text=${encodeURIComponent(
                  `Olá, vi os detalhes do ${flagshipProductTitle} no site da LED Machine e gostaria de um orçamento personalizado para o meu espaço.`
                )}`;
                openButtonLink(
                  content.buttonLinks?.featuredProductWhatsapp || defaultWhatsapp,
                  () => onOpenProductQuote(flagshipProductTitle)
                );
              }}
              className="w-full py-3 px-5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Tirar Dúvidas com Especialista no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in">
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
          </div>

          <div className="mt-4 text-center">
            <h4 className="text-white text-lg font-bold">{currentView.title}</h4>
            <p className="text-white/70 text-sm mt-1">{currentView.subtitle}</p>
          </div>
        </div>
      )}

      {/* Photo Management Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0b0f1d] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl my-auto text-left">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Alterar Fotos da Galeria Cinema Series
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Substitua qualquer uma das 4 fotos por imagens do seu computador, celular ou link.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Position Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
              {productViews.map((pv, idx) => {
                const isSelected = editTabIndex === idx;
                return (
                  <button
                    key={pv.id}
                    type="button"
                    onClick={() => {
                      setEditTabIndex(idx);
                      setUrlInput('');
                      setErrorMessage('');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-left text-xs font-medium transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="text-[10px] text-sky-400 font-bold uppercase truncate">
                      Foto {idx + 1}
                    </div>
                    <div className="truncate font-semibold text-white">
                      {pv.badge}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Selected Photo Editor Card */}
            <div className="space-y-4 bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                    Editando Foto {editTabIndex + 1} de 4 • {productViews[editTabIndex].badge}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {productViews[editTabIndex].title}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {productViews[editTabIndex].subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRestoreCurrentToDefault}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer hover:underline"
                  title="Restaurar apenas esta foto ao padrão original"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar padrão</span>
                </button>
              </div>

              {/* Preview */}
              <div>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[260px] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-inner">
                  {isProcessing ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/85 text-white text-xs">
                      <Loader2 className="w-6 h-6 text-sky-400 animate-spin" />
                      <span>Processando e otimizando imagem...</span>
                    </div>
                  ) : draftImages[editTabIndex] ? (
                    <img
                      src={draftImages[editTabIndex]}
                      alt="Pré-visualização"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-xs">
                      Nenhuma imagem selecionada
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] text-white/90 border border-white/10">
                    Pré-visualização do Enquadramento
                  </div>
                </div>
              </div>

              {/* Upload Input & Trigger */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl border-2 border-dashed border-white/20 hover:border-sky-400/60 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-sky-400/20 text-sky-400 flex items-center justify-center transition-colors">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="block text-xs sm:text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      Escolher foto do computador ou celular para a Foto {editTabIndex + 1}
                    </span>
                    <span className="block text-[11px] text-zinc-400">
                      Suporta JPG, PNG ou WEBP (compressão e otimização automática)
                    </span>
                  </div>
                </button>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Ou colar link de imagem da Web (URL)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="url"
                      placeholder="https://exemplo.com/minha-foto.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyUrl();
                        }
                      }}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-sky-400/60"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* All 4 Thumbnails Quick Strip */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <label className="block text-[11px] font-semibold text-zinc-400 mb-2">
                Visão Geral das 4 Fotos (Clique em qualquer miniatura para selecioná-la):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {productViews.map((pv, idx) => {
                  const isCurrent = editTabIndex === idx;
                  const previewSrc = draftImages[idx] || pv.imageUrl;
                  return (
                    <button
                      key={pv.id}
                      type="button"
                      onClick={() => {
                        setEditTabIndex(idx);
                        setUrlInput('');
                        setErrorMessage('');
                      }}
                      className={`relative aspect-[16/10] rounded-xl overflow-hidden text-left border transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-sky-400 ring-2 ring-sky-500/40 scale-[1.03]'
                          : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <img src={previewSrc} alt={pv.badge} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                      <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white truncate drop-shadow">
                        {idx + 1}. {pv.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRestoreAllToDefault}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar todas ao padrão</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  disabled={isProcessing}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-[#090a0f] text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Salvo com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Salvar Fotos</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
