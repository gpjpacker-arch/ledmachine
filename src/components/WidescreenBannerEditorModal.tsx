import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  Cloud,
  Layers,
  Eye,
  Maximize2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { defaultSiteContent } from '../data/siteContent';
import { compressAndOptimizeImage } from '../utils/imageCompressor';
import curvedScreenImg from '../assets/images/curved_led_screen_1788647221773.jpg';
import curvedLivingImg from '../assets/images/led_curved_living_1788059274464.jpg';
import showroomBirdsImg from '../assets/images/led_showroom_birds_1788059359592.jpg';

interface WidescreenBannerEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WidescreenBannerEditorModal: React.FC<WidescreenBannerEditorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { content, updateField, isCloudSynced } = useSiteContent();

  const initialBanner = content.widescreenBanner || defaultSiteContent.widescreenBanner;
  const initialLink = content.buttonLinks?.widescreenBanner || defaultSiteContent.buttonLinks?.widescreenBanner || '#contato';

  const [formData, setFormData] = useState({
    badge: initialBanner.badge || 'Painel Curvo Fine-Pitch • Imersão Panorâmica 160°',
    tag: initialBanner.tag || 'Engenharia Visual em Todos os Ambientes',
    title: initialBanner.title || 'O Impacto Imersivo da Tela Curva sob Medida',
    description: initialBanner.description || '',
    ctaText: initialBanner.ctaText || 'Consultar Projeto',
    imageUrl: initialBanner.imageUrl || curvedScreenImg,
    feature1: initialBanner.features?.[0] || 'Curva Contínua',
    feature2: initialBanner.features?.[1] || '100% Sem Emendas',
    feature3: initialBanner.features?.[2] || 'Raio Personalizado',
    buttonLink: initialLink,
  });

  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      const banner = content.widescreenBanner || defaultSiteContent.widescreenBanner;
      const link = content.buttonLinks?.widescreenBanner || defaultSiteContent.buttonLinks?.widescreenBanner || '#contato';
      setFormData({
        badge: banner.badge || 'Painel Curvo Fine-Pitch • Imersão Panorâmica 160°',
        tag: banner.tag || 'Engenharia Visual em Todos os Ambientes',
        title: banner.title || 'O Impacto Imersivo da Tela Curva sob Medida',
        description: banner.description || '',
        ctaText: banner.ctaText || 'Consultar Projeto',
        imageUrl: banner.imageUrl || curvedScreenImg,
        feature1: banner.features?.[0] || 'Curva Contínua',
        feature2: banner.features?.[1] || '100% Sem Emendas',
        feature3: banner.features?.[2] || 'Raio Personalizado',
        buttonLink: link,
      });
      setSaveSuccess(false);
      setErrorMessage('');
    }
  }, [isOpen, content]);

  if (!isOpen) return null;

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    setErrorMessage('');
    try {
      const optimizedBase64 = await compressAndOptimizeImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
      });

      setFormData((prev) => ({
        ...prev,
        imageUrl: optimizedBase64,
      }));
    } catch (err: any) {
      console.error('Erro ao processar imagem do banner:', err);
      setErrorMessage(err.message || 'Erro ao processar imagem selecionada.');
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSave = () => {
    try {
      // Update widescreenBanner field
      updateField('widescreenBanner', {
        badge: formData.badge,
        tag: formData.tag,
        title: formData.title,
        subtitle: `${formData.feature1}, ${formData.feature2} e ${formData.feature3}`,
        description: formData.description,
        ctaText: formData.ctaText,
        imageUrl: formData.imageUrl,
        features: [formData.feature1, formData.feature2, formData.feature3],
      });

      // Update buttonLink if changed
      if (formData.buttonLink !== undefined) {
        updateField('buttonLinks', {
          ...(content.buttonLinks || defaultSiteContent.buttonLinks),
          widescreenBanner: formData.buttonLink,
        });
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      setErrorMessage('Erro ao salvar alterações.');
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar os textos e imagem do Banner Curvo para o padrão de fábrica?')) {
      const def = defaultSiteContent.widescreenBanner;
      const defLink = defaultSiteContent.buttonLinks?.widescreenBanner || '#contato';
      setFormData({
        badge: def.badge || 'Painel Curvo Fine-Pitch • Imersão Panorâmica 160°',
        tag: def.tag,
        title: def.title,
        description: def.description,
        ctaText: def.ctaText,
        imageUrl: curvedScreenImg,
        feature1: def.features?.[0] || 'Curva Contínua',
        feature2: def.features?.[1] || '100% Sem Emendas',
        feature3: def.features?.[2] || 'Raio Personalizado',
        buttonLink: defLink,
      });
    }
  };

  // Image Presets
  const imagePresets = [
    { label: 'Painel Curvo Panorâmico (Original)', url: curvedScreenImg },
    { label: 'Living Gourmet & Home Cinema', url: curvedLivingImg },
    { label: 'Showroom Arquitetônico', url: showroomBirdsImg },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Editar Painel Curvo (Texto & Imagem)
                {isCloudSynced && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-normal bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Cloud className="w-2.5 h-2.5" /> Nuvem Ativa
                  </span>
                )}
              </h2>
              <p className="text-xs text-zinc-400">
                Altere a imagem de fundo, títulos, descrição e link de ação deste banner
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Fechar editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* SECTION 1: BANNER IMAGE */}
          <div className="space-y-3 bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Imagem do Painel Curvo (Widescreen)
              </label>
              <span className="text-[11px] text-zinc-400">Recomendado: 1920x800 ou 16:9</span>
            </div>

            {/* Live Preview */}
            <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-inner group">
              <img
                src={formData.imageUrl}
                alt="Prévia do Banner"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              
              {/* Badge Preview */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{formData.badge || 'Cápsula de Destaque'}</span>
              </div>

              {/* Title Preview */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold block">
                  {formData.tag}
                </span>
                <p className="text-xs sm:text-sm font-bold text-white truncate">
                  {formData.title}
                </p>
              </div>

              {isProcessingImage && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-30">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-cyan-300 font-medium">Otimizando imagem...</span>
                </div>
              )}
            </div>

            {/* Upload Button and URL inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessingImage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Substituir Foto (Upload do Computador)</span>
                </button>
              </div>

              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 text-xs">
                    <LinkIcon className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Ou cole a URL da imagem aqui..."
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Presets Gallery */}
            <div className="pt-2">
              <span className="text-[11px] font-medium text-zinc-400 block mb-1.5">
                Fotos de Alta Resolução Disponíveis:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {imagePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                    className={`relative rounded-lg overflow-hidden border p-1 text-left transition-all ${
                      formData.imageUrl === preset.url
                        ? 'border-cyan-400 bg-cyan-500/10'
                        : 'border-white/10 bg-black/30 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-12 object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] text-zinc-300 mt-1 line-clamp-1 block">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: TEXTS AND LABELS */}
          <div className="space-y-4 bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Textos e Informações do Banner
            </label>

            {/* Badge and Tag */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-300 font-medium mb-1">
                  Cápsula Flutuante Superior (Badge)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Ex: Painel Curvo Fine-Pitch • Imersão Panorâmica 160°"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-300 font-medium mb-1">
                  Tag / Linha de Categoria (Cyan)
                </label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Ex: Engenharia Visual em Todos os Ambientes"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs text-zinc-300 font-medium mb-1">
                Título Principal
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: O Impacto Imersivo da Tela Curva sob Medida"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-zinc-300 font-medium mb-1">
                Descrição Detalhada
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Texto explicativo sobre o painel curvo, tecnologias e diferenciais arquitetônicos..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* 3 Tech Highlights */}
            <div>
              <label className="block text-xs text-zinc-300 font-medium mb-2">
                Destaques Técnicos Rápidos (Bloco com Ícones):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Layers className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={formData.feature1}
                    onChange={(e) => setFormData({ ...formData, feature1: e.target.value })}
                    placeholder="Destaque 1"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={formData.feature2}
                    onChange={(e) => setFormData({ ...formData, feature2: e.target.value })}
                    placeholder="Destaque 2"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={formData.feature3}
                    onChange={(e) => setFormData({ ...formData, feature3: e.target.value })}
                    placeholder="Destaque 3"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Button CTA Text & Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div>
                <label className="block text-xs text-zinc-300 font-medium mb-1">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="Ex: Consultar Projeto"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-300 font-medium mb-1">
                  Destino / Link do Botão
                </label>
                <input
                  type="text"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  placeholder="Ex: #contato ou https://wa.me/5547..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block">
                  Use '#contato' para abrir o formulário interno ou link de WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-t border-white/10 bg-white/[0.02]">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              id="btn-save-banner-editor"
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg ${
                saveSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-[#090a0f] hover:scale-105 active:scale-95'
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Salvo com Sucesso!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
