import React, { useState } from 'react';
import {
  Building2,
  Home,
  ArrowRight,
  TrendingUp,
  Eye,
  ShoppingBag,
  Clock,
  HeartHandshake,
  DollarSign,
  Film,
  Users,
  Sliders,
  Cpu,
  Gem,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { useTheme } from '../context/ThemeContext';
import { openButtonLink } from '../utils/linkHelper';

interface SolutionsSectionProps {
  onOpenCommercialQuote: () => void;
  onOpenResidentialQuote: () => void;
  initialTab?: 'comercial' | 'residencial';
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onOpenCommercialQuote,
  onOpenResidentialQuote,
  initialTab = 'comercial',
}) => {
  const [activeTab, setActiveTab] = useState<'comercial' | 'residencial'>(initialTab);
  const { content } = useSiteContent();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const solutions = content.solutions;

  const sectionTitle = solutions?.title || 'Soluções criadas para valorizar o seu espaço';
  const sectionSubtitle = solutions?.subtitle || 'Desenvolvemos projetos sob medida para empresas que buscam visibilidade e residências que buscam sofisticação.';

  const commBadge = solutions?.commercial?.badge || 'Presença & retorno comercial';
  const commTitle = solutions?.commercial?.title || 'Mais visibilidade para o seu negócio.';
  const commHighlight = solutions?.commercial?.titleHighlight || 'Mais impacto para a sua marca.';
  const commDesc = solutions?.commercial?.description || 'Em um mercado competitivo, quem chama mais atenção vende mais. O painel de LED transforma sua fachada, vitrine ou espaço interno em um canal de comunicação poderoso.';
  const commCta = solutions?.commercial?.ctaText || 'Quero um projeto para minha empresa';

  const resBadge = solutions?.residential?.badge || 'Experiência & sofisticação';
  const resTitle = solutions?.residential?.title || 'O cinema definitivo.';
  const resHighlight = solutions?.residential?.titleHighlight || 'Na sua própria casa.';
  const resDesc = solutions?.residential?.description || 'O cinema definitivo agora faz parte da arquitetura da sua casa. Esqueça os projetores limitados e as TVs de sempre. Com os nossos painéis de LED, você cria telas gigantes sob medida, com brilho impecável e pretos profundos. Uma tecnologia de alto nível que valoriza o seu imóvel e se integra perfeitamente à decoração. Descubra o luxo de ter o melhor do audiovisual no seu lar.';
  const resCta = solutions?.residential?.ctaText || 'Quero transformar minha casa';

  const commercialBenefits = [
    {
      icon: TrendingUp,
      title: 'Destaque sua marca',
      description: 'Faça sua empresa se destacar visualmente e seja percebido mesmo em ambientes com grande concorrência.',
    },
    {
      icon: Eye,
      title: 'Aumente a visibilidade',
      description: 'Conteúdo dinâmico e iluminação de alto impacto ajudam sua comunicação a conquistar mais atenção.',
    },
    {
      icon: ShoppingBag,
      title: 'Valorize seus produtos',
      description: 'Apresente lançamentos, ofertas e produtos de uma maneira muito mais sofisticada e envolvente.',
    },
    {
      icon: Clock,
      title: 'Comunique-se em tempo real',
      description: 'Atualize suas campanhas e mensagens de acordo com o momento, sem depender de materiais impressos.',
    },
    {
      icon: HeartHandshake,
      title: 'Crie uma experiência memorável',
      description: 'Transforme a passagem do cliente pela sua empresa em uma experiência visual que reforça o posicionamento da sua marca.',
    },
    {
      icon: DollarSign,
      title: 'Potencialize suas vendas',
      description: 'Uma comunicação mais impactante pode gerar mais atenção aos produtos e oportunidades de conversão.',
    },
  ];

  const commercialApplications = [
    'Fachadas comerciais',
    'Lojas',
    'Vitrines',
    'Shoppings',
    'Restaurantes',
    'Hotéis',
    'Academias',
    'Clínicas',
    'Escritórios',
    'Showrooms',
    'Concessionárias',
    'Eventos',
    'Igrejas',
    'Empresas',
    'Ambientes corporativos',
  ];

  const residentialBenefits = [
    {
      icon: Film,
      title: 'Entretenimento em outro nível',
      description: 'Assista a filmes, séries, esportes e seus conteúdos favoritos com uma experiência visual envolvente.',
    },
    {
      icon: Users,
      title: 'Um ambiente que impressiona',
      description: 'Receba seus convidados em um espaço sofisticado, moderno e completamente personalizado.',
    },
    {
      icon: Sliders,
      title: 'Seu espaço, suas experiências',
      description: 'Crie diferentes atmosferas para diferentes momentos. Cinema, jogos, festas, música ou simplesmente um ambiente elegante.',
    },
    {
      icon: Cpu,
      title: 'Tecnologia que valoriza seu imóvel',
      description: 'Uma solução moderna que agrega valor estético e sofisticação ao seu projeto de interiores.',
    },
    {
      icon: Gem,
      title: 'Perfeito para projetos de arquitetura',
      description: 'Formatos sob medida para se integrar de forma harmônica a painéis, marcenaria e salas exclusivas.',
    },
    {
      icon: CheckCircle2,
      title: 'Imagem sem reflexos ou emendas',
      description: 'Painéis modulares de alta resolução Fine-Pitch, sem bordas no meio da tela e com brilho adaptável.',
    },
    {
      icon: Volume2,
      title: 'Sistemas de som indoor e outdoor',
      description: 'Soluções sonoras do pequeno ao grande porte, totalmente personalizadas de acordo com cada projeto.',
    },
  ];

  const residentialApplications = [
    'Salas de estar de alto padrão',
    'Home cinema exclusivo',
    'Áreas gourmet e lounges',
    'Salões de jogos e entretenimento',
    'Casas de campo e veraneio',
    'Varandas integradas',
  ];

  return (
    <section id="solucoes-section" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12">
        {solutions?.badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
            {solutions.badge}
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 [text-wrap:balance]">
          {(() => {
            const targetPhrase = 'valorizar o seu espaço';
            const regex = new RegExp(`(${targetPhrase})`, 'i');
            if (regex.test(sectionTitle)) {
              const parts = sectionTitle.split(regex);
              return (
                <>
                  {parts[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 whitespace-nowrap">
                    {parts[1]}
                  </span>
                  {parts[2] || ''}
                </>
              );
            }
            return sectionTitle;
          })()}
        </h2>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto [text-wrap:balance]">
          {sectionSubtitle}
        </p>
      </div>

      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="inline-flex p-1.5 rounded-full bg-[#0c0f18] border border-white/15 backdrop-blur-xl shadow-lg">
          <button
            onClick={() => setActiveTab('comercial')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'comercial'
                ? 'bg-white text-[#070c20] shadow-[0_2px_15px_rgba(255,255,255,0.25)]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Para sua empresa</span>
          </button>
          <button
            onClick={() => setActiveTab('residencial')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'residencial'
                ? 'bg-white text-[#070c20] shadow-[0_2px_15px_rgba(255,255,255,0.25)]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Para sua residência</span>
          </button>
        </div>
      </div>

      {activeTab === 'comercial' ? (
        <div className="space-y-16 animate-in fade-in duration-500">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e1220] via-[#090c17] to-[#060811] border border-white/10 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  {commBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug [text-wrap:balance]">
                  {commTitle}{' '}
                  {commHighlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                      {commHighlight}
                    </span>
                  )}
                </h3>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  {commDesc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openButtonLink(content.buttonLinks?.solutionsCommercial, onOpenCommercialQuote)}
                    className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.18)] flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>{commCta}</span>
                    <ArrowRight className="w-4 h-4 text-[#070c20]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-black/40 rounded-2xl p-6 border border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  Onde instalar em sua empresa:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {commercialApplications.map((app, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80 text-xs font-medium hover:border-white/30 hover:text-white transition-colors"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                Por que investir em LED para sua empresa?
              </h4>
              <p className="text-sm text-white/70">
                Tecnologia planejada para aumentar o tempo de permanência, engajamento e reconhecimento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercialBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.065] border border-white/10 hover:border-white/20 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/[0.08] group-hover:bg-white/[0.14] border border-white/15 group-hover:border-white/30 flex items-center justify-center text-white mb-4 transition-all duration-200 group-hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h5 className={`text-lg font-semibold mb-2 ${
                      isLight ? 'text-[#1d1d1f]' : 'text-white'
                    }`}>{b.title}</h5>
                    <p className={`text-sm leading-relaxed ${
                      isLight ? 'text-[#3a3a3c]' : 'text-zinc-300/80'
                    }`}>{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-16 animate-in fade-in duration-500">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e1220] via-[#090c17] to-[#060811] border border-white/10 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  {resBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug [text-wrap:balance]">
                  {resTitle}{' '}
                  {resHighlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                      {resHighlight}
                    </span>
                  )}
                </h3>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  {resDesc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openButtonLink(content.buttonLinks?.solutionsResidential, onOpenResidentialQuote)}
                    className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.18)] flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>{resCta}</span>
                    <ArrowRight className="w-4 h-4 text-[#070c20]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-black/40 rounded-2xl p-6 border border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/70" />
                  Aplicações residenciais exclusivas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {residentialApplications.map((app, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80 text-xs font-medium hover:border-white/30 hover:text-white transition-colors"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                Mais do que luxo. Qualidade de vida.
              </h4>
              <p className="text-sm text-white/70">
                Conforto, estética e imersão para momentos inesquecíveis em família e com amigos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {residentialBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.065] border border-white/10 hover:border-white/20 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/[0.08] group-hover:bg-white/[0.14] border border-white/15 group-hover:border-white/30 flex items-center justify-center text-white mb-4 transition-all duration-200 group-hover:scale-105 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h5 className={`text-lg font-semibold mb-2 ${
                      isLight ? 'text-[#1d1d1f]' : 'text-white'
                    }`}>{b.title}</h5>
                    <p className={`text-sm leading-relaxed ${
                      isLight ? 'text-[#3a3a3c]' : 'text-zinc-300/80'
                    }`}>{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
