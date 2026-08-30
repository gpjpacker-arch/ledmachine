import React from 'react';
import { ShieldCheck, Zap, Maximize2 } from 'lucide-react';
import urbanOutdoorImg from '../assets/images/urban_outdoor_led_1788061472350.jpg';

interface WidescreenLedBannerProps {
  onOpenProjectQuote?: () => void;
}

export const WidescreenLedBanner: React.FC<WidescreenLedBannerProps> = ({ onOpenProjectQuote }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      {/* Subtle Background Glow behind the banner */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-72 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#060c24]/90 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(37,99,235,0.2)] group">
        {/* Top Edge Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent z-20" />

        {/* Widescreen Image Wrapper */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full overflow-hidden">
          <img
            src={urbanOutdoorImg}
            alt="Painel de LED Outdoor de Alta Performance LED Machine em Fachada Urbana"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Cinematic Vignette & Bottom Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040819] via-[#040819]/30 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040819]/80 via-transparent to-[#040819]/80 opacity-60" />

          {/* Top Floating Badge */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-blue-400/40 text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Painel Outdoor Alta Performance • IP65</span>
            </div>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">
                Presença Visual de Alto Impacto
              </span>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                Tecnologia Visual que Domina o Ambiente Urbano
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1 line-clamp-2 drop-shadow">
                Brilho calibrado de até 6.500 nits, proteção climática integral e altíssima taxa de atualização para visualização perfeita sob luz solar direta.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-white/80 bg-black/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span>6.500 nits</span>
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>IP65 Total</span>
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Sob Medida</span>
                </div>
              </div>

              {onOpenProjectQuote && (
                <button
                  onClick={onOpenProjectQuote}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.28)] border border-white cursor-pointer shrink-0 hover:scale-[1.02]"
                >
                  Consultar Projeto
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
