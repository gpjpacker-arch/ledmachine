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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        {content.finalCta?.badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90 backdrop-blur-md">
            {content.finalCta.badge}
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
          {content.finalCta?.title || 'Pronto para transformar seu espaço em uma experiência visual?'}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
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
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white font-semibold text-sm border border-emerald-500/40 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
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

