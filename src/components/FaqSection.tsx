import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqSectionProps {
  onContactClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const faqs = [
    {
      q: 'Os painéis podem ser feitos sob medida para o meu espaço?',
      a: 'Sim. Cada projeto da LED Machine é planejado de forma personalizada, levando em consideração as dimensões, o tipo de ambiente (interno ou externo) e o objetivo do cliente.',
    },
    {
      q: 'Qual a diferença entre painel para empresa e painel residencial?',
      a: 'Os painéis comerciais costumam priorizar maior visibilidade, brilho para ambientes externos ou fachadas e formatos que valorizem a comunicação visual da marca. Já os residenciais são pensados para oferecer alto nível de detalhe, fidelidade de cores, conforto visual e integração estética com a decoração da casa.',
    },
    {
      q: 'Como funciona o processo de instalação?',
      a: 'Nossa equipe cuida de todas as etapas necessárias para que o painel seja instalado com segurança, alinhamento perfeito e funcionamento correto, garantindo um resultado final impecável.',
    },
    {
      q: 'Qual a garantia dos painéis?',
      a: 'Todos os painéis da LED Machine possuem 2 anos de garantia, assegurando tranquilidade e proteção para o seu investimento.',
    },
    {
      q: 'É difícil controlar o conteúdo exibido no painel?',
      a: 'Não. O sistema de controle é simples, intuitivo e moderno. Você pode atualizar e programar seus conteúdos de forma prática pelo computador ou celular, dependendo da configuração escolhida para o seu projeto.',
    },
    {
      q: 'Painel de LED consome muita energia?',
      a: 'A tecnologia LED utilizada pela LED Machine é eficiente e moderna, oferecendo alto brilho com consumo otimizado de energia em comparação com outras tecnologias tradicionais de iluminação e projeção.',
    },
    {
      q: 'Como solicitar um orçamento ou projeto?',
      a: 'Basta clicar no botão de contato no site e falar com nossa equipe. Entenderemos suas necessidades e apresentaremos a melhor solução para o seu ambiente.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/10"
    >
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-400/40 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
          <HelpCircle className="w-3.5 h-3.5 text-blue-300" />
          <span>Perguntas Frequentes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-4">
          Tire suas dúvidas
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
          Tudo o que você precisa saber para planejar seu projeto de painel de LED com segurança e clareza.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#0b163d]/90 border-blue-400/50 shadow-[0_10px_30px_rgba(37,99,235,0.25)]'
                  : 'bg-[#09112d]/70 border-white/10 hover:border-blue-400/30'
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                    isOpen
                      ? 'rotate-180 bg-blue-600/30 border-blue-400/50 text-blue-200'
                      : 'bg-white/5 border-white/10 text-white/60'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-white/80 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center p-6 rounded-2xl bg-[#09112d]/80 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="text-left">
          <h4 className="text-base font-bold text-white">Ficou com alguma dúvida específica?</h4>
          <p className="text-xs sm:text-sm text-white/70">Nossos engenheiros e consultores visuais estão à disposição.</p>
        </div>
        <button
          onClick={onContactClick}
          className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.28)] border border-white transition-all hover:scale-105 cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-[#070c20]" />
          <span>Falar com a Equipe</span>
        </button>
      </div>
    </section>
  );
};
