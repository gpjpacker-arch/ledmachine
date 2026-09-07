import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import { useSiteContent } from '../context/SiteContentContext';
import { openButtonLink } from '../utils/linkHelper';

interface HeroSectionProps {
  onOpenPlayground: () => void;
  onOpenContact: () => void;
  onOpenSpecialist: () => void;
  onRequestQuoteWithDetails?: (title: string, category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPlayground,
  onOpenContact,
  onOpenSpecialist,
  onRequestQuoteWithDetails,
}) => {
  const { content } = useSiteContent();

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-between text-center overflow-hidden pt-24 sm:pt-32 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center pt-4 sm:pt-8">
        {/* Social Proof Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-[11px] sm:text-xs text-white/90 backdrop-blur-md shadow-sm mb-6 transition-all animate-in fade-in duration-700">
          <div className="flex -space-x-1 items-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
              alt="Client"
              className="w-3.5 h-3.5 rounded-full border border-black/80 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
              alt="Client"
              className="w-3.5 h-3.5 rounded-full border border-black/80 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="Client"
              className="w-3.5 h-3.5 rounded-full border border-black/80 object-cover"
            />
          </div>
          <span className="font-normal text-[11px] tracking-normal text-white/90">
            {content.hero.clientCountText || '+500 Projetos Entregues'}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-[42px] lg:text-[46px] font-black text-white uppercase tracking-tight leading-[1.12] mb-5 drop-shadow-md max-w-2xl">
          {content.hero.titleLine1}{' '}
          <br />
          <span className="mt-1 inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300">
            {content.hero.titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-[13.5px] md:text-[14px] text-white/60 max-w-lg mx-auto leading-relaxed font-normal mb-7 text-balance">
          {content.hero.subtitle}
        </p>

        {/* Action Button */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <button
            id="hero-cta-pill-button"
            onClick={() => openButtonLink(content.buttonLinks?.heroPrimary, onOpenContact)}
            className="group px-6 sm:px-8 py-3.5 rounded-full bg-white hover:bg-white/90 text-[#070919] font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{content.hero.ctaPrimaryText || 'Solicitar Projeto'}</span>
            <ArrowRight className="w-4 h-4 text-[#070919] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-6 border-t border-white/10 flex flex-col items-center space-y-5">
        <p className="text-xs sm:text-sm text-white/55 font-medium tracking-tight">
          Confiado por mais de 100 marcas, arquitetos e residências de alto padrão
        </p>

        <div className="w-full flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center">
              <div className="w-2 h-2 bg-white/80 rounded-full" />
            </div>
            <span>ABSEN LED</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded border border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/80 rounded-sm rotate-45" />
            </div>
            <span>NOVASTAR</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 border-2 border-white/60 rotate-45" />
            <span>MICROLED PRO</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded-sm bg-white/40 flex items-center justify-center" />
            <span>UNILUMIN</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded-full border-t-2 border-white/80" />
            <span>CRESTRON</span>
          </div>
        </div>
      </div>

      {/* 3D Carousel Showcase */}
      <div className="w-full max-w-6xl relative group mt-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-500/15 to-slate-700/15 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
        <ImageCarousel
          onRequestQuoteForProject={(projectTitle, category) => {
            if (onRequestQuoteWithDetails) {
              onRequestQuoteWithDetails(projectTitle, category);
            } else {
              onOpenContact();
            }
          }}
          onOpenSimulator={onOpenPlayground}
        />
      </div>
    </section>
  );
};
