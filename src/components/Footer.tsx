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
                Por que LED Machine?
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('solucoes')}
                className="text-left block text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Soluções Corporativas & Residenciais
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('garantia')}
                className="text-left block text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                2 Anos de Garantia
              </button>
            </li>
          </ul>
        </div>

        {/* Contact / Consultation Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Consultoria & Engenharia
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            Equipe dedicada para desenvolvimento de projetos sob medida em todo o Brasil.
          </p>
          <div className="pt-2 space-y-2 text-xs text-zinc-400">
            <div
              onClick={() => openButtonLink(content.buttonLinks?.footerPhone || `https://wa.me/${content.general.whatsappNumber}`)}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors w-fit"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-zinc-300">{content.general.phoneContact || '(11) 99999-9999'}</span>
            </div>
            <div
              onClick={() => openButtonLink(content.buttonLinks?.footerEmail || `mailto:${content.general.emailContact}`)}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors w-fit"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-zinc-300">{content.general.emailContact || 'contato@ledmachine.com.br'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>{content.general.address || 'Atendimento e Instalação em Âmbito Nacional'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          {content.footer.copyrightText || `© ${new Date().getFullYear()} LED MACHINE Displays & Engineering. Todos os direitos reservados.`}
        </div>
        <div className="flex items-center space-x-6 text-zinc-400">
          <button
            onClick={() => openButtonLink(content.buttonLinks?.footerWarranty, onOpenContact)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            2 Anos de Garantia
          </button>
          <button
            onClick={() => openButtonLink(content.buttonLinks?.footerContact, onOpenContact)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Falar com um Especialista
          </button>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            <span>Editar Conteúdo</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
