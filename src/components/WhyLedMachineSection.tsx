import React from 'react';
import {
  Eye,
  Award,
  Volume2,
  ShieldCheck,
  Sliders,
  Wrench,
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
      description: 'Painéis desenvolvidos para entregar excelente qualidade visual, brilho, contraste e definição, valorizando cada conteúdo exibido.',
      badge: 'Contraste & Brilho',
    },
    {
      id: 2,
      icon: Award,
      tag: 'Acabamento Premium',
      title: 'Seu ambiente merece excelência',
      description: 'Cada detalhe importa. Trabalhamos para que o painel seja integrado ao espaço de forma elegante, moderna e sofisticada.',
      badge: 'Design Slim & Elegante',
    },
    {
      id: 3,
      icon: Volume2,
      tag: 'Plug & Play Completo',
      title: 'Sistema e som integrados',
      description: 'Painel 100% pronto para uso, unindo sistema operacional intuitivo, áudio de alta fidelidade e conectividade descomplicada.',
      badge: 'Pronto para Usar',
    },
    {
      id: 4,
      icon: ShieldCheck,
      tag: '2 Anos de Garantia',
      title: 'Seu investimento protegido',
      description: 'Você conta com 2 anos de garantia total, assegurando a tranquilidade, o suporte e a segurança de um investimento seguro.',
      badge: 'Garantia Total',
    },
    {
      id: 5,
      icon: Sliders,
      tag: 'Projeto Personalizado',
      title: 'Feito para o seu espaço',
      description: 'Desenvolvemos soluções sob medida de acordo com as dimensões do ambiente, objetivo técnico e experiência desejada.',
      badge: '100% Sob Medida',
    },
    {
      id: 6,
      icon: Wrench,
      tag: 'Instalação Profissional',
      title: 'Do projeto à instalação',
      description: 'Cuidamos de todas as etapas técnicas para garantir máxima precisão, segurança e um resultado final impecável.',
      badge: 'Engenharia Especializada',
    },
  ];

  return (
    <section id="diferenciais-section" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Tecnologia que você percebe.{' '}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            Qualidade que você sente.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Unimos engenharia avançada, estética de alto padrão e garantia estendida para entregar a melhor experiência visual do mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {blocks.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              id={`why-block-${t.id}`}
              onClick={() => onSelectBlock && onSelectBlock(t.title)}
              className="group relative p-8 rounded-3xl bg-white/[0.035] hover:bg-white/[0.065] border border-white/10 hover:border-white/20 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_45px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_25px_55px_rgba(0,0,0,0.75)] transition-all duration-300 flex flex-col justify-between h-full min-h-[300px] cursor-pointer hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-6 h-12">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.08] group-hover:bg-white/[0.14] border border-white/15 group-hover:border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]">
                    <Icon className="w-5 h-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
                  </div>
                  <span className="text-[11px] font-medium tracking-wide px-3.5 py-1.5 rounded-full bg-white/[0.06] group-hover:bg-white/[0.12] border border-white/15 group-hover:border-white/25 text-white/90 group-hover:text-white backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-all duration-200 whitespace-nowrap">
                    {t.badge}
                  </span>
                </div>
                <div className="text-xs font-semibold text-sky-400 tracking-wider uppercase mb-1.5">
                  {t.tag}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight min-h-[3.25rem] flex items-center">
                  {t.title}
                </h3>
                <p className="text-sm text-zinc-300/80 leading-relaxed mt-auto">
                  {t.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
