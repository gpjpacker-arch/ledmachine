import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { useTheme } from '../context/ThemeContext';

interface WarrantySectionProps {
  onOpenSpecialist?: () => void;
}

export const WarrantySection: React.FC<WarrantySectionProps> = () => {
  const { content } = useSiteContent();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const warranty = content.warranty;

  const badgeText = warranty?.badge || '2 anos de garantia';
  const titleText = warranty?.title || 'Qualidade para hoje.\nConfiança para os próximos anos.';
  const p1Text = warranty?.p1 || warranty?.description || 'Quando você investe em um produto premium, precisa ter segurança de que está fazendo a escolha certa. Por isso, todos os projetos contam com 2 anos de garantia.';
  const p2Text = warranty?.p2 || 'Porque qualidade não é apenas aquilo que você vê na primeira vez que liga o painel. É a tranquilidade de saber que existe uma empresa por trás do seu investimento.';

  return (
    <section id="garantia-section" className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-72 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-14 text-center md:text-left">
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_15px_40px_rgba(0,0,0,0.7)] group transition-transform duration-300 hover:scale-105">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#181c28] via-[#0e121d] to-[#080b12] flex flex-col items-center justify-center text-white select-none border border-white/10 relative overflow-hidden p-3">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-12 bg-white/10 rounded-full blur-md pointer-events-none" />
              <span className="text-3xl sm:text-4xl font-black leading-none tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                2
              </span>
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-normal text-center leading-tight mt-2 text-white/90">
                {/anos/i.test(badgeText) ? (
                  <>
                    <span>anos de</span>
                    <br />
                    <span className="text-zinc-300 font-bold tracking-normal text-[10.5px]">
                      garantia
                    </span>
                  </>
                ) : (
                  badgeText
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl space-y-3.5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2] [text-wrap:balance]">
            {titleText.includes('\n') ? (
              <>
                {titleText.split('\n')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                  {titleText.split('\n').slice(1).join(' ')}
                </span>
              </>
            ) : (
              titleText
            )}
          </h2>
          <p className={`text-sm sm:text-[15px] leading-relaxed font-normal ${
            isLight ? 'text-[#3a3a3c]' : 'text-white/70'
          }`}>
            {p1Text}
          </p>
          {p2Text && (
            <p className={`text-sm sm:text-[15px] leading-relaxed font-normal ${
              isLight ? 'text-[#3a3a3c]' : 'text-white/70'
            }`}>
              {p2Text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
