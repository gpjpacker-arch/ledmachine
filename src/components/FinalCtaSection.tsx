import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface FinalCtaSectionProps {
  onRequestProject: () => void;
  onTalkSpecialist: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onRequestProject,
  onTalkSpecialist,
}) => {
  return (
    <section
      id="final-cta-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center overflow-hidden"
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[300px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
          Está pronto para elevar o nível do seu espaço?
        </h2>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal max-w-2xl mx-auto">
          Seja para transformar a presença da sua marca ou criar uma experiência única dentro da sua casa, a <strong className="text-white font-semibold">LED Machine</strong> tem a tecnologia e a experiência para transformar sua ideia em realidade.
        </p>

        <p className="text-blue-300 font-semibold text-lg sm:text-xl">
          Conte-nos o que você deseja criar.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-cta-request-project"
            onClick={onRequestProject}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-base shadow-[0_4px_25px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.28)] border border-white transition-all hover:scale-105 inline-flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Solicitar meu projeto</span>
            <ArrowRight className="w-5 h-5 text-[#070c20]" />
          </button>

          <button
            id="final-cta-talk-specialist"
            onClick={onTalkSpecialist}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 transition-all inline-flex items-center justify-center gap-3 cursor-pointer backdrop-blur-md"
          >
            <MessageSquare className="w-5 h-5 text-white/80" />
            <span>Falar com um especialista</span>
          </button>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-blue-300/80 font-medium tracking-wide">
          <span className="font-bold text-white">LED Machine Painéis</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>Tecnologia que transforma espaços em experiências.</span>
        </div>
      </div>
    </section>
  );
};

