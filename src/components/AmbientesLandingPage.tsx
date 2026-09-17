import React from 'react';
import { LedMachineLogo } from './LedMachineLogo';
import { useSiteContent } from '../context/SiteContentContext';
import { useTheme } from '../context/ThemeContext';
import { openButtonLink } from '../utils/linkHelper';
import { Construction, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';

interface AmbientesLandingPageProps {
  onNavigateHome?: () => void;
}

export const AmbientesLandingPage: React.FC<AmbientesLandingPageProps> = ({ onNavigateHome }) => {
  const { content } = useSiteContent();
  const { isLight, toggleTheme } = useTheme();

  const whatsappNumber = content.general.whatsappNumber || '5519999107788';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de consultar os projetos e ambientes desenvolvidos pela LED Machine.'
  )}`;

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between selection:bg-blue-500 selection:text-white transition-colors duration-300 ${
      isLight ? 'bg-white text-[#1d1d1f]' : 'bg-[#05060b] text-white'
    }`}>
      {/* Header */}
      <header className={`w-full border-b backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-4 transition-colors ${
        isLight ? 'border-[#e5e5ea] bg-white/80' : 'border-white/[0.08] bg-[#05060b]/80'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <LedMachineLogo size="md" />
          </div>

          <div className="flex items-center gap-3">
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                  isLight
                    ? 'border-[#e5e5ea] bg-[#f5f5f7] hover:bg-[#ebebee] text-[#1d1d1f]'
                    : 'border-white/10 hover:bg-white/5 text-white'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar ao início</span>
              </button>
            )}

            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black tracking-tight transition-all duration-300 cursor-pointer shadow-sm select-none ${
                isLight
                  ? 'bg-[#f5f5f7] hover:bg-[#ebebee] text-[#1d1d1f] border border-[#d2d2d7]'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
              title={isLight ? 'Modo Claro (W)' : 'Modo Escuro (D)'}
              aria-label="Alternar tema"
            >
              {isLight ? 'W' : 'D'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
          isLight ? 'bg-[#f5f5f7] border border-[#e5e5ea] text-[#1d1d1f]' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
        }`}>
          <Construction className="w-8 h-8" />
        </div>

        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${
          isLight ? 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e5e5ea]' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Em Breve</span>
        </div>

        <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 ${isLight ? 'text-[#1d1d1f]' : 'text-white'}`}>
          Galeria Exclusiva de Ambientes
        </h1>

        <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-md ${isLight ? 'text-[#6e6e73]' : 'text-zinc-400'}`}>
          Esta página está sendo preparada com tour fotográfico e especificações completas de salas de cinema residenciais, lounges corporativos e fachadas monumentais.
        </p>

        <button
          onClick={() => openButtonLink(whatsappUrl)}
          className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Consultar Projetos no WhatsApp</span>
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.08] py-6 px-4 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Led Machine Painéis</p>
      </footer>
    </div>
  );
};
