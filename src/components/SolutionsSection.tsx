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
  CheckCircle2
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
      title: 'Tecnologia integrada à sua casa',
      description: 'Uma solução pensada para fazer parte do ambiente, unindo tecnologia, estética e praticidade.',
    },
    {
      icon: Gem,
      title: 'Luxo que você realmente aproveita',
      description: 'Não se trata apenas de ter um equipamento sofisticado. É poder aproveitar sua casa de uma maneira que antes não era possível.',
    },
  ];

  return (
    <section
      id="solucoes-section"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* 1. SECTION COMERCIAL X RESIDENCIAL DIVISION SWITCHER */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Projetado para Empresas & Residências
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
          Escolha o tipo de ambiente para conhecer as soluções de tecnologia visual sob medida desenvolvidas pela LED Machine.
        </p>

        {/* Big Dual Toggle Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto p-2 rounded-3xl bg-[#09102b] border border-white/10 shadow-xl">
          {/* Commercial Tab */}
          <button
            id="tab-solution-commercial"
            onClick={() => setActiveTab('comercial')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 flex items-start gap-4 cursor-pointer ${
              activeTab === 'comercial'
                ? 'bg-gradient-to-b from-[#18244e] to-[#0c1432] text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-white/20'
                : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              activeTab === 'comercial' ? 'bg-white/15 text-white border border-white/20' : 'bg-white/5 text-white/60'
            }`}>
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-base text-white">Comercial</div>
              <div className="text-xs text-white/80 mt-0.5">Sua empresa no próximo nível</div>
            </div>
          </button>

          {/* Residential Tab */}
          <button
            id="tab-solution-residential"
            onClick={() => setActiveTab('residencial')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 flex items-start gap-4 cursor-pointer ${
              activeTab === 'residencial'
                ? 'bg-gradient-to-b from-[#18244e] to-[#0c1432] text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-white/20'
                : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              activeTab === 'residencial' ? 'bg-white/15 text-white border border-white/20' : 'bg-white/5 text-white/60'
            }`}>
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-base text-white">Residencial</div>
              <div className="text-xs text-white/80 mt-0.5">Sua casa como você sempre imaginou</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. COMMERCIAL CONTENT */}
      {activeTab === 'comercial' && (
        <div id="comercial-section-content" className="space-y-16 animate-in fade-in duration-300">
          {/* Header Block */}
          <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-b from-[#0e1b48] to-[#070e2a] border border-blue-500/40 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/40 text-xs font-bold uppercase tracking-wider text-blue-200 mb-4 shadow-sm">
                <span>Soluções Corporativas & Comerciais</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Sua marca merece ser vista.
              </h3>
              <p className="text-lg sm:text-xl text-blue-200 font-medium mb-6">
                Transforme sua comunicação, aumente a presença da sua marca e faça sua empresa se destacar.
              </p>
              <div className="space-y-4 text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
                <p>
                  Em um mercado cada vez mais competitivo, ser visto é apenas o começo. É preciso <strong>chamar atenção, transmitir valor e permanecer na memória do cliente.</strong>
                </p>
                <p>
                  Um painel de LED transforma sua fachada, loja, recepção, showroom ou espaço comercial em um ponto de comunicação de alto impacto. Exiba campanhas, produtos, ofertas, lançamentos, vídeos e conteúdos em movimento, criando uma comunicação muito mais dinâmica e envolvente.
                </p>
                <p>
                  Mais do que divulgar sua marca, você cria uma experiência que faz o cliente perceber sua empresa em outro nível.
                </p>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  id="btn-transform-company"
                  onClick={onOpenCommercialQuote}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-sm md:text-base inline-flex items-center justify-center gap-3 shadow-[0_4px_25px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.28)] border border-white transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Quero transformar minha empresa</span>
                  <ArrowRight className="w-4 h-4 text-[#070c20]" />
                </button>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                Mais visibilidade. Mais atenção. Mais oportunidades.
              </h4>
              <p className="text-sm text-white/70">
                Vantagens reais para alavancar a presença comercial do seu negócio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercialBenefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#080e26]/85 border border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h5>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Where Your Brand Gains Dimension (Applications) */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#09112d]/85 border border-blue-500/20 backdrop-blur-xl text-center">
            <div className="max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                Aplicações Versáteis
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                Onde sua marca pode ganhar uma nova dimensão
              </h4>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
                Independentemente do segmento, o objetivo é o mesmo: <strong>fazer sua empresa ser percebida, lembrada e valorizada.</strong>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {commercialApplications.map((app, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs sm:text-sm font-medium text-white/90 hover:border-blue-400/50 hover:bg-blue-950/50 transition-all cursor-default"
                >
                  {app}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. RESIDENTIAL CONTENT */}
      {activeTab === 'residencial' && (
        <div id="residencial-section-content" className="space-y-16 animate-in fade-in duration-300">
          {/* Header Block */}
          <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-b from-[#0e1c4a] to-[#070e28] border border-blue-500/40 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/40 text-xs font-bold uppercase tracking-wider text-blue-200 mb-4 shadow-sm">
                <span>Soluções Residenciais de Alto Padrão</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Leve o luxo e a tecnologia para dentro da sua casa.
              </h3>
              <p className="text-lg sm:text-xl text-blue-200 font-medium mb-6">
                Transforme ambientes comuns em experiências extraordinárias.
              </p>
              <div className="space-y-4 text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
                <p>
                  Sua casa também pode ter a tecnologia, a sofisticação e o impacto visual que você encontra nos ambientes mais exclusivos.
                </p>
                <p>
                  Um painel de LED residencial transforma salas, áreas gourmet, espaços de entretenimento, quartos, home theaters e ambientes externos em experiências completamente diferentes.
                </p>
                <p>
                  Filmes, esportes, música, games, fotografias ou simplesmente uma ambientação sofisticada. Você escolhe o conteúdo. <strong>A LED Machine transforma o ambiente.</strong>
                </p>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  id="btn-transform-home"
                  onClick={onOpenResidentialQuote}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-sm md:text-base inline-flex items-center justify-center gap-3 shadow-[0_4px_25px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.28)] border border-white transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Quero transformar minha casa</span>
                  <ArrowRight className="w-4 h-4 text-[#070c20]" />
                </button>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
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
              {residentialBenefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#080e26]/85 border border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h5>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {item.description}
                    </p>
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
