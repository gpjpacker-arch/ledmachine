import React from 'react';

interface WarrantySectionProps {
  onOpenSpecialist?: () => void;
}

export const WarrantySection: React.FC<WarrantySectionProps> = ({ onOpenSpecialist }) => {
  return (
    <section
      id="garantia-section"
      className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Soft background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-72 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-14 text-center md:text-left">
        {/* Luxury Architectural Circular Seal */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_15px_40px_rgba(0,0,0,0.7)] group transition-transform duration-300 hover:scale-105">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#151e3f] via-[#0d142e] to-[#060a1a] flex flex-col items-center justify-center text-white select-none border border-white/10 relative overflow-hidden">
              {/* Subtle top light refraction */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-12 bg-white/10 rounded-full blur-md pointer-events-none" />
              
              <span className="text-4xl sm:text-5xl font-black leading-none tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                2
              </span>
              <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.18em] text-center leading-tight mt-2 text-white/90">
                ANOS DE<br />
                <span className="text-blue-300/90 font-extrabold tracking-widest text-[9.5px]">GARANTIA</span>
              </span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 max-w-xl space-y-3.5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2]">
            Qualidade para hoje.<br />
            Confiança para os próximos anos.
          </h2>

          <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">
            Quando você investe em um produto premium, precisa ter segurança de que está fazendo a escolha certa. Por isso, todos os projetos contam com <strong className="text-white font-semibold">2 anos de garantia</strong>.
          </p>

          <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">
            Porque qualidade não é apenas aquilo que você vê na primeira vez que liga o painel. É a tranquilidade de saber que existe uma empresa por trás do seu investimento.
          </p>
        </div>
      </div>
    </section>
  );
};

