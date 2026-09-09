import React from 'react';
import { Building2, Home, ArrowRight } from 'lucide-react';

interface MoreThanPanelSectionProps {
  onOpenCommercial: () => void;
  onOpenResidential: () => void;
}

export const MoreThanPanelSection: React.FC<MoreThanPanelSectionProps> = ({
  onOpenCommercial,
  onOpenResidential,
}) => {
  return (
    <section
      id="mais-que-um-painel-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section Tag */}
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
          Experiência visual
        </span>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 [text-wrap:balance]">
          Não é apenas uma tela instalada. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent font-bold">
            É a transformação completa do seu espaço.
          </span>
        </h2>

        {/* Section Main Text */}
        <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <p className="max-w-2xl mx-auto">
            Um painel de LED de alta densidade redefine a escala visual e arquitetônica de qualquer ambiente, criando uma experiência imersiva e permanente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 text-left">
            {/* Commercial Card */}
            <div
              onClick={onOpenCommercial}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:shadow-xl transition-all duration-200 group cursor-pointer hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-200 mb-5">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>Para sua empresa</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Máxima visibilidade institucional, campanhas dinâmicas e diferenciação de marca em recepções, showrooms e fachadas.
              </p>
            </div>

            {/* Residential Card */}
            <div
              onClick={onOpenResidential}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:shadow-xl transition-all duration-200 group cursor-pointer hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-200 mb-5">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>Para sua residência</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cinematografia sem reflexos, pretos profundos e integração sob medida à marcenaria em livings e home theaters.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 max-w-2xl mx-auto text-center">
            <p className="text-sm sm:text-base font-medium text-white/90">
              Planejamento de engenharia, calibração profissional e assistência direta em todo o Brasil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
