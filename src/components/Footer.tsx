import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Edit3, Lock } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { LedMachineLogo } from './LedMachineLogo';
import { openButtonLink } from '../utils/linkHelper';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenTutorial?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact, onOpenTutorial }) => {
  const { content, setIsEditorOpen } = useSiteContent();

  return (
    <footer
      id="main-footer"
      className="relative w-full bg-[#090a0f] border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <LedMachineLogo size="md" />
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-normal">
            {content.footer.aboutText || 'Empresa de engenharia visual especializada em painéis de LED de alta definição para aplicações comerciais e residenciais com 2 anos de garantia.'}
          </p>
          <div className="pt-2 flex items-center space-x-2 text-xs text-zinc-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>2 anos de garantia integral de fábrica</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Soluções & Projetos
          </h4>
          <ul className="space-y-2.5 text-sm text-zinc-300">
            <li>
              <button
                onClick={() => onNavigate('diferenciais')}
                className="text-left block text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Por que a LED Machine?
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('solucoes')}
                className="text-left block text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Soluções corporativas & residenciais
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('simulador')}
                className="text-left block text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Simulador interativo
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('garantia')}
                className="text-left block text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                2 anos de garantia
              </button>
            </li>
            <li className="pt-2 border-t border-white/10 mt-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                Páginas Especiais
              </span>
              <div className="space-y-1.5">
                <a
                  href="/video"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.history && window.history.pushState) {
                      window.history.pushState({}, '', '/video');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } else {
                      window.location.href = '/video';
                    }
                  }}
                  className="text-left block text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Vídeo LED Machine (/video)
                </a>
                <a
                  href="/simulador"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.history && window.history.pushState) {
                      window.history.pushState({}, '', '/simulador');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } else {
                      window.location.href = '/simulador';
                    }
                  }}
                  className="text-left block text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Simulador Dedicado (/simulador)
                </a>
                <a
                  href="/catalogo"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.history && window.history.pushState) {
                      window.history.pushState({}, '', '/catalogo');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } else {
                      window.location.href = '/catalogo';
                    }
                  }}
                  className="text-left block text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Catálogo Oficial (/catalogo)
                </a>
                <a
                  href="/ambientes"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.history && window.history.pushState) {
                      window.history.pushState({}, '', '/ambientes');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } else {
                      window.location.href = '/ambientes';
                    }
                  }}
                  className="text-left block text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Ambientes (/ambientes)
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact / Consultation Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Consultoria & engenharia
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            Equipe dedicada para desenvolvimento de projetos sob medida em todo o Brasil.
          </p>
          <div className="pt-2 space-y-2 text-xs text-zinc-400">
            <div
              onClick={() =>
                openButtonLink(
                  content.buttonLinks?.footerPhone ||
                    'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.'
                )
              }
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors w-fit"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-zinc-300">{content.general.phoneContact || '(19) 99910-7788'}</span>
            </div>
            <div
              onClick={() => openButtonLink(content.buttonLinks?.footerEmail || `mailto:${content.general.emailContact}`)}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors w-fit"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-zinc-300">{content.general.emailContact || 'contato@ledmachine.com.br'}</span>
            </div>
            <div
              onClick={() => openButtonLink(content.buttonLinks?.socialMaps || 'https://share.google/e2fpI9CJ972PHCw3Q')}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors w-fit"
              title="Abrir no Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>{content.general.address || 'R. Dr. José Rodrigues de Almeida, 632 - Paulicéia, Piracicaba - SP'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          {content.footer.copyrightText || `© ${new Date().getFullYear()} Led Machine Painéis. Todos os direitos reservados.`}
        </div>
        <div className="flex items-center space-x-6 text-zinc-400">
          <button
            onClick={() => openButtonLink(content.buttonLinks?.footerWarranty, onOpenContact)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            2 anos de garantia
          </button>
          <button
            onClick={() => openButtonLink(content.buttonLinks?.footerContact, onOpenContact)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Falar com um especialista
          </button>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            <span>Editar conteúdo</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
