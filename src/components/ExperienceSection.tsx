import React from 'react';
import {
  MessageSquareText,
  Compass,
  SlidersHorizontal,
  Wrench,
  PartyPopper,
  ShieldCheck,
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
      description: 'Conversamos sobre suas necessidades, objetivos e expectativas.',
    },
    {
      num: '02',
      icon: Compass,
      title: 'Projeto',
      description: 'Desenvolvemos a solução ideal para o seu ambiente.',
    },
    {
      num: '03',
      icon: SlidersHorizontal,
      title: 'Definição',
      description: 'Escolhemos especificações, dimensões e configurações adequadas ao projeto.',
    },
    {
      num: '04',
      icon: Wrench,
      title: 'Instalação',
      description: 'Nossa equipe realiza a instalação com cuidado e profissionalismo.',
    },
    {
      num: '05',
      icon: PartyPopper,
      title: 'Experiência',
      description: 'Você aproveita seu novo ambiente com toda a qualidade e tecnologia da LED Machine.',
    },
  ];

  return (
    <section
      id="experiencia-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-400/40 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
          <span>Atendimento de Alto Padrão</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-4">
          Do primeiro contato à instalação, uma experiência premium.
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
          <p>
            Um projeto de alto padrão merece um atendimento à altura.
          </p>
          <p>
            Na LED Machine, entendemos suas necessidades, analisamos o ambiente e desenvolvemos uma solução personalizada para que o resultado final seja exatamente aquilo que você espera — ou ainda melhor.
          </p>
          <p>
            Nosso compromisso não termina na venda. Você recebe acompanhamento profissional, instalação especializada e <strong className="text-white font-bold">2 anos de garantia</strong>, garantindo tranquilidade para aproveitar sua solução.
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
              className="relative p-6 rounded-2xl bg-[#09112d]/85 border border-blue-500/25 hover:border-blue-400/60 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(37,99,235,0.25)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-blue-400 font-mono tracking-tight">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <button
          onClick={onStartProject}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-sm transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.28)] hover:scale-105 cursor-pointer border border-white"
        >
          <span>Iniciar Meu Projeto com a LED Machine</span>
          <ArrowRight className="w-4 h-4 text-[#070c20]" />
        </button>
      </div>
    </section>
  );
};
