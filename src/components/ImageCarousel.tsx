import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Pause,
  Play,
  Maximize2,
  X
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export interface LedProjectCard {
  id: number;
  tag: string;
  category: 'Residencial' | 'Comercial' | 'Corporativo' | 'Varejo';
  title: string;
  subtitle: string;
  description: string;
  specs: {
    pitch: string;
    brightness: string;
    resolution: string;
  };
  imageUrl: string;
}

interface ImageCarouselProps {
  onRequestQuoteForProject?: (projectTitle: string, category: string) => void;
  onOpenSimulator?: () => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  onRequestQuoteForProject,
  onOpenSimulator,
}) => {
  const { content } = useSiteContent();

  const projects: LedProjectCard[] = content.carousel.projects.map((p) => ({
    id: p.id,
    tag: p.tag,
    category: p.category,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    specs: {
      pitch: p.pitch,
      brightness: p.brightness,
      resolution: p.resolution,
    },
    imageUrl: p.imageUrl,
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const total = projects.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const activeProject = projects[activeIndex];

  // Helper to calculate circular offset: -2, -1, 0, 1, 2
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
    setDragStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
    setDragStartX(null);
  };

  return (
    <div
      id="voyage-3d-coverflow-carousel"
      className="relative w-full rounded-3xl overflow-hidden bg-[#0a0518] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-white select-none transition-all"
    >
      {/* 1. ATMOSPHERIC BLURRED BACKGROUND (Reflects active slide) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          key={activeProject.imageUrl}
          src={activeProject.imageUrl}
          alt=""
          className="w-full h-full object-cover object-center filter blur-3xl scale-125 opacity-35 transition-all duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-[#070312]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* 2. TOP MINIMALIST HEADER BAR */}
      <div className="relative z-20 px-6 sm:px-8 py-5 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
            <span>Projetos LED Machine</span>
          </div>
          <span className="hidden sm:inline-flex text-xs text-white/60 font-medium">
            Painéis de LED em Alta Resolução
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pausar reprodução' : 'Iniciar reprodução'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-blue-300" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white transition-colors cursor-pointer"
            title="Visualizar em tela cheia"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white/80 hover:text-white" />
          </button>
        </div>
      </div>

      {/* 3. 3D COVERFLOW STAGE */}
      <div
        className="relative z-10 w-full h-[460px] sm:h-[540px] md:h-[580px] flex items-center justify-center overflow-hidden perspective-[1400px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Left Navigation Chevron Button */}
        <button
          id="carousel-3d-prev-btn"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-blue-600/90 border border-white/20 hover:border-blue-400 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer group"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Right Navigation Chevron Button */}
        <button
          id="carousel-3d-next-btn"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-blue-600/90 border border-white/20 hover:border-blue-400 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer group"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* CARDS CONTAINER */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          {projects.map((project, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Compute exact 3D transform styles
            let translateX = '0%';
            let translateZ = '0px';
            let rotateY = '0deg';
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;
            let filter = 'none';

            if (offset === 0) {
              translateX = '0%';
              translateZ = '40px';
              rotateY = '0deg';
              scale = 1.05;
              zIndex = 35;
              opacity = 1;
              filter = 'brightness(1)';
            } else if (offset === -1) {
              translateX = '-65%';
              translateZ = '-60px';
              rotateY = '26deg';
              scale = 0.86;
              zIndex = 20;
              opacity = 0.82;
              filter = 'brightness(0.75)';
            } else if (offset === 1) {
              translateX = '65%';
              translateZ = '-60px';
              rotateY = '-26deg';
              scale = 0.86;
              zIndex = 20;
              opacity = 0.82;
              filter = 'brightness(0.75)';
            } else if (offset === -2) {
              translateX = '-115%';
              translateZ = '-140px';
              rotateY = '42deg';
              scale = 0.72;
              zIndex = 10;
              opacity = 0.45;
              filter = 'brightness(0.55)';
            } else if (offset === 2) {
              translateX = '115%';
              translateZ = '-140px';
              rotateY = '-42deg';
              scale = 0.72;
              zIndex = 10;
              opacity = 0.45;
              filter = 'brightness(0.55)';
            }

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                style={{
                  transform: `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute w-[260px] sm:w-[320px] md:w-[360px] h-[360px] sm:h-[430px] md:h-[470px] rounded-3xl overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                  isCenter
                    ? 'shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(59,130,246,0.4)] ring-1 ring-white/30'
                    : 'shadow-2xl hover:opacity-100 hover:filter-none ring-1 ring-white/10'
                }`}
              >
                {/* Card Background Image */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Gradient Overlay for Supreme Text Contrast */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isCenter
                      ? 'bg-gradient-to-t from-black/95 via-black/40 to-black/25'
                      : 'bg-black/45 hover:bg-black/20'
                  }`}
                />

                {/* Top Floating Tag (Exact match of #Central America pill in reference) */}
                <div className="absolute top-5 right-5 z-20">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[11px] font-semibold text-white shadow-sm tracking-wide">
                    {project.tag}
                  </span>
                </div>

                {/* Bottom Centered Title & Subtitle Overlay (Matching reference layout) */}
                {isCenter ? (
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7 text-center flex flex-col items-center justify-end space-y-2.5 animate-in fade-in zoom-in-95 duration-500">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-[1.1] drop-shadow-lg text-balance">
                      {project.title}
                    </h3>

                    {/* Clean Horizontal Line Under Title (like reference) */}
                    <div className="w-12 h-[2px] bg-white/80 my-1 rounded-full shadow-sm" />

                    <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed max-w-[280px] drop-shadow">
                      {project.subtitle}
                    </p>

                    {/* Action CTA inside active card */}
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onRequestQuoteForProject) {
                            onRequestQuoteForProject(project.title, project.category);
                          }
                        }}
                        className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.3)] border border-white inline-flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                      >
                        <span>Solicitar Projeto</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#070c20]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Side Preview Title */
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-xs sm:text-sm font-bold text-white/90 truncate uppercase tracking-tight">
                      {project.title}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM DOTS & ACTIVE INDICATOR (Matching white dot in reference image) */}
      <div className="relative z-20 pb-6 pt-2 flex flex-col items-center justify-center space-y-3">
        <div className="flex items-center space-x-2.5">
          {projects.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Ir para slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  isActive
                    ? 'w-7 h-2 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            );
          })}
        </div>

        {/* Active Item Mini Counter & Specs */}
        <div className="flex items-center gap-4 text-xs text-white/70 font-medium">
          <span className="text-blue-300 font-mono font-bold">
            0{activeIndex + 1} / 0{total}
          </span>
          <span>•</span>
          <span className="text-white/90">{activeProject.specs.pitch}</span>
          <span>•</span>
          <span className="text-white/90">{activeProject.specs.brightness}</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            2 Anos de Garantia
          </span>
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL FOR FULL SCREEN VIEW */}
      {isLightboxOpen && (
        <div
          id="carousel-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="w-full max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase text-white shadow-lg">
                {activeProject.tag}
              </span>
              <h4 className="text-lg font-bold text-white hidden sm:block">
                {activeProject.title}
              </h4>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Image View */}
          <div className="relative max-w-5xl max-h-[72vh] w-full flex items-center justify-center my-auto">
            <img
              src={activeProject.imageUrl}
              alt={activeProject.title}
              className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bottom Info in Lightbox */}
          <div className="w-full max-w-3xl text-center space-y-3">
            <p className="text-sm sm:text-base text-white/90 font-medium">
              {activeProject.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-blue-300">
              <span>{activeProject.specs.pitch}</span>
              <span>•</span>
              <span>{activeProject.specs.brightness}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">2 Anos de Garantia LED Machine</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
