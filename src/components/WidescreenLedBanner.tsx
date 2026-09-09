import React, { useState } from 'react';
import { Layers, Eye, Maximize2, Edit3 } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { openButtonLink } from '../utils/linkHelper';
import curvedScreenImg from '../assets/images/curved_led_screen_1788647221773.jpg';
import { WidescreenBannerEditorModal } from './WidescreenBannerEditorModal';

interface WidescreenLedBannerProps {
  onOpenProjectQuote?: () => void;
}

export const WidescreenLedBanner: React.FC<WidescreenLedBannerProps> = ({ onOpenProjectQuote }) => {
  const { content } = useSiteContent();
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  // Active banner content (persisted in SiteContent, or fallbacks)
  const banner = content.widescreenBanner;
  const currentBannerImage = banner?.imageUrl || curvedScreenImg;
  const badgeText = banner?.badge || 'Painel curvo fine-pitch • Imersão panorâmica 160°';
  const tagText = banner?.tag || 'Engenharia visual em todos os ambientes';
  const titleText = banner?.title || 'O impacto imersivo da tela curva sob medida';
  const descriptionText =
    banner?.description ||
    'Telas curvas contínuas que abraçam a arquitetura sem emendas visíveis. Desenvolvidas com tecnologia Fine-Pitch para entregar profundidade cinematográfica e requinte absoluto em livings, espaços gourmet, home cinemas e ambientes corporativos.';
  const ctaText = banner?.ctaText || 'Consultar projeto';
  const features = banner?.features && banner.features.length >= 3
    ? banner.features
    : ['Curva contínua', '100% sem emendas', 'Raio personalizado'];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      {/* Main Container */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#090a0f] shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
        {/* Widescreen Image Wrapper */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full overflow-hidden">
          <img
            src={currentBannerImage}
            alt="Painel de LED Curvo Fine-Pitch LED Machine integrado em ambiente gourmet e living de luxo"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />

          {/* Cinematic Vignette & Bottom Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-[#04060c]/50 to-transparent opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04060c]/85 via-transparent to-[#04060c]/60 opacity-75 pointer-events-none" />

          {/* Top Bar: Floating Badge (Left) & Edit Button (Right) */}
          <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-6 right-3.5 sm:right-6 z-20 flex items-center justify-between gap-3 pointer-events-auto">
            {/* Top Floating Badge - Apple Pro Frosted Capsule */}
            <div className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 text-[11px] sm:text-xs font-medium text-white flex items-center gap-2 shadow-lg max-w-[calc(100%-140px)] sm:max-w-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{badgeText}</span>
            </div>

            {/* Direct Edit Button for Banner Text and Image */}
            <button
              id="btn-edit-widescreen-banner"
              onClick={() => setIsEditorModalOpen(true)}
              className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-xl border border-cyan-400/40 hover:border-cyan-300 text-[11px] sm:text-xs font-medium text-cyan-200 hover:text-white flex items-center gap-1.5 sm:gap-2 shadow-[0_4px_16px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all duration-200 cursor-pointer shrink-0 hover:scale-105 active:scale-95 group/btn"
              title="Clique para editar texto, destaques e imagem deste painel curvo"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:rotate-12 transition-transform" />
              <span>Editar texto e imagem</span>
            </button>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-3 sm:bottom-6 left-3.5 sm:left-8 right-3.5 sm:right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div className="max-w-2xl">
              <span className="text-[11px] sm:text-xs font-semibold text-sky-400 uppercase tracking-widest block mb-1">
                {tagText}
              </span>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug [text-wrap:balance]">
                {titleText.includes('LED Machine') ? (
                  <>
                    {titleText.replace('LED Machine', '').trim()}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 whitespace-nowrap">
                      LED Machine
                    </span>
                  </>
                ) : (
                  titleText
                )}
              </h3>
              <p className="text-[11px] sm:text-sm text-zinc-300/90 mt-1 sm:mt-1.5 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
                {descriptionText}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 mt-1 sm:mt-0">
              <div className="hidden md:flex items-center gap-4 text-xs font-medium text-zinc-200 bg-black/70 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/15 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{features[0]}</span>
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{features[1]}</span>
                </div>
                <div className="w-[1px] h-3 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{features[2]}</span>
                </div>
              </div>

              {onOpenProjectQuote && (
                <button
                  onClick={() => openButtonLink(content.buttonLinks?.widescreenBanner, onOpenProjectQuote)}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-zinc-100 text-[#090a0f] font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shrink-0 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  {ctaText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Direct Modal to Edit Banner Text and Image */}
      <WidescreenBannerEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
      />
    </section>
  );
};
