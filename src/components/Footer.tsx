import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Edit3 } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const { content, setIsEditorOpen } = useSiteContent();

  return (
    <footer
      id="main-footer"
      className="relative w-full bg-[#040817] pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ambient background light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white block">
            {content.general.siteName || 'LED Machine Painéis'}
          </span>
          <p className="text-sm text-white/80 max-w-sm leading-relaxed">
            {content.footer.aboutText || 'Empresa de tecnologia visual especializada em painéis de LED de alta qualidade para aplicações comerciais e residenciais com 2 anos de garantia.'}
          </p>
          <div className="pt-2 flex items-center space-x-3 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0" />
            <span>2 anos de garantia integral • Instalação profissional</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Soluções & Projetos
          </h4>
          <ul className="space-y-2.5 text-sm text-white">
            <li>
              <button
                onClick={() => onNavigate('diferenciais')}
                className="text-left block opacity-75 hover:opacity-100 transition-opacity cursor-pointer text-white"
              >
                Por que LED Machine?
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('solucoes')}
                className="text-left block opacity-75 hover:opacity-100 transition-opacity cursor-pointer text-white"
              >
                Soluções Comerciais & Residenciais
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('garantia')}
                className="text-left block opacity-75 hover:opacity-100 transition-opacity cursor-pointer text-white"
              >
                2 Anos de Garantia
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsEditorOpen(true)}
                className="text-left inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer text-xs mt-2"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Painel de Edição de Textos & Fotos</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Contact / Consultation Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Consultoria & Suporte
          </h4>
          <p className="text-xs text-white/75 leading-relaxed">
            Engenharia e consultoria técnica dedicada para projetos sob medida em todo o Brasil.
          </p>
          <div className="pt-2 space-y-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{content.general.phoneContact || '(11) 99999-9999'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{content.general.emailContact || 'contato@ledmachine.com.br'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{content.general.address || 'Atendimento e Instalação em Âmbito Nacional'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
        <div>
          {content.footer.copyrightText || `© ${new Date().getFullYear()} LED MACHINE Displays & Engineering. Todos os direitos reservados.`}
        </div>
        <div className="flex items-center space-x-6 text-white/80">
          <button onClick={onOpenContact} className="hover:opacity-100 transition-opacity cursor-pointer">
            2 Anos de Garantia
          </button>
          <button onClick={onOpenContact} className="hover:opacity-100 transition-opacity cursor-pointer">
            Fale com um Especialista
          </button>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Editar Conteúdo</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
