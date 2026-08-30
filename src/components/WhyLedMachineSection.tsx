import React from 'react';
import {
  Eye,
  Award,
  ShieldCheck,
  Sliders,
  Wrench,
  Volume2
} from 'lucide-react';

interface WhyLedMachineSectionProps {
  onSelectBlock?: (blockTitle: string) => void;
}

export const WhyLedMachineSection: React.FC<WhyLedMachineSectionProps> = ({ onSelectBlock }) => {
  const blocks = [
    {
      id: 1,
      icon: Eye,
      tag: 'Alta Qualidade',
      title: 'Imagem impressionante',
      description:
        'Painéis desenvolvidos para entregar excelente qualidade visual, brilho, contraste e definição, valorizando cada conteúdo exibido.',
      badge: 'Contraste & Brilho',
    },
    {
      id: 2,
      icon: Award,
      tag: 'Acabamento Premium',
      title: 'Seu ambiente merece excelência',
      description:
        'Cada detalhe importa. Trabalhamos para que o painel seja integrado ao espaço de forma elegante, moderna e sofisticada.',
      badge: 'Design Slim & Elegante',
    },
    {
      id: 3,
      icon: Volume2,
      tag: 'Plug & Play Completo',
      title: 'Sistema e som integrados',
      description:
        'Painel 100% pronto para uso, unindo sistema operacional intuitivo, áudio de alta fidelidade e conectividade descomplicada.',
      badge: 'Pronto para Usar',
    },
    {
      id: 4,
      icon: ShieldCheck,
      tag: '2 Anos de Garantia',
      title: 'Seu investimento protegido',
      description:
        'Você conta com 2 anos de garantia total, assegurando a tranquilidade, o suporte e a segurança de um investimento seguro.',
      badge: 'Garantia Total',
    },
    {
      id: 5,
      icon: Sliders,
      tag: 'Projeto Personalizado',
      title: 'Feito para o seu espaço',
      description:
        'Desenvolvemos soluções sob medida de acordo com as dimensões do ambiente, objetivo técnico e experiência desejada.',
      badge: '100% Sob Medida',
    },
    {
      id: 6,
      icon: Wrench,
      tag: 'Instalação Profissional',
      title: 'Do projeto à instalação',
      description:
        'Cuidamos de todas as etapas técnicas para garantir máxima precisão, segurança e um resultado final impecável.',
      badge: 'Engenharia Especializada',
    },
  ];

  return (
    <section
      id="diferenciais-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Tecnologia que você percebe. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">
            Qualidade que você sente.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
          Unimos engenharia avançada, estética de alto padrão e garantia estendida para entregar a melhor experiência visual do mercado.
        </p>
      </div>

      {/* Grid of 6 blocks with unified size, glow and structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {blocks.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              id={`why-block-${b.id}`}
              onClick={() => onSelectBlock && onSelectBlock(b.title)}
              className="group relative p-8 rounded-3xl bg-gradient-to-b from-[#0a1438]/95 to-[#060c24]/95 border border-blue-500/30 hover:border-blue-400/70 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(37,99,235,0.15)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(37,99,235,0.35)] transition-all duration-300 flex flex-col justify-between h-full min-h-[300px] cursor-pointer hover:-translate-y-1"
            >
              {/* Subtle top inner glow highlight */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col h-full">
                {/* Header row: Icon + Badge */}
                <div className="flex items-center justify-between mb-6 h-13">
                  <div className="w-13 h-13 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-blue-300 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-blue-950/50 border border-blue-400/20 text-blue-200/90 whitespace-nowrap">
                    {b.badge}
                  </span>
                </div>

                {/* Category Tag */}
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5">
                  {b.tag}
                </div>

                {/* Title with standardized height */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight min-h-[3.25rem] flex items-center">
                  {b.title}
                </h3>

                {/* Description text */}
                <p className="text-sm text-white/75 leading-relaxed mt-auto">
                  {b.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
