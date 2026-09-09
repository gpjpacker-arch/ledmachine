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
      label: 'Menu superior: link "Contato"',
      section: 'Menu & cabeçalho',
      category: 'navbar',
      categoryLabel: 'Menu & topo',
      description: 'Botão de texto localizado no canto superior direito do cabeçalho de navegação.',
      defaultVal: defaultSiteContent.buttonLinks?.navbarContact || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'navbarBudget',
      label: 'Menu suspenso: botão "Solicitar orçamento"',
      section: 'Menu & cabeçalho',
      category: 'navbar',
      categoryLabel: 'Menu & topo',
      description: 'Botão branco de destaque exibido quando o visitante clica no botão de menu.',
      defaultVal: defaultSiteContent.buttonLinks?.navbarBudget || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'heroPrimary',
      label: `Topo principal: botão "${localContent.hero?.ctaPrimaryText || 'Solicitar projeto'}"`,
      section: 'Topo / hero',
      category: 'hero',
      categoryLabel: 'Hero & topo',
      description: 'O botão de maior destaque na primeira visualização da tela inicial, logo abaixo do título.',
      defaultVal: defaultSiteContent.buttonLinks?.heroPrimary || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'heroCarousel',
      label: 'Carrossel 3D: botão "Solicitar projeto" nos slides',
      section: 'Carrossel 3D de projetos',
      category: 'hero',
      categoryLabel: 'Hero & topo',
      description: 'Botão de ação exibido dentro do card ativo no carrossel de projetos realizados.',
      defaultVal: defaultSiteContent.buttonLinks?.heroCarousel || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'widescreenBanner',
      label: 'Banner curvo: botão "Consultar projeto"',
      section: 'Painel curvo widescreen',
      category: 'banner',
      categoryLabel: 'Banner curvo',
      description: 'Botão exibido no rodapé do banner cinematográfico de painel curvo widescreen.',
      defaultVal: defaultSiteContent.buttonLinks?.widescreenBanner || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'featuredProductQuote',
      label: 'Projetos: botão "Solicitar orçamento deste produto"',
      section: 'Galeria de projetos',
      category: 'gallery',
      categoryLabel: 'Galeria de projetos',
      description: 'Botão branco principal de orçamento na seção de projetos da LED Machine.',
      defaultVal: defaultSiteContent.buttonLinks?.featuredProductQuote || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'featuredProductWhatsapp',
      label: 'Projetos: botão WhatsApp "Tirar dúvidas com especialista"',
      section: 'Galeria de projetos',
      category: 'gallery',
      categoryLabel: 'Galeria de projetos',
      description: 'Botão verde de contato imediato localizado abaixo do botão de orçamento de projetos.',
      defaultVal:
        defaultSiteContent.buttonLinks?.featuredProductWhatsapp ||
        'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'finalCtaPrimary',
      label: `Chamada final: botão "${localContent.finalCta?.btnPrimary || 'Solicitar projeto sob medida'}"`,
      section: 'Chamada final (conversão)',
      category: 'cta',
      categoryLabel: 'Chamada final',
      description: 'Botão branco principal da chamada para ação antes do rodapé.',
      defaultVal: defaultSiteContent.buttonLinks?.finalCtaPrimary || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'finalCtaWhatsapp',
      label: `Chamada final: botão WhatsApp "${localContent.finalCta?.btnSecondary || 'Falar com especialista no WhatsApp'}"`,
      section: 'Chamada final (conversão)',
      category: 'cta',
      categoryLabel: 'Chamada final',
      description: 'Botão verde com ícone do WhatsApp na chamada de encerramento da página.',
      defaultVal:
        defaultSiteContent.buttonLinks?.finalCtaWhatsapp ||
        'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'socialInstagram',
      label: 'Card interativo: Instagram oficial',
      section: 'Redes sociais & localização',
      category: 'social',
      categoryLabel: 'Redes & localização',
      description: 'Card da coluna esquerda na seção de redes sociais para visitação do perfil @ledmachinepaineis.',
      defaultVal: defaultSiteContent.buttonLinks?.socialInstagram || 'https://instagram.com/ledmachinepaineis',
    },
    {
      key: 'socialWhatsapp',
      label: 'Card interativo: WhatsApp oficial',
      section: 'Redes sociais & localização',
      category: 'social',
      categoryLabel: 'Redes & localização',
      description: 'Card central na seção de redes sociais para abertura de atendimento rápido.',
      defaultVal:
        defaultSiteContent.buttonLinks?.socialWhatsapp ||
        'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'socialMaps',
      label: 'Card interativo: Google Maps / como chegar',
      section: 'Redes sociais & localização',
      category: 'social',
      categoryLabel: 'Redes & localização',
      description: 'Card da coluna direita na seção de redes sociais para rota e localização física no Google Maps.',
      defaultVal:
        defaultSiteContent.buttonLinks?.socialMaps ||
        'https://share.google/e2fpI9CJ972PHCw3Q',
    },
    {
      key: 'footerContact',
      label: 'Rodapé: link "Falar com um especialista"',
      section: 'Rodapé',
      category: 'footer',
      categoryLabel: 'Rodapé',
      description: 'Link no rodapé ao lado dos termos de garantia e créditos.',
      defaultVal: defaultSiteContent.buttonLinks?.footerContact || '#contato',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'footerWarranty',
      label: 'Rodapé: link "2 anos de garantia"',
      section: 'Rodapé',
      category: 'footer',
      categoryLabel: 'Rodapé',
      description: 'Link informativo sobre a garantia total de 2 anos no rodapé.',
      defaultVal: defaultSiteContent.buttonLinks?.footerWarranty || '#contato',
    },
    {
      key: 'footerPhone',
      label: 'Rodapé: clique no telefone comercial',
      section: 'Rodapé',
      category: 'footer',
      categoryLabel: 'Rodapé',
      description: 'Ação executada ao clicar no número de telefone exibido na coluna de consultoria do rodapé.',
      defaultVal:
        defaultSiteContent.buttonLinks?.footerPhone ||
        'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.',
      suggestedWhatsapp: `https://wa.me/${customPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
    },
    {
      key: 'footerEmail',
      label: 'Rodapé: clique no e-mail comercial',
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
    { id: 'gallery', label: 'Projetos', count: buttonDefinitions.filter((b) => b.category === 'gallery').length },
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
