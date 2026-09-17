import React from 'react';
import {
  Instagram,
  MessageCircle,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { useTheme } from '../context/ThemeContext';

interface SocialSectionProps {
  onOpenContactModal?: () => void;
}

export const SocialSection: React.FC<SocialSectionProps> = () => {
  const { content } = useSiteContent();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const socialLinks = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@ledmachinepaineis',
      description: 'Acompanhe nossos bastidores, projetos recentes, instalações em andamento e lançamentos exclusivos.',
      followers: 'Projetos reais semanais',
      icon: Instagram,
      gradient: 'from-blue-600/25 via-blue-900/20 to-slate-800/20',
      accentBorder: 'group-hover:border-blue-400/60',
      tag: 'Mais ativo',
      tagBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      actionText: 'Acessar canal',
      url: content.buttonLinks?.socialInstagram || 'https://instagram.com/ledmachinepaineis',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp oficial',
      handle: content.general?.phoneContact || '(19) 99910-7788',
      description: 'Atendimento direto e imediato. Fale com um consultor técnico para tirar dúvidas ou solicitar orçamento.',
      followers: 'Suporte imediato',
      icon: MessageCircle,
      gradient: 'from-blue-600/25 via-blue-900/20 to-slate-800/20',
      accentBorder: 'group-hover:border-blue-400/60',
      tag: 'Orçamentos',
      tagBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      actionText: 'Acessar canal',
      url:
        content.buttonLinks?.socialWhatsapp ||
        'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.',
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      handle: content.general?.address || 'R. Dr. José Rodrigues de Almeida, 632 - Paulicéia, Piracicaba - SP',
      description: 'Trace sua rota até nós, confira a localização e agende uma visita técnica ou demonstração exclusiva.',
      followers: 'Como chegar',
      icon: MapPin,
      gradient: 'from-blue-600/25 via-blue-900/20 to-slate-800/20',
      accentBorder: 'group-hover:border-blue-400/60',
      tag: 'Localização',
      tagBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      actionText: 'Abrir no Maps',
      url:
        content.buttonLinks?.socialMaps ||
        'https://share.google/e2fpI9CJ972PHCw3Q',
    },
  ];

  return (
    <section id="redes-sociais" className="relative w-full pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {content.social?.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
              {content.social.badge}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 [text-wrap:balance]">
            {content.social?.title || 'Acompanhe a'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 whitespace-nowrap">
              {content.social?.titleHighlight || 'LED Machine'}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            {content.social?.subtitle || 'Veja nossos projetos em tempo real, bastidores de instalações e converse diretamente com quem entende do assunto.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                id={`social-link-${item.id}`}
                className={`group relative p-7 sm:p-8 rounded-3xl bg-gradient-to-br ${item.gradient} bg-[#080d22]/90 border border-white/10 ${item.accentBorder} backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer overflow-hidden h-full`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${item.tagBg}`}>
                        {item.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/20 transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-1 transition-colors ${
                    isLight ? 'text-[#1d1d1f] group-hover:text-black' : 'text-white group-hover:text-blue-300'
                  }`}>
                    {item.name}
                  </h3>
                  <span className={`text-xs font-semibold block mb-3 truncate ${
                    isLight ? 'text-[#6e6e73]' : 'text-white/50'
                  }`} title={item.handle}>
                    {item.handle}
                  </span>
                  <p className={`text-sm leading-relaxed mb-6 font-normal ${
                    isLight ? 'text-[#3a3a3c]' : 'text-white/70'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className={`text-xs font-bold ${
                    isLight ? 'text-[#1d1d1f]' : 'text-white/80'
                  }`}>
                    {item.followers}
                  </span>
                  <span className="text-xs font-semibold text-blue-400 group-hover:text-white group-hover:underline transition-colors flex items-center gap-1">
                    {item.actionText}
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
