import React from 'react';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { ImageCarousel } from './ImageCarousel';
import { useSiteContent } from '../context/SiteContentContext';

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
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC AURORA & DIAGONAL LIGHT BEAM (INTEGRATED BEHIND NAVBAR) */}
      {/* ========================================================================= */}
      
      {/* Ambient background dark glow */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Soft Violet/Magenta Glow behind Left-Center Text */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/4 w-[500px] sm:w-[650px] h-[350px] sm:h-[450px] bg-[#8b24d6]/25 rounded-full blur-[110px]" />
        
        {/* Deep Indigo/Blue Ambient Glow in Center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] sm:w-[750px] h-[380px] sm:h-[480px] bg-[#3b49c7]/20 rounded-full blur-[130px]" />

        {/* DIAGONAL AURORA LIGHT BEAM (Sweeping across from top-right right behind the Menu) */}
        <div className="absolute -top-16 right-0 sm:right-6 w-[650px] sm:w-[950px] h-[200px] sm:h-[290px] aurora-beam opacity-85" />
        <div className="absolute top-4 right-2 sm:right-16 w-[550px] sm:w-[850px] h-[45px] sm:h-[80px] aurora-beam-sharp opacity-95" />
        <div className="absolute top-20 right-10 sm:right-32 w-[400px] sm:w-[650px] h-[18px] sm:h-[35px] bg-cyan-300/80 filter blur-[8px] transform -rotate-[32deg] opacity-80" />
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT CONTAINER (EXACT PROPORTIONS, FONTS & ALIGNMENT) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center pt-4 sm:pt-8">
        
        {/* A. Eyebrow Pill Badge (Avatar Stack + Count Text - Compact & Delicate) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-[11px] sm:text-xs text-white/90 backdrop-blur-md shadow-sm mb-6 transition-all animate-in fade-in duration-700">
          {/* Avatar Circles Stack */}
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

        {/* B. Main Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-[42px] lg:text-[46px] font-black text-white uppercase tracking-tight leading-[1.12] mb-5 drop-shadow-md max-w-2xl">
          {content.hero.titleLine1} <br />
          <span className="mt-1 inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-cyan-200">
            {content.hero.titleLine2}
          </span>
        </h1>

        {/* C. Subtitle Paragraph */}
        <p className="text-xs sm:text-[13.5px] md:text-[14px] text-white/60 max-w-lg mx-auto leading-relaxed font-normal mb-7 text-balance">
          {content.hero.subtitle}
        </p>

        {/* D. CTA Pill Button */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <button
            id="hero-cta-pill-button"
            onClick={onOpenContact}
            className="group px-5 py-2.5 rounded-full bg-white hover:bg-white/90 text-[#070919] font-bold text-xs shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{content.hero.ctaPrimaryText || 'Solicitar Projeto'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#070919] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM SOCIAL PROOF & LOGO BAR */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-6 border-t border-white/10 flex flex-col items-center space-y-5">
        <p className="text-xs sm:text-sm text-white/55 font-medium tracking-tight">
          Confiado por mais de 100 marcas, arquitetos e residências de alto padrão
        </p>

        {/* Minimalist Monochrome Logo Row */}
        <div className="w-full flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50 hover:opacity-80 transition-opacity">
          {/* Logo 1: Absen */}
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center">
              <div className="w-2 h-2 bg-white/80 rounded-full" />
            </div>
            <span>ABSEN LED</span>
          </div>

          {/* Logo 2: NovaStar */}
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded border border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/80 rounded-sm rotate-45" />
            </div>
            <span>NOVASTAR</span>
          </div>

          {/* Logo 3: MicroLED Pro */}
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 border-2 border-white/60 rotate-45" />
            <span>MICROLED PRO</span>
          </div>

          {/* Logo 4: Unilumin */}
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded-sm bg-white/40 flex items-center justify-center" />
            <span>UNILUMIN</span>
          </div>

          {/* Logo 5: Crestron Certified */}
          <div className="flex items-center gap-1.5 font-bold tracking-widest text-xs sm:text-sm uppercase text-white/80">
            <div className="w-4 h-4 rounded-full border-t-2 border-white/80" />
            <span>CRESTRON</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 3D COVERFLOW GALLERY SHOWCASE */}
      {/* ========================================================================= */}
      <div className="w-full max-w-6xl relative group mt-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 to-cyan-500/40 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000" />
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

