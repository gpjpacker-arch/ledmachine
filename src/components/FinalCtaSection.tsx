import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { openButtonLink } from '../utils/linkHelper';

interface FinalCtaSectionProps {
  onRequestProject: () => void;
  onTalkSpecialist: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onRequestProject,
  onTalkSpecialist,
}) => {
  const { content } = useSiteContent();

  const defaultWhatsapp =
    'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.';

  return (
    <section id="final-cta-section" className="relative w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-white/[0.02] rounded-full blur-[130px] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        {content.finalCta?.badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90 backdrop-blur-md">
            {content.finalCta.badge}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.2] [text-wrap:balance]">
          {(() => {
            const rawTitle = content.finalCta?.title || 'Pronto para transformar seu espaço em uma experiência visual?';
            if (rawTitle.includes('transformar seu espaço')) {
              const before = 'Pronto para transformar seu espaço';
              const rest = rawTitle.replace(/.*?transformar seu espaço/i, '').trim();
              const isHighlight = rest.includes('experiência visual');
              const restPrefix = isHighlight ? rest.replace(/experiência visual\??/i, '').trim() : '';

              return (
                <>
                  {before} <br className="hidden sm:inline" />
                  {restPrefix ? `${restPrefix} ` : ''}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 whitespace-nowrap">
                    {isHighlight ? 'experiência visual?' : rest}
                  </span>
                </>
              );
            }
            return rawTitle;
          })()}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto [text-wrap:balance]">
          {content.finalCta?.subtitle || 'Seja para destacar sua empresa ou criar um ambiente incrível na sua residência, a LED Machine desenvolve o projeto ideal para você.'}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="final-cta-request-project"
            onClick={() => openButtonLink(content.buttonLinks?.finalCtaPrimary, onRequestProject)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-sm transition-all shadow-[0_4px_25px_rgba(255,255,255,0.22)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.32)] border border-white inline-flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>{content.finalCta?.btnPrimary || 'Solicitar projeto sob medida'}</span>
            <ArrowRight className="w-4 h-4 text-[#070c20]" />
          </button>

          <button
            id="final-cta-whatsapp-specialist"
            onClick={() =>
              openButtonLink(
                content.buttonLinks?.finalCtaWhatsapp || defaultWhatsapp,
                onTalkSpecialist
              )
            }
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-sm border border-white/15 hover:border-white/30 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 text-zinc-300" />
            <span>{content.finalCta?.btnSecondary || 'Falar com especialista no WhatsApp'}</span>
          </button>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-white/50">
          <span>LED Machine Painéis</span>
          <span className="hidden sm:inline">•</span>
          <span>Tecnologia que transforma espaços em experiências.</span>
        </div>
      </div>
    </section>
  );
};

