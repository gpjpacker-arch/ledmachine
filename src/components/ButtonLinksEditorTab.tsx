import React, { useState } from 'react';
import {
  Link2,
  ExternalLink,
  RotateCcw,
  MessageCircle,
  Search,
  Check,
  Sparkles,
  Layers,
  Compass,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  Sliders
} from 'lucide-react';
import { SiteContent, defaultSiteContent } from '../data/siteContent';

export type ButtonLinkKey = keyof NonNullable<SiteContent['buttonLinks']>;

interface ButtonLinkDefinition {
  key: ButtonLinkKey;
  label: string;
  section: string;
  category: 'navbar' | 'hero' | 'banner' | 'gallery' | 'cta' | 'social' | 'footer';
  categoryLabel: string;
  description: string;
  defaultVal: string;
  suggestedWhatsapp?: string;
}

interface ButtonLinksEditorTabProps {
  localContent: SiteContent;
  onUpdateLink: (key: ButtonLinkKey, value: string) => void;
  onResetAllLinks: () => void;
  onApplyWhatsappToAll: (phone: string) => void;
}

export const ButtonLinksEditorTab: React.FC<ButtonLinksEditorTabProps> = ({
  localContent,
  onUpdateLink,
  onResetAllLinks,
  onApplyWhatsappToAll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customPhone, setCustomPhone] = useState(
    localContent.general?.whatsappNumber || '5519999107788'
  );
  const [appliedPhoneNotice, setAppliedPhoneNotice] = useState(false);

  const buttonDefinitions: ButtonLinkDefinition[] = [
    {
      key: 'navbarContact',
      label: 'Menu Superior: Link "Contato"',
      section: 'Menu & Cabeçalho',
      category: 'navbar',
      categoryLabel: 'Menu & Topo',
      description: 'Botão de texto localizado no canto superior direito do cabeçalho de navegação.',
      defaultVal: defaultSiteContent.buttonLinks?.navbarContact || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Gostaria de falar sobre os painéis de LED da LED Machine.')}`,
    },
    {
      key: 'navbarBudget',
      label: 'Menu Suspenso: Botão "Solicitar Orçamento"',
      section: 'Menu & Cabeçalho',
      category: 'navbar',
      categoryLabel: 'Menu & Topo',
      description: 'Botão branco de destaque exibido quando o visitante clica no botão de Menu.',
      defaultVal: defaultSiteContent.buttonLinks?.navbarBudget || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento pelo site.')}`,
    },
    {
      key: 'heroPrimary',
      label: `Topo Principal: Botão "${localContent.hero?.ctaPrimaryText || 'Solicitar Projeto'}"`,
      section: 'Topo / Hero',
      category: 'hero',
      categoryLabel: 'Hero & Topo',
      description: 'O botão de maior destaque na primeira visualização da tela inicial, logo abaixo do título.',
      defaultVal: defaultSiteContent.buttonLinks?.heroPrimary || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Vi o site da LED Machine e quero solicitar um projeto sob medida.')}`,
    },
    {
      key: 'heroCarousel',
      label: 'Carrossel 3D: Botão "Solicitar Projeto" nos Slides',
      section: 'Carrossel 3D de Projetos',
      category: 'hero',
      categoryLabel: 'Hero & Topo',
      description: 'Botão de ação exibido dentro do card ativo no carrossel de projetos realizados.',
      defaultVal: defaultSiteContent.buttonLinks?.heroCarousel || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Gostaria de um projeto sob medida similar aos do carrossel da LED Machine.')}`,
    },
    {
      key: 'widescreenBanner',
      label: 'Banner Curvo: Botão "Consultar Projeto"',
      section: 'Painel Curvo Widescreen',
      category: 'banner',
      categoryLabel: 'Banner Curvo',
      description: 'Botão exibido no rodapé do banner cinematográfico de painel curvo widescreen.',
      defaultVal: defaultSiteContent.buttonLinks?.widescreenBanner || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Gostaria de consultar um projeto de Painel Curvo Widescreen.')}`,
    },
    {
      key: 'featuredProductQuote',
      label: 'Cinema Series: Botão "Solicitar Orçamento Deste Produto"',
      section: 'Galeria Cinema Series',
      category: 'gallery',
      categoryLabel: 'Cinema Series',
      description: 'Botão branco principal de orçamento na seção de especificações da linha Cinema Series.',
      defaultVal: defaultSiteContent.buttonLinks?.featuredProductQuote || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Gostaria de um orçamento detalhado do Cinema Series.')}`,
    },
    {
      key: 'featuredProductWhatsapp',
      label: 'Cinema Series: Botão WhatsApp "Tirar Dúvidas com Especialista"',
      section: 'Galeria Cinema Series',
      category: 'gallery',
      categoryLabel: 'Cinema Series',
      description: 'Botão verde de contato imediato localizado abaixo do botão de orçamento do Cinema Series.',
      defaultVal:
        defaultSiteContent.buttonLinks?.featuredProductWhatsapp ||
        `https://wa.me/5519999107788?text=${encodeURIComponent('Olá, vi os detalhes do Cinema Series no site da LED Machine e gostaria de um orçamento personalizado.')}`,
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá, vi os detalhes do Cinema Series no site da LED Machine e gostaria de um orçamento personalizado.')}`,
    },
    {
      key: 'finalCtaPrimary',
      label: `Chamada Final: Botão "${localContent.finalCta?.btnPrimary || 'Solicitar Projeto Sob Medida'}"`,
      section: 'Chamada Final (Conversão)',
      category: 'cta',
      categoryLabel: 'Chamada Final',
      description: 'Botão branco principal da chamada para ação antes do rodapé.',
      defaultVal: defaultSiteContent.buttonLinks?.finalCtaPrimary || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Gostaria de iniciar um projeto com a LED Machine.')}`,
    },
    {
      key: 'finalCtaWhatsapp',
      label: `Chamada Final: Botão WhatsApp "${localContent.finalCta?.btnSecondary || 'Falar com Especialista no WhatsApp'}"`,
      section: 'Chamada Final (Conversão)',
      category: 'cta',
      categoryLabel: 'Chamada Final',
      description: 'Botão verde com ícone do WhatsApp na chamada de encerramento da página.',
      defaultVal:
        defaultSiteContent.buttonLinks?.finalCtaWhatsapp ||
        `https://wa.me/5519999107788?text=${encodeURIComponent('Olá! Estava no site da LED Machine e gostaria de conversar com um especialista sobre um projeto.')}`,
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Estava no site da LED Machine e gostaria de conversar com um especialista sobre um projeto.')}`,
    },
    {
      key: 'socialInstagram',
      label: 'Card Interativo: Instagram Oficial',
      section: 'Redes Sociais & Localização',
      category: 'social',
      categoryLabel: 'Redes & Localização',
      description: 'Card da coluna esquerda na seção de redes sociais para visitação do perfil @ledmachinepaineis.',
      defaultVal: defaultSiteContent.buttonLinks?.socialInstagram || 'https://instagram.com/ledmachinepaineis',
    },
    {
      key: 'socialWhatsapp',
      label: 'Card Interativo: WhatsApp Oficial',
      section: 'Redes Sociais & Localização',
      category: 'social',
      categoryLabel: 'Redes & Localização',
      description: 'Card central na seção de redes sociais para abertura de atendimento rápido.',
      defaultVal:
        defaultSiteContent.buttonLinks?.socialWhatsapp ||
        `https://wa.me/5519999107788?text=${encodeURIComponent('Olá, vi os produtos da Led Machine no site e gostaria de um orçamento')}`,
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá, vi os produtos da Led Machine no site e gostaria de um orçamento')}`,
    },
    {
      key: 'socialMaps',
      label: 'Card Interativo: Google Maps / Como Chegar',
      section: 'Redes Sociais & Localização',
      category: 'social',
      categoryLabel: 'Redes & Localização',
      description: 'Card da coluna direita na seção de redes sociais para rota e localização física no Google Maps.',
      defaultVal:
        defaultSiteContent.buttonLinks?.socialMaps ||
        'https://www.google.com/maps/search/?api=1&query=LED+Machine+Paineis+de+LED+Sao+Paulo',
    },
    {
      key: 'footerContact',
      label: 'Rodapé: Link "Falar com um Especialista"',
      section: 'Rodapé',
      category: 'footer',
      categoryLabel: 'Rodapé',
      description: 'Link no rodapé ao lado dos termos de garantia e créditos.',
      defaultVal: defaultSiteContent.buttonLinks?.footerContact || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=${encodeURIComponent('Olá! Gostaria de falar com um especialista da LED Machine.')}`,
    },
    {
      key: 'footerWarranty',
      label: 'Rodapé: Link "2 Anos de Garantia"',
      section: 'Rodapé',
      category: 'footer',
      categoryLabel: 'Rodapé',
      description: 'Link informativo sobre a garantia total de 2 anos no rodapé.',
      defaultVal: defaultSiteContent.buttonLinks?.footerWarranty || '#contato',
    },
    {
      key: 'footerPhone',
      label: 'Rodapé: Clique no Telefone Comercial',
      section: 'Rodapé',
      category: 'footer',
      categoryLabel: 'Rodapé',
      description: 'Ação executada ao clicar no número de telefone exibido na coluna de consultoria do rodapé.',
      defaultVal: defaultSiteContent.buttonLinks?.footerPhone || `https://wa.me/${customPhone}`,
      suggestedWhatsapp: `https://wa.me/${customPhone}`,
    },
    {
      key: 'footerEmail',
      label: 'Rodapé: Clique no E-mail Comercial',
      section: 'Rodapé',
      category: 'footer',
      categoryLabel: 'Rodapé',
      description: 'Ação de abertura de e-mail ao clicar no endereço de e-mail corporativo no rodapé.',
      defaultVal: defaultSiteContent.buttonLinks?.footerEmail || 'mailto:contato@ledmachine.com.br',
    },
  ];

  const categories = [
    { id: 'all', label: 'Todos os Botões', count: buttonDefinitions.length },
    { id: 'navbar', label: 'Menu & Topo', count: buttonDefinitions.filter((b) => b.category === 'navbar').length },
    { id: 'hero', label: 'Hero / Topo', count: buttonDefinitions.filter((b) => b.category === 'hero').length },
    { id: 'banner', label: 'Banner Curvo', count: buttonDefinitions.filter((b) => b.category === 'banner').length },
    { id: 'gallery', label: 'Cinema Series', count: buttonDefinitions.filter((b) => b.category === 'gallery').length },
    { id: 'cta', label: 'Chamada Final', count: buttonDefinitions.filter((b) => b.category === 'cta').length },
    { id: 'social', label: 'Redes & Maps', count: buttonDefinitions.filter((b) => b.category === 'social').length },
    { id: 'footer', label: 'Rodapé', count: buttonDefinitions.filter((b) => b.category === 'footer').length },
  ];

  const filteredButtons = buttonDefinitions.filter((btn) => {
    const matchesCategory = selectedCategory === 'all' || btn.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const currentVal = (localContent.buttonLinks?.[btn.key] || btn.defaultVal).toLowerCase();
    const matchesSearch =
      !query ||
      btn.label.toLowerCase().includes(query) ||
      btn.section.toLowerCase().includes(query) ||
      btn.description.toLowerCase().includes(query) ||
      currentVal.includes(query);
    return matchesCategory && matchesSearch;
  });

  const getLinkTypeBadge = (url: string) => {
    if (!url || url === '#contato' || url.startsWith('#')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
          <span>💬 Janela de Contato</span>
        </span>
      );
    }
    if (url.includes('wa.me') || url.includes('whatsapp.com')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <span>📱 WhatsApp Direto</span>
        </span>
      );
    }
    if (url.startsWith('mailto:')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <span>✉ Enviar E-mail</span>
        </span>
      );
    }
    if (url.startsWith('tel:')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <span>📞 Ligar para Telefone</span>
        </span>
      );
    }
    if (url.includes('maps.google') || url.includes('google.com/maps')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <span>📍 Google Maps</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
        <span>🌐 Link Externo / Web</span>
      </span>
    );
  };

  const handleApplyPhoneToAllWhatsapp = () => {
    const cleanNumber = customPhone.replace(/\D/g, '');
    if (!cleanNumber) return;
    onApplyWhatsappToAll(cleanNumber);
    setAppliedPhoneNotice(true);
    setTimeout(() => setAppliedPhoneNotice(false), 3500);
  };

  const testLink = (url: string) => {
    if (!url) return;
    if (url.startsWith('#')) {
      alert(`Este botão está configurado para abrir a janela de orçamento/contato (${url}) no site.`);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-cyan-900/20 to-black/40 border border-cyan-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                <Link2 className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Central de Links & Redirecionamentos de Todos os Botões
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Aqui você tem controle total sobre o destino de cada botão do site. Configure links de
              WhatsApp com mensagens personalizadas, redirecionamentos externos ou mantenha o formulário
              de orçamento padrão com <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">#contato</code>.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetAllLinks}
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-semibold text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Todos os Links</span>
          </button>
        </div>

        {/* Global WhatsApp Number Batch Applier */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-black/30 p-3.5 rounded-xl">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-white/90 font-medium">
              Atualizar número de WhatsApp em todos os botões de WhatsApp:
            </span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={customPhone}
              onChange={(e) => setCustomPhone(e.target.value)}
              placeholder="Ex: 5519999107788"
              className="flex-1 md:w-48 px-3 py-1.5 rounded-lg bg-white/5 border border-white/20 text-white text-xs focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyPhoneToAllWhatsapp}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer shrink-0"
            >
              Aplicar a Todos
            </button>
          </div>
        </div>

        {appliedPhoneNotice && (
          <div className="mt-2 text-xs text-emerald-300 flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Número de WhatsApp atualizado em todos os botões correspondentes!</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por botão, texto ou URL..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none placeholder-white/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Counter */}
        <div className="text-xs text-white/50 px-2 flex items-center gap-1.5">
          <span>Mostrando</span>
          <strong className="text-white font-bold">{filteredButtons.length}</strong>
          <span>de {buttonDefinitions.length} botões</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md border border-blue-400/40'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Button Links Cards List */}
      <div className="space-y-4">
        {filteredButtons.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10 text-white/50">
            Nenhum botão encontrado com o filtro "{searchQuery}".
          </div>
        ) : (
          filteredButtons.map((btn) => {
            const currentValue =
              localContent.buttonLinks?.[btn.key] !== undefined
                ? localContent.buttonLinks[btn.key]
                : btn.defaultVal;

            return (
              <div
                key={btn.key}
                className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all space-y-3"
              >
                {/* Header of the Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/70">
                        {btn.section}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {btn.label}
                      </h4>
                    </div>
                    <p className="text-xs text-white/60">{btn.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {getLinkTypeBadge(currentValue)}
                  </div>
                </div>

                {/* Input with live editing */}
                <div className="space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={currentValue}
                      onChange={(e) => onUpdateLink(btn.key, e.target.value)}
                      placeholder="Ex: https://wa.me/... ou #contato ou https://site.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 font-mono"
                    />
                  </div>

                  {/* Preset quick buttons & testing */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Set to #contato */}
                      <button
                        type="button"
                        onClick={() => onUpdateLink(btn.key, '#contato')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                          currentValue === '#contato'
                            ? 'bg-blue-600/40 text-blue-200 border border-blue-400/40'
                            : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                        }`}
                      >
                        💬 Abrir Janela (#contato)
                      </button>

                      {/* Suggested WhatsApp */}
                      {btn.suggestedWhatsapp && (
                        <button
                          type="button"
                          onClick={() => onUpdateLink(btn.key, btn.suggestedWhatsapp!)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                            currentValue.includes('wa.me')
                              ? 'bg-emerald-600/40 text-emerald-200 border border-emerald-400/40'
                              : 'bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-500/20'
                          }`}
                        >
                          📱 WhatsApp Direto
                        </button>
                      )}

                      {/* Restore Default */}
                      {currentValue !== btn.defaultVal && (
                        <button
                          type="button"
                          onClick={() => onUpdateLink(btn.key, btn.defaultVal)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-all cursor-pointer"
                        >
                          Restaurar Original
                        </button>
                      )}
                    </div>

                    {/* Test Button */}
                    <button
                      type="button"
                      onClick={() => testLink(currentValue)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 hover:text-white border border-cyan-500/30 text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Testar Link</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
