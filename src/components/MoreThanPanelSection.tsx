import React from 'react';
import { Building2, Home, ArrowRight, ShieldCheck } from 'lucide-react';

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
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 overflow-hidden"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-400/40 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
          <span>Experiência Visual Transformadora</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-6">
          Não é apenas uma tela. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300">
            É uma nova experiência.
          </span>
        </h2>

        {/* Section Main Text */}
        <div className="space-y-6 text-sm sm:text-base text-white/80 leading-relaxed font-normal text-balance">
          <p>
            Um painel de LED transforma a maneira como as pessoas percebem um ambiente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 text-left">
            {/* Commercial Card */}
            <div
              onClick={onOpenCommercial}
              className="p-7 rounded-2xl bg-[#09112d]/85 border border-blue-500/25 hover:border-blue-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer shadow-lg hover:shadow-[0_10px_35px_rgba(37,99,235,0.25)]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center justify-between">
                <span>Para sua Empresa</span>
                <ArrowRight className="w-4 h-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Significa mais visibilidade, mais presença de marca e novas possibilidades para comunicar, destacar produtos e atrair clientes.
              </p>
            </div>

            {/* Residential Card */}
            <div
              onClick={onOpenResidential}
              className="p-7 rounded-2xl bg-[#09112d]/85 border border-blue-500/25 hover:border-blue-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer shadow-lg hover:shadow-[0_10px_35px_rgba(37,99,235,0.25)]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center justify-between">
                <span>Para sua Residência</span>
                <ArrowRight className="w-4 h-4 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Significa transformar espaços comuns em ambientes sofisticados, modernos, acolhedores e envolventes.
              </p>
            </div>
          </div>

          <p className="pt-2">
            Na LED Machine, cada projeto é pensado para entregar muito mais do que uma imagem de alta definição.
          </p>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-blue-950/50 border border-blue-500/40 max-w-2xl mx-auto text-center shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <p className="text-base sm:text-lg font-medium text-white tracking-wide">
              Entregamos <strong className="text-blue-200 font-bold">impacto, estética, tecnologia e uma experiência premium</strong> do início ao fim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
