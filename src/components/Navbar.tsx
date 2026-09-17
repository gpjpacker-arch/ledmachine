import React, { useState } from 'react';
import { LedMachineLogo } from './LedMachineLogo';
import { LayoutGrid, X, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { useTheme } from '../context/ThemeContext';
import { openButtonLink } from '../utils/linkHelper';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenSimulator: () => void;
  onNavigateCatalog?: (category?: 'indoor' | 'outdoor' | 'rental') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenContact,
  onOpenSimulator,
  onNavigateCatalog,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { content } = useSiteContent();
  const { theme, toggleTheme, isLight } = useTheme();

  const navItems = content.navbar.navLinks || [
    { id: 'home', label: 'Início' },
    { id: 'diferenciais', label: 'Diferenciais' },
    { id: 'solucoes', label: 'Soluções' },
    { id: 'garantia', label: '2 anos de garantia' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-header"
      className="absolute top-0 left-0 right-0 z-40 w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-5 sm:pt-7 pb-4 pointer-events-auto"
    >
      <nav
        className={`flex items-center justify-between py-2.5 px-3 sm:px-5 rounded-2xl transition-colors duration-300 backdrop-blur-md ${
          isLight
            ? 'bg-white/70 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'bg-black/20 border border-white/[0.06] shadow-none'
        }`}
      >
        {/* Brand Logo (Official LED Machine Logo) */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer group"
        >
          <LedMachineLogo size="md" />
        </div>

        {/* Center / Right Links: Theme Switcher | Contact | Menu ☷ */}
        <div className="flex items-center space-x-2.5 sm:space-x-5">
          {/* Theme Toggle Button: 'D' no escuro e 'W' no claro */}
          <button
            id="nav-theme-toggle-btn"
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black tracking-tight transition-all duration-300 cursor-pointer shadow-sm select-none ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
            title={isLight ? 'Modo Claro (W) - Clique para alternar para Escuro (D)' : 'Modo Escuro (D) - Clique para alternar para Claro (W)'}
            aria-label={isLight ? 'Modo Claro (W) - Alternar para Escuro' : 'Modo Escuro (D) - Alternar para Claro'}
          >
            {isLight ? 'W' : 'D'}
          </button>

          {/* Contact Link */}
          <button
            id="nav-contact-link"
            onClick={() => openButtonLink(content.buttonLinks?.navbarContact, onOpenContact)}
            className={`text-sm font-medium transition-colors cursor-pointer px-2 py-1 rounded-lg ${
              isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                : 'text-white/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Contato
          </button>

          {/* Catálogo Link (no menu da direita) */}
          <button
            id="nav-catalog-direct-link"
            onClick={() => {
              if (onNavigateCatalog) {
                onNavigateCatalog();
              } else if (window.history && window.history.pushState) {
                window.history.pushState({}, '', '/catalogo');
                window.dispatchEvent(new PopStateEvent('popstate'));
              } else {
                window.location.href = '/catalogo';
              }
            }}
            className={`text-sm font-medium transition-colors cursor-pointer px-2.5 py-1 rounded-lg ${
              isLight
                ? 'text-slate-800 hover:text-blue-600 hover:bg-slate-100/80'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            Catálogo
          </button>

          {/* Vertical Divider Line */}
          <span className={`h-4 w-[1px] ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />

          {/* Menu Button with 4-dots grid icon */}
          <button
            id="nav-menu-toggle-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer group px-2 py-1 rounded-lg ${
              isLight
                ? 'text-slate-800 hover:text-slate-950 hover:bg-slate-100/80'
                : 'text-white/80 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Abrir menu"
          >
            <span>Menu</span>
            <LayoutGrid
              className={`w-4 h-4 transition-colors ${
                isLight ? 'text-slate-800 group-hover:text-slate-950' : 'text-white/80 group-hover:text-white'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Floating Menu Drawer / Overlay when Menu is clicked */}
      {menuOpen && (
        <div
          id="nav-expanded-menu"
          className={`absolute top-20 right-4 sm:right-8 lg:right-12 z-50 w-72 p-5 rounded-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 ${
            isLight
              ? 'bg-white/95 border border-slate-200 text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
              : 'bg-[#090b1c]/95 border border-white/20 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between pb-3 border-b mb-3 ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-slate-500' : 'text-white/60'
              }`}
            >
              Navegação
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className={`p-1 rounded-lg transition-colors ${
                isLight
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Fechar menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Theme Switcher in Dropdown */}
          <div
            className={`flex items-center justify-between p-2.5 rounded-xl mb-3 border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-white/5 border-white/10 text-white/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                  isLight
                    ? 'bg-slate-200 text-slate-900'
                    : 'bg-white/15 text-white'
                }`}
              >
                {isLight ? 'W' : 'D'}
              </span>
              <span className="text-xs font-semibold">
                {isLight ? 'Tema Claro (W)' : 'Tema Escuro (D)'}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-sm ${
                isLight
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-white text-slate-900 hover:bg-white/90'
              }`}
              title={isLight ? 'Mudar para D' : 'Mudar para W'}
            >
              {isLight ? 'D' : 'W'}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? isLight
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'bg-white/10 text-white font-semibold border border-white/20'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Catálogo Item */}
            <button
              onClick={() => {
                setMenuOpen(false);
                if (onNavigateCatalog) {
                  onNavigateCatalog();
                } else if (window.history && window.history.pushState) {
                  window.history.pushState({}, '', '/catalogo');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                } else {
                  window.location.href = '/catalogo';
                }
              }}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isLight
                  ? 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              Catálogo de Produtos
            </button>
          </div>

          {/* Action CTAs */}
          <div
            className={`mt-4 pt-3 border-t flex flex-col gap-2 ${
              isLight ? 'border-[#e5e5ea]' : 'border-white/10'
            }`}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                openButtonLink(content.buttonLinks?.navbarBudget, onOpenContact);
              }}
              className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all ${
                isLight
                  ? 'bg-[#1d1d1f] hover:bg-[#333336] text-white'
                  : 'bg-white hover:bg-white/90 text-[#070919]'
              }`}
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenSimulator();
              }}
              className={`w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                isLight
                  ? 'bg-[#f5f5f7] hover:bg-[#ebebee] text-[#1d1d1f] border-[#e5e5ea]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              <span>Simulador interativo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
