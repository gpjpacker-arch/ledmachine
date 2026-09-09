import React from 'react';
import {
  MessageSquareText,
  Compass,
  SlidersHorizontal,
  Wrench,
  PartyPopper,
  ArrowRight
} from 'lucide-react';

interface ExperienceSectionProps {
  onStartProject: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onStartProject }) => {
  const steps = [
    {
      num: '01',
      icon: MessageSquareText,
      title: 'Entendimento',
      description: 'Mapeamento técnico detalhado das necessidades, escala do espaço e expectativas visuais.',
    },
    {
      num: '02',
      icon: Compass,
      title: 'Projeto',
      description: 'Engenharia de precisão com cálculo de distância de visualização, pixel pitch e fixação.',
    },
    {
      num: '03',
      icon: SlidersHorizontal,
      title: 'Definição',
      description: 'Definição de especificações, resolução nativa, processamento de vídeo e integração de controle.',
    },
    {
      num: '04',
      icon: Wrench,
      title: 'Instalação',
      description: 'Montagem estrutural, acoplamento milimétrico e calibração por engenharia especializada.',
    },
    {
      num: '05',
      icon: PartyPopper,
      title: 'Entrega técnica',
      description: 'Comissionamento final, treinamento operacional e ativação da garantia de 2 anos.',
    },
  ];

  return (
    <section
      id="experiencia-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-3">
          Processo de engenharia
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-4">
          Da primeira consulta à entrega técnica, uma jornada precisa.
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
          <p>
            Um projeto sob medida de LED exige planejamento rigoroso de engenharia civil, elétrica e ótica.
          </p>
          <p>
            Analisamos o ambiente in loco, calculamos a incidência de luz natural e desenvolvemos uma solução personalizada para que a entrega exceda os padrões técnicos e estéticos.
          </p>
        </div>
      </div>

      {/* Process Cards 01 to 05 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.065] border border-white/10 hover:border-white/20 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white/30 font-mono tracking-tight group-hover:text-white/70 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/[0.08] group-hover:bg-white/[0.14] border border-white/15 group-hover:border-white/30 flex items-center justify-center text-white transition-all duration-200 group-hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300/80 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onStartProject}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-zinc-100 text-[#090a0f] font-semibold text-sm transition-all duration-200 cursor-pointer"
        >
          <span>Iniciar consulta técnica do meu projeto</span>
          <ArrowRight className="w-4 h-4 text-[#090a0f]" />
        </button>
      </div>
    </section>
  );
};
