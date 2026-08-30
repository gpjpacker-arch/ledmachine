import React from 'react';
import {
  Instagram,
  MessageCircle,
  ArrowUpRight,
  Share2,
} from 'lucide-react';

interface SocialSectionProps {
  onOpenContactModal?: () => void;
}

export const SocialSection: React.FC<SocialSectionProps> = () => {
  const socialLinks = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@ledmachinepaineis',
      description: 'Bastidores de montagens, projetos finalizados, tours em residências e lançamentos.',
      followers: 'Novos Projetos Semanais',
      icon: Instagram,
      accent: 'from-pink-500 via-rose-500 to-amber-500',
      glow: 'group-hover:shadow-[0_0_35px_rgba(244,63,94,0.35)]',
      borderHover: 'group-hover:border-rose-500/50',
      tag: 'Mais Ativo',
      url: 'https://instagram.com',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Oficial',
      handle: '(19) 99991-07788',
      description: 'Envie sua planta ou medidas e receba um pré-projeto técnico em tempo recorde.',
      followers: 'Atendimento Ágil',
      icon: MessageCircle,
      accent: 'from-emerald-500 to-teal-600',
      glow: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
      borderHover: 'group-hover:border-emerald-500/50',
      tag: 'Orçamentos',
      url: 'https://wa.me/5519999107788?text=Ol%C3%A1%2C%20vi%20os%20produtos%20da%20Led%20Machine%20no%20site%20e%20gostaria%20de%20um%20or%C3%A7amento',
    },
  ];

  return (
    <section
      id="redes-sociais"
      className="relative w-full py-16 sm:py-20 bg-gradient-to-b from-[#030614] via-[#04081c] to-[#02040d] overflow-hidden"
    >
      {/* Dynamic Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Acompanhe a <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200 bg-clip-text text-transparent">LED Machine</span> nas Redes
          </h2>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            Inspire-se com projetos reais, novidades de tecnologia de ponta, bastidores das nossas instalações e conteúdos exclusivos para arquitetos e empresas.
          </p>
        </div>

        {/* Social Cards Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                id={`social-link-${item.id}`}
                className={`group relative p-6 rounded-2xl bg-[#060d26]/80 hover:bg-[#091338] border border-white/10 ${item.borderHover} transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${item.glow}`}
              >
                {/* Top Row with Icon & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} p-0.5 shadow-lg flex items-center justify-center`}>
                      <div className="w-full h-full bg-[#060d26] rounded-[10px] flex items-center justify-center group-hover:bg-transparent transition-colors">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        {item.tag}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Handle */}
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-semibold text-blue-400 block mb-3">
                    {item.handle}
                  </span>

                  {/* Description */}
                  <p className="text-xs text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-medium text-white/60">
                  <span>{item.followers}</span>
                  <span className="text-blue-400 font-semibold group-hover:underline flex items-center gap-1">
                    Acessar
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
