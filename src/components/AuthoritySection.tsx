import React from 'react';
import { Layers, Quote } from 'lucide-react';

export const AuthoritySection: React.FC = () => {
  return (
    <section
      id="autoridade-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/10 text-center"
    >
      <div className="relative p-8 sm:p-12 md:p-14 rounded-3xl bg-[#09112d]/90 border border-blue-500/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-950/80 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Quote className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2]">
            Tecnologia que valoriza o que realmente importa.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl mx-auto font-normal">
            <p>
              Na LED Machine, acreditamos que a tecnologia deve servir para valorizar momentos, marcas e espaços.
            </p>
            <p>
              Não criamos soluções apenas para preencher paredes ou fachadas. Criamos soluções para chamar atenção, gerar emoção, valorizar negócios e transformar a forma como as pessoas interagem com o ambiente.
            </p>
            <p className="text-blue-200 font-medium">
              Seja para destacar sua empresa no mercado ou criar um espaço extraordinário na sua casa, estamos prontos para entregar a melhor solução em painéis de LED.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
