import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

interface FaqSectionProps {
  onContactClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const faqs = [
    {
      q: 'Os painéis podem ser feitos sob medida para o meu espaço?',
      a: 'Sim. Cada projeto da LED Machine é planejado de forma personalizada, calculando milimetricamente as dimensões, proporção de aspecto (16:9, ultrawide ou livre), tipo de ambiente (interno ou externo) e distância ideal de visualização.',
    },
    {
      q: 'Qual a diferença entre painel para empresa e painel residencial?',
      a: 'Os painéis corporativos priorizam visibilidade ampla, brilho adaptável a fachadas e vitrines sob sol e operação contínua 24/7. Os residenciais são calibrados para cinematografia (HDR, fine-pitch P1.2 a P1.8), fidelidade cromática, zero ruído de ventilação e integração milimétrica à marcenaria.',
    },
    {
      q: 'Como funciona o processo de instalação?',
      a: 'Nossa equipe técnica cuida de todo o alinhamento de engenharia: avaliação da carga estrutural da parede, fiação elétrica dedicada, fixação dos gabinetes magnéticos, acoplamento óptico e calibração de cor módulo por módulo.',
    },
    {
      q: 'Qual a garantia dos painéis?',
      a: 'Todos os painéis da LED Machine possuem 2 anos de garantia integral de fábrica, acompanhados de estoque técnico de módulos sobressalentes para reposição imediata se necessário.',
    },
    {
      q: 'É difícil controlar o conteúdo exibido no painel?',
      a: 'Não. O sistema de controle é intuitivo. É possível conectar receptores como Apple TV, consoles de videogame, computadores ou controladores de automação residencial (Control4, Crestron, Savant) via HDMI ou rede sem complicação.',
    },
    {
      q: 'Painel de LED consome muita energia?',
      a: 'A tecnologia LED da LED Machine utiliza diodos de alta eficiência energética e fontes PFC ativas, consumindo significativamente menos energia que projetores potentes e mantendo dissipação térmica passiva.',
    },
    {
      q: 'Como solicitar um orçamento ou projeto?',
      a: 'Basta acionar nossos canais diretos de contato. Nossa equipe de engenharia avaliará as plantas ou fotos do seu espaço e apresentará um projeto 3D com especificação técnica completa.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.08]"
    >
      <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
          Perguntas Frequentes
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-4 [text-wrap:balance]">
          Tire suas dúvidas{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
            técnicas e de projeto
          </span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto font-normal">
          Tudo o que você precisa saber para planejar seu projeto de painel de LED com segurança e clareza.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#10121a] border-white/20'
                  : 'bg-[#10121a]/60 border-white/[0.08] hover:border-white/15'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                    isOpen
                      ? 'rotate-180 bg-white/10 border-white/20 text-white'
                      : 'bg-white/[0.02] border-white/10 text-zinc-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-400 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center p-6 sm:p-8 rounded-2xl bg-[#10121a] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-base font-bold text-white">Ficou com alguma dúvida sobre o seu projeto?</h4>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">Engenheiros e consultores técnicos à disposição para orientar.</p>
        </div>
        <button
          onClick={onContactClick}
          className="px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-[#090a0f] font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-[#090a0f]" />
          <span>Falar com a Equipe</span>
        </button>
      </div>
    </section>
  );
};
