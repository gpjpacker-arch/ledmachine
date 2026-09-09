import React, { useState } from 'react';
import { LedMachineLogo } from './LedMachineLogo';
import { LayoutGrid, X, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { openButtonLink } from '../utils/linkHelper';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenContact,
  onOpenSimulator,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { content } = useSiteContent();

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
      className="absolute top-0 left-0 right-0 z-40 w-full px-6 sm:px-12 max-w-7xl mx-auto pt-6 sm:pt-8 pb-4 pointer-events-auto"
    >
      <nav className="flex items-center justify-between py-2 backdrop-blur-[2px]">
        {/* Brand Logo (Official LED Machine Logo) */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer group"
        >
          <LedMachineLogo size="md" />
        </div>

        {/* Center / Right Links: Exact layout of 'Contact | Menu ☷' */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          {/* Contact Link */}
          <button
            id="nav-contact-link"
            onClick={() => openButtonLink(content.buttonLinks?.navbarContact, onOpenContact)}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            Contato
          </button>

          {/* Vertical Divider Line */}
          <span className="h-4 w-[1px] bg-white/20" />

          {/* Menu Button with 4-dots grid icon (exact match of Menu ☷) */}
          <button
            id="nav-menu-toggle-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer group"
            aria-label="Abrir menu"
          >
            <span>Menu</span>
            <LayoutGrid className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
          </button>
        </div>
      </nav>

      {/* Floating Menu Drawer / Overlay when Menu is clicked */}
      {menuOpen && (
        <div
          id="nav-expanded-menu"
          className="absolute top-20 right-6 sm:right-12 z-50 w-72 p-5 rounded-2xl bg-[#090b1c]/95 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              Navegação
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white font-semibold border border-white/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                openButtonLink(content.buttonLinks?.navbarBudget, onOpenContact);
              }}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-white/90 text-[#070919] font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenSimulator();
              }}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-white/10"
            >
              <span>Simulador interativo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
