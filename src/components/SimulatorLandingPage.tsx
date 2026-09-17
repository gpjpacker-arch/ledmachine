import React from 'react';
import { LedMachineLogo } from './LedMachineLogo';
import { SimulatorSection } from './SimulatorSection';
import { useSiteContent } from '../context/SiteContentContext';
import { useTheme } from '../context/ThemeContext';
import { openButtonLink } from '../utils/linkHelper';
import { MessageCircle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface SimulatorLandingPageProps {
  onOpenContactWithSpecs: (specsText: string) => void;
  onNavigateHome?: () => void;
}

export const SimulatorLandingPage: React.FC<SimulatorLandingPageProps> = ({
  onOpenContactWithSpecs,
}) => {
  const { content } = useSiteContent();
  const { isLight, toggleTheme } = useTheme();

  const whatsappNumber = content.general.whatsappNumber || '5519999107788';

  const handleDirectWhatsapp = (specsText: string) => {
    const defaultMsg = 'Olá! Utilizei o simulador da LED Machine e gostaria de receber um orçamento formal com base nas medidas calculadas:';
    const finalMsg = `${defaultMsg}\n\n${specsText}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;
    openButtonLink(url);
  };

  const handleGeneralWhatsapp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      'Olá! Gostaria de conversar com um especialista da LED Machine sobre dimensionamento de painel de LED.'
    )}`;
    openButtonLink(url);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between selection:bg-blue-500 selection:text-white transition-colors duration-300 ${
      isLight ? 'bg-white text-[#1d1d1f]' : 'bg-[#030712] text-white'
    }`}>
      {/* 1. Header Minimalista */}
      <header className={`w-full border-b backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-4 transition-colors ${
        isLight ? 'border-[#e5e5ea] bg-white/80' : 'border-white/[0.08] bg-[#030712]/80'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <LedMachineLogo size="md" />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleGeneralWhatsapp}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isLight
                  ? 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e5e5ea] hover:bg-[#ebebee]'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Dúvidas? Fale no WhatsApp</span>
            </button>

            {/* Alternador de tema D/W */}
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black tracking-tight transition-all duration-300 cursor-pointer shadow-sm select-none ${
                isLight
                  ? 'bg-[#f5f5f7] hover:bg-[#ebebee] text-[#1d1d1f] border border-[#d2d2d7]'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
              title={isLight ? 'Modo Claro (W) - Alternar para Escuro (D)' : 'Modo Escuro (D) - Alternar para Claro (W)'}
              aria-label="Alternar tema"
            >
              {isLight ? 'W' : 'D'}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Simulador Interativo Completo com Botão WhatsApp Direto */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <SimulatorSection
          onRequestQuoteWithSpecs={onOpenContactWithSpecs}
          onDirectWhatsapp={handleDirectWhatsapp}
        />

        {/* Bloco Adicional de Contato Imediato via WhatsApp */}
        <div className={`mt-8 mb-4 max-w-2xl mx-auto text-center p-6 rounded-2xl border ${
          isLight
            ? 'bg-[#f5f5f7] border-[#e5e5ea]'
            : 'bg-white/[0.03] border-white/10'
        }`}>
          <h3 className="text-base sm:text-lg font-bold mb-2 text-[#1d1d1f]">
            Precisa de um projeto sob medida para espaço curvo, vitrine ou fachada?
          </h3>
          <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${isLight ? 'text-[#6e6e73]' : 'text-zinc-400'}`}>
            Nossos especialistas desenham a modulação exata em CAD milimétrico para o seu espaço.
          </p>
          <button
            onClick={handleGeneralWhatsapp}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chamar Especialista Técnico no WhatsApp</span>
          </button>
        </div>
      </main>

      {/* 3. Rodapé */}
      <footer className="w-full border-t border-white/[0.08] py-6 px-4 text-center text-xs text-zinc-500">
        <p>
          © {new Date().getFullYear()} Led Machine Painéis • Simulador de Painéis de LED
        </p>
      </footer>
    </div>
  );
};
