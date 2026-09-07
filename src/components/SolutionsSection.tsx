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
} from 'lucide-react';

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
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Soluções criadas para valorizar o seu espaço
        </h2>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          Desenvolvemos projetos sob medida para empresas que buscam visibilidade e residências que buscam sofisticação.
        </p>
      </div>

      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="inline-flex p-1.5 rounded-full bg-[#080e26] border border-blue-500/30 backdrop-blur-xl shadow-lg">
          <button
            onClick={() => setActiveTab('comercial')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'comercial'
                ? 'bg-white text-[#070c20] shadow-[0_2px_15px_rgba(255,255,255,0.25)]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Para sua Empresa</span>
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
            <span>Para sua Residência</span>
          </button>
        </div>
      </div>

      {activeTab === 'comercial' ? (
        <div className="space-y-16 animate-in fade-in duration-500">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#070c20]/95 via-[#0b1435]/90 to-[#070c20]/95 border border-blue-500/25 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  Presença & Retorno Comercial
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                  Mais visibilidade para o seu negócio.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                    Mais impacto para a sua marca.
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  Em um mercado competitivo, quem chama mais atenção vende mais. O painel de LED transforma sua fachada, vitrine ou espaço interno em um canal de comunicação poderoso.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenCommercialQuote}
                    className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.18)] flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>Quero um projeto para minha empresa</span>
                    <ArrowRight className="w-4 h-4 text-[#070c20]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#080e26]/90 rounded-2xl p-6 border border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Onde instalar em sua empresa:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {commercialApplications.map((app, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80 text-xs font-medium hover:border-blue-400/40 hover:text-white transition-colors"
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
                    <h5 className="text-lg font-semibold text-white mb-2">{b.title}</h5>
                    <p className="text-sm text-zinc-300/80 leading-relaxed">{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-16 animate-in fade-in duration-500">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#070c20]/95 via-[#0b1435]/90 to-[#070c20]/95 border border-blue-500/25 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  Experiência Residencial Premium
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                  O cinema definitivo.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                    Na sua própria casa.
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  Substitua a limitação das TVs convencionais por um painel de LED Fine-Pitch sob medida. Uma imagem perfeita, sem emendas, que dialoga perfeitamente com sua arquitetura.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenResidentialQuote}
                    className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.18)] flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>Quero transformar minha casa</span>
                    <ArrowRight className="w-4 h-4 text-[#070c20]" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#080e26]/90 rounded-2xl p-6 border border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Aplicações residenciais exclusivas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {residentialApplications.map((app, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80 text-xs font-medium hover:border-blue-400/40 hover:text-white transition-colors"
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
                    <h5 className="text-lg font-semibold text-white mb-2">{b.title}</h5>
                    <p className="text-sm text-zinc-300/80 leading-relaxed">{b.description}</p>
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
