import React from 'react';
import { Quote } from 'lucide-react';

export const AuthoritySection: React.FC = () => {
  return (
    <section
      id="autoridade-section"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/[0.08] text-center"
    >
      <div className="relative p-8 sm:p-12 md:p-14 rounded-2xl bg-[#0c1322] border border-slate-800 text-left sm:text-center shadow-xl">
        <div className="space-y-6">
          <div className="w-10 h-10 sm:mx-auto rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Quote className="w-4 h-4" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2] [text-wrap:balance]">
            Tecnologia que valoriza{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              o que realmente importa.
            </span>
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            <p>
              Na LED Machine, acreditamos que a tecnologia visual deve servir para valorizar momentos, marcas e espaços de convivência.
            </p>
            <p>
              Não criamos soluções apenas para cobrir paredes ou fachadas. Desenvolvemos projetos sob medida para gerar impacto visual contínuo, credibilidade de marca e integração arquitetônica de alto padrão.
            </p>
            <p className="text-blue-200 font-medium">
              Seja para destacar sua empresa com máxima visibilidade ou criar um cinema privativo imersivo, entregamos o projeto completo com 2 anos de garantia de fábrica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

