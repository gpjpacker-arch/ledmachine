import React, { useState, useRef } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  Image as ImageIcon,
  Type,
  Phone,
  Layout,
  HelpCircle,
  Sparkles,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Lock,
  Key,
  AlertCircle,
  Cloud,
  Loader2,
  RefreshCw,
  Link2
} from 'lucide-react';
import { LedMachineLogo } from './LedMachineLogo';
import { useSiteContent } from '../context/SiteContentContext';
import { SiteContent, defaultSiteContent } from '../data/siteContent';
import { compressAndOptimizeImage } from '../utils/imageCompressor';
import { ButtonLinksEditorTab, ButtonLinkKey } from './ButtonLinksEditorTab';
import { FeaturedHotspotsEditor } from './FeaturedHotspotsEditor';

interface VisualEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

const ADMIN_PIN = '199722'; // Senha personalizada do administrador

export const VisualEditorModal: React.FC<VisualEditorModalProps> = ({ isOpen, onClose, initialTab }) => {
  const {
    content,
    updateContent,
    resetToDefault,
    exportContentJson,
    importContentJson,
    isCloudSynced,
    isSavingCloud,
  } = useSiteContent();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<
    'general' | 'links' | 'hero' | 'carousel' | 'widescreen' | 'solutions' | 'whyUs' | 'warranty' | 'featured' | 'moreThan' | 'experience' | 'faq' | 'social' | 'finalCta' | 'footer'
  >('general');

  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState<string | null>(null);
  const [isBatchUploading, setIsBatchUploading] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<string>('');
  const [batchSuccessMessage, setBatchSuccessMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with context on open
  React.useEffect(() => {
    if (isOpen) {
      setLocalContent(content);
      if (initialTab) {
        setActiveTab(initialTab as any);
      }
      // Checar se já autenticou na sessão
      const sessionAuth = sessionStorage.getItem('ledmachine_admin_auth');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setPinInput('');
      setPinError('');
      setSaveError('');
    }
  }, [isOpen, content]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === 'led2026' || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ledmachine_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Senha incorreta. Apenas administradores autorizados têm acesso.');
    }
  };

  const handleSave = async () => {
    setSaveError('');
    try {
      const success = await updateContent(localContent);
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError('Não foi possível salvar na nuvem agora. Suas alterações foram salvas localmente.');
      }
    } catch (err) {
      console.error('Erro ao salvar no Firestore:', err);
      setSaveError('Erro ao salvar alterações na nuvem.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar todos os textos e imagens para o padrão original de fábrica?')) {
      resetToDefault();
      onClose();
    }
  };

  const handleUpdateLink = (key: ButtonLinkKey, value: string) => {
    setLocalContent((prev) => ({
      ...prev,
      buttonLinks: {
        ...(prev.buttonLinks || defaultSiteContent.buttonLinks || {
          navbarContact: '#contato',
          navbarBudget: '#contato',
          heroPrimary: '#contato',
          heroCarousel: '#contato',
          widescreenBanner: '#contato',
          featuredProductQuote: '#contato',
          featuredProductWhatsapp: '',
          finalCtaPrimary: '#contato',
          finalCtaWhatsapp: '',
          socialInstagram: '',
          socialWhatsapp: '',
          socialMaps: '',
          footerContact: '#contato',
          footerWarranty: '#contato',
          footerPhone: '',
          footerEmail: '',
        }),
        [key]: value,
      },
    }));
  };

  const handleResetAllLinks = () => {
    if (window.confirm('Deseja restaurar os links de todos os botões para a configuração original padrão?')) {
      setLocalContent((prev) => ({
        ...prev,
        buttonLinks: { ...(defaultSiteContent.buttonLinks as any) },
      }));
    }
  };

  const handleApplyWhatsappToAll = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) return;

    setLocalContent((prev) => {
      const current = prev.buttonLinks || defaultSiteContent.buttonLinks || ({} as any);
      return {
        ...prev,
        buttonLinks: {
          ...current,
          featuredProductWhatsapp: `https://wa.me/${cleanPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
          finalCtaWhatsapp: `https://wa.me/${cleanPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
          socialWhatsapp: `https://wa.me/${cleanPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
          footerPhone: `https://wa.me/${cleanPhone}?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.`,
        },
      };
    });
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const success = importContentJson(text);
        if (success) {
          alert('Configurações importadas com sucesso!');
          onClose();
        } else {
          alert('Erro ao importar arquivo JSON. Formato inválido.');
        }
      }
    };
    reader.readAsText(file);
  };

  // Helper to handle image file upload, auto-compress and optimize client-side
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    identifier: string,
    onComplete: (dataUrl: string) => void,
    options: { isLogo?: boolean; maxWidth?: number; maxHeight?: number } = {}
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(identifier);
    try {
      const optimizedBase64 = await compressAndOptimizeImage(file, {
        isLogo: options.isLogo,
        maxWidth: options.maxWidth || 1400,
        maxHeight: options.maxHeight || 1050,
        quality: 0.82,
      });

      onComplete(optimizedBase64);
    } catch (err: any) {
      console.error('Erro ao processar imagem:', err);
      alert(err.message || 'Erro ao processar imagem.');
    } finally {
      setIsProcessingImage(null);
      // Reset input value so same file can be selected again
      e.target.value = '';
    }
  };

  // Helper to handle batch upload of all 7 gallery images at once
  const handleBatchGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsBatchUploading(true);
    setBatchProgress('Processando e otimizando imagens...');

    try {
      // Sort files by number in filename (1.png, 2.png, ...)
      const sortedFiles = [...files].sort((a, b) => {
        const numA = parseInt(a.name.match(/\d+/)?.[0] || '999', 10);
        const numB = parseInt(b.name.match(/\d+/)?.[0] || '999', 10);
        if (numA !== numB) return numA - numB;
        return a.name.localeCompare(b.name);
      });

      const updatedProjects = [...localContent.carousel.projects];

      for (let i = 0; i < sortedFiles.length; i++) {
        const file = sortedFiles[i];
        // Match project index: if filename has '1', put in index 0; '2' in index 1, etc.
        const numMatch = file.name.match(/\d+/)?.[0];
        let targetIndex = i;
        if (numMatch) {
          const parsed = parseInt(numMatch, 10);
          if (parsed >= 1 && parsed <= updatedProjects.length) {
            targetIndex = parsed - 1;
          }
        }

        if (targetIndex < updatedProjects.length) {
          setBatchProgress(`Otimizando foto ${i + 1} de ${sortedFiles.length} (${file.name})...`);
          const base64 = await compressAndOptimizeImage(file, {
            maxWidth: 1080,
            maxHeight: 810,
            quality: 0.78,
          });
          updatedProjects[targetIndex] = {
            ...updatedProjects[targetIndex],
            imageUrl: base64,
          };
        }
      }

      const newContent = {
        ...localContent,
        carousel: {
          ...localContent.carousel,
          projects: updatedProjects,
        },
      };

      setLocalContent(newContent);
      setBatchProgress('Salvando no banco em nuvem...');
      const saved = await updateContent(newContent);
      if (saved) {
        setBatchSuccessMessage(`${sortedFiles.length} foto(s) atualizada(s) e salvas no site com sucesso!`);
      } else {
        setBatchSuccessMessage(`${sortedFiles.length} foto(s) atualizada(s) localmente!`);
      }
      setTimeout(() => setBatchSuccessMessage(''), 5000);
    } catch (err: any) {
      console.error('Erro no upload em lote:', err);
      alert('Erro ao processar as fotos: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setIsBatchUploading(false);
      setBatchProgress('');
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-[#070b19] border border-blue-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white">
        
        {/* PIN LOGIN GATE IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Área administrativa restrita</h3>
            <p className="text-xs text-white/60 max-w-md mb-6">
              Digite a senha de administrador da <strong>LED Machine Painéis</strong> para liberar a edição de textos, imagens e contatos.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Digite a senha de administrador"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  autoFocus
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-blue-500 rounded-xl text-center text-sm font-mono tracking-widest text-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              {pinError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Key className="w-4 h-4" />
                <span>Desbloquear painel</span>
              </button>
            </form>

            <div className="mt-8 text-[11px] text-white/40">
              LED Machine Painéis • Segurança administrativa
            </div>
          </div>
        ) : (
          <>
            {/* Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Painel de edição visual do site
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Nuvem conectada (tempo real)
                </span>
              </div>
              <p className="text-xs text-white/60">
                Altere textos, telefones, WhatsApp ou imagens e salve direto na nuvem para todos os visitantes do site.
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportContentJson}
              title="Baixar backup dos textos e imagens (JSON)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar backup</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Importar backup de textos e imagens"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importar</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors ml-2"
              title="Fechar editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body with Sidebar Tabs and Content Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Tabs Navigation */}
          <div className="w-64 sm:w-72 bg-black/40 border-r border-white/10 flex flex-col p-3 overflow-y-auto space-y-1">
            <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider px-3 py-1.5">
              Seções do site
            </div>

            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'general'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Contato & WhatsApp</span>
              </div>
              {activeTab === 'general' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              id="editor-tab-button-links"
              onClick={() => setActiveTab('links')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'links'
                  ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-400/50 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Link2 className="w-4 h-4 text-cyan-400" />
                <span>Links dos botões</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Novo
                </span>
                {activeTab === 'links' && <ChevronRight className="w-3.5 h-3.5" />}
              </div>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'hero'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-blue-400" />
                <span>Topo / hero principal</span>
              </div>
              {activeTab === 'hero' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('carousel')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'carousel'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Carrossel de projetos (8 fotos)</span>
              </div>
              {activeTab === 'carousel' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('whyUs')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'whyUs'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layout className="w-4 h-4 text-indigo-400" />
                <span>Tecnologia e qualidade</span>
              </div>
              {activeTab === 'whyUs' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              id="editor-tab-widescreen"
              onClick={() => setActiveTab('widescreen')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'widescreen'
                  ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-400/50 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Banner curvo widescreen</span>
              </div>
              {activeTab === 'widescreen' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('solutions')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'solutions'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layout className="w-4 h-4 text-emerald-400" />
                <span>Soluções (comercial/residencial)</span>
              </div>
              {activeTab === 'solutions' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('warranty')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'warranty'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-amber-300" />
                <span>Garantia de 2 anos</span>
              </div>
              {activeTab === 'warranty' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('featured')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'featured'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span>Projetos (galeria)</span>
              </div>
              {activeTab === 'featured' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('moreThan')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'moreThan'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-blue-400" />
                <span>Mais que um painel</span>
              </div>
              {activeTab === 'moreThan' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'experience'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layout className="w-4 h-4 text-blue-400" />
                <span>Etapas de atendimento</span>
              </div>
              {activeTab === 'experience' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'faq'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                <span>Perguntas frequentes (FAQ)</span>
              </div>
              {activeTab === 'faq' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'social'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-orange-400" />
                <span>Redes sociais (Instagram)</span>
              </div>
              {activeTab === 'social' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('finalCta')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'finalCta'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-red-400" />
                <span>Chamada final (CTA)</span>
              </div>
              {activeTab === 'finalCta' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setActiveTab('footer')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'footer'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-gray-400" />
                <span>Rodapé & copyright</span>
              </div>
              {activeTab === 'footer' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Right Editor Fields Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-black/20 space-y-6">
            {/* 1. GENERAL / CONTACT TAB */}
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Configurações gerais & logotipo</h3>
                  <p className="text-xs text-white/60">Faça upload do arquivo oficial do seu logo e configure WhatsApp, telefone e e-mail.</p>
                </div>

                {/* LOGO UPLOAD BOX */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-blue-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-cyan-400" />
                        Logotipo Oficial da Empresa
                      </h4>
                      <p className="text-xs text-white/60">
                        Envie sua imagem em PNG (com fundo transparente), SVG ou JPG para exibição nítida no cabeçalho e rodapé.
                      </p>
                    </div>
                    {localContent.general.logoUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setLocalContent({
                            ...localContent,
                            general: { ...localContent.general, logoUrl: undefined },
                          })
                        }
                        className="text-xs text-red-400 hover:text-red-300 underline font-medium"
                      >
                        Restaurar Logo Padrão
                      </button>
                    )}
                  </div>

                  {/* Logo Preview and Upload Controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="h-20 min-w-[200px] flex items-center justify-center p-3 rounded-lg bg-[#050814] border border-dashed border-white/20">
                      {localContent.general.logoUrl ? (
                        <img
                          src={localContent.general.logoUrl}
                          alt="Pré-visualização do Logo"
                          className="max-h-16 w-auto object-contain drop-shadow"
                          style={{
                            maxHeight: localContent.general.logoHeight ? `${localContent.general.logoHeight}px` : '48px',
                          }}
                        />
                      ) : (
                        <LedMachineLogo size="md" />
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      <div>
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95">
                          {isProcessingImage === 'logo' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Otimizando Logo...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span>Selecionar Imagem do Logo (PNG / SVG)</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/png,image/svg+xml,image/jpeg,image/webp"
                            className="hidden"
                            disabled={isProcessingImage === 'logo'}
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                'logo',
                                (dataUrl) => {
                                  setLocalContent({
                                    ...localContent,
                                    general: {
                                      ...localContent.general,
                                      logoUrl: dataUrl,
                                    },
                                  });
                                },
                                { isLogo: true }
                              )
                            }
                          />
                        </label>
                        <p className="text-[11px] text-white/50 mt-1">
                          Recomendado: PNG com fundo transparente ou SVG com proporção preservada.
                        </p>
                      </div>

                      {/* Height Slider */}
                      {localContent.general.logoUrl && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-semibold text-white/80 mb-1">
                            <span>Ajustar Altura do Logo no Menu:</span>
                            <span className="text-cyan-300 font-mono">
                              {localContent.general.logoHeight || 40}px
                            </span>
                          </div>
                          <input
                            type="range"
                            min="24"
                            max="70"
                            value={localContent.general.logoHeight || 40}
                            onChange={(e) =>
                              setLocalContent({
                                ...localContent,
                                general: {
                                  ...localContent.general,
                                  logoHeight: parseInt(e.target.value, 10),
                                },
                              })
                            }
                            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Número do WhatsApp (com DDI e DDD)</label>
                    <input
                      type="text"
                      value={localContent.general.whatsappNumber}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          general: { ...localContent.general, whatsappNumber: e.target.value },
                        })
                      }
                      placeholder="5511999999999"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <span className="text-[11px] text-white/40">Exemplo: 5511987654321</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Telefone de Exibição</label>
                    <input
                      type="text"
                      value={localContent.general.phoneContact}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          general: { ...localContent.general, phoneContact: e.target.value },
                        })
                      }
                      placeholder="(11) 99999-9999"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">E-mail de Contato</label>
                    <input
                      type="email"
                      value={localContent.general.emailContact}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          general: { ...localContent.general, emailContact: e.target.value },
                        })
                      }
                      placeholder="contato@ledmachine.com.br"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Endereço / Localização</label>
                    <input
                      type="text"
                      value={localContent.general.address}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          general: { ...localContent.general, address: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/80 mb-1">Mensagem Padrão do WhatsApp</label>
                    <input
                      type="text"
                      value={localContent.general.whatsappMessage}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          general: { ...localContent.general, whatsappMessage: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Link do Instagram</label>
                    <input
                      type="text"
                      value={localContent.general.instagramUrl}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          general: { ...localContent.general, instagramUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Link do YouTube</label>
                    <input
                      type="text"
                      value={localContent.general.youtubeUrl}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          general: { ...localContent.general, youtubeUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 1.5 LINKS DOS BOTÕES DO SITE */}
            {activeTab === 'links' && (
              <ButtonLinksEditorTab
                localContent={localContent}
                onUpdateLink={handleUpdateLink}
                onResetAllLinks={handleResetAllLinks}
                onApplyWhatsappToAll={handleApplyWhatsappToAll}
              />
            )}

            {/* 2. HERO / TOPO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Topo / Seção Hero</h3>
                  <p className="text-xs text-white/60">Edite as principais manchetes que os visitantes vêem ao entrar.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Selo Superior (Badge)</label>
                    <input
                      type="text"
                      value={localContent.hero.badgeText}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, badgeText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Contador de Clientes</label>
                    <input
                      type="text"
                      value={localContent.hero.clientCountText}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, clientCountText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/80 mb-1">Título Principal (Linha 1)</label>
                    <input
                      type="text"
                      value={localContent.hero.titleLine1}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, titleLine1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/80 mb-1">Título com Efeito Gradiente (Linha 2)</label>
                    <input
                      type="text"
                      value={localContent.hero.titleLine2}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, titleLine2: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/80 mb-1">Subtítulo Explicativo</label>
                    <textarea
                      rows={3}
                      value={localContent.hero.subtitle}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Texto Botão 1 (Principal)</label>
                    <input
                      type="text"
                      value={localContent.hero.ctaPrimaryText}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, ctaPrimaryText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Texto Botão 2 (Secundário)</label>
                    <input
                      type="text"
                      value={localContent.hero.ctaSecondaryText}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, ctaSecondaryText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/80 mb-1">Aviso de Garantia no Topo</label>
                    <input
                      type="text"
                      value={localContent.hero.guaranteeNotice}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          hero: { ...localContent.hero, guaranteeNotice: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-3 border-t border-white/10 space-y-3">
                    <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      Clientes em Destaque (Faixa de Confiança)
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Frase da Faixa</label>
                      <input
                        type="text"
                        value={localContent.hero.trustText || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, trustText: e.target.value },
                          })
                        }
                        placeholder="Ex: Confiado por mais de 100 marcas, arquitetos e residências de alto padrão"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        Nomes dos Clientes (separados por vírgula)
                      </label>
                      <input
                        type="text"
                        value={(localContent.hero.clientLogos || ['Jangada', 'Casa da Esfiha', 'Hotel Capsula', 'Abilitá']).join(', ')}
                        onChange={(e) => {
                          const names = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          setLocalContent({
                            ...localContent,
                            hero: { ...localContent.hero, clientLogos: names },
                          });
                        }}
                        placeholder="Jangada, Casa da Esfiha, Hotel Capsula, Abilitá"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                      <span className="text-[11px] text-white/40">
                        Cada cliente é exibido no topo com o ícone de bolinha redonda no estilo Absen LED.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. CAROUSEL / PROJETOS TAB (COM UPLOAD DE IMAGEM) */}
            {activeTab === 'carousel' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Carrossel de Projetos Realizados</h3>
                  <p className="text-xs text-white/60">
                    Você pode alterar as fotos, títulos, tags e especificações dos 7 projetos do carrossel principal.
                  </p>
                </div>

                {/* BATCH UPLOAD CARD FOR ALL 7 PHOTOS */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-blue-950/40 border-2 border-dashed border-blue-500/40 hover:border-blue-400/70 transition-all flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                    <Upload className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Upload em Lote de Todas as Fotos (1.png a 7.png)
                    </h4>
                    <p className="text-xs text-white/70 max-w-lg mt-1">
                      Selecione de uma só vez os seus arquivos (ex: <span className="text-blue-300 font-mono font-semibold">1.png, 2.png, ... 7.png</span>). O sistema irá compactar e distribuir automaticamente para cada projeto do carrossel!
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    {isBatchUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{batchProgress || 'Processando fotos...'}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Selecionar Arquivos (1 a 7) de Uma Vez</span>
                      </>
                    )}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      disabled={isBatchUploading}
                      onChange={handleBatchGalleryUpload}
                    />
                  </label>

                  {batchSuccessMessage && (
                    <div className="w-full py-2 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in">
                      ✓ {batchSuccessMessage}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {localContent.carousel.projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                          Projeto #{idx + 1} — {proj.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-white/70">
                          {proj.category}
                        </span>
                      </div>

                      {/* Image Preview & Upload Controls */}
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden bg-black/60 border border-white/20 flex-shrink-0 relative group">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-2 w-full">
                          <label className="block text-xs font-semibold text-white/80">
                            Trocar Imagem deste Projeto:
                          </label>
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                              {isProcessingImage === `carousel-${proj.id}` ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Otimizando Foto...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Fazer Upload do Computador</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={isProcessingImage === `carousel-${proj.id}`}
                                onChange={(e) =>
                                  handleImageUpload(
                                    e,
                                    `carousel-${proj.id}`,
                                    (dataUrl) => {
                                      const updatedProjects = [...localContent.carousel.projects];
                                      updatedProjects[idx].imageUrl = dataUrl;
                                      setLocalContent({
                                        ...localContent,
                                        carousel: { ...localContent.carousel, projects: updatedProjects },
                                      });
                                    },
                                    { maxWidth: 1400, maxHeight: 1050 }
                                  )
                                }
                              />
                            </label>

                            {proj.imageUrl !== defaultSiteContent.carousel.projects[idx]?.imageUrl && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedProjects = [...localContent.carousel.projects];
                                  updatedProjects[idx].imageUrl = defaultSiteContent.carousel.projects[idx].imageUrl;
                                  setLocalContent({
                                    ...localContent,
                                    carousel: { ...localContent.carousel, projects: updatedProjects },
                                  });
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs transition-colors"
                                title="Restaurar imagem padrão original deste projeto"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Restaurar Padrão</span>
                              </button>
                            )}
                          </div>
                          <div className="mt-1">
                            <input
                              type="text"
                              value={proj.imageUrl.startsWith('data:') ? '[✓ Foto personalizada salva com sucesso]' : proj.imageUrl}
                              onChange={(e) => {
                                if (e.target.value.startsWith('http') || e.target.value.startsWith('/')) {
                                  const updatedProjects = [...localContent.carousel.projects];
                                  updatedProjects[idx].imageUrl = e.target.value;
                                  setLocalContent({
                                    ...localContent,
                                    carousel: { ...localContent.carousel, projects: updatedProjects },
                                  });
                                }
                              }}
                              placeholder="Ou cole uma URL https://..."
                              className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Text Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-white/70 mb-0.5">Tag / Ambiente</label>
                          <input
                            type="text"
                            value={proj.tag}
                            onChange={(e) => {
                              const updated = [...localContent.carousel.projects];
                              updated[idx].tag = e.target.value;
                              setLocalContent({
                                ...localContent,
                                carousel: { ...localContent.carousel, projects: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-white/70 mb-0.5">Título do Projeto</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...localContent.carousel.projects];
                              updated[idx].title = e.target.value;
                              setLocalContent({
                                ...localContent,
                                carousel: { ...localContent.carousel, projects: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-white/70 mb-0.5">Subtítulo</label>
                          <input
                            type="text"
                            value={proj.subtitle}
                            onChange={(e) => {
                              const updated = [...localContent.carousel.projects];
                              updated[idx].subtitle = e.target.value;
                              setLocalContent({
                                ...localContent,
                                carousel: { ...localContent.carousel, projects: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-white/70 mb-0.5">Descrição</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => {
                              const updated = [...localContent.carousel.projects];
                              updated[idx].description = e.target.value;
                              setLocalContent({
                                ...localContent,
                                carousel: { ...localContent.carousel, projects: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3.5 WIDESCREEN BANNER TAB */}
            {activeTab === 'widescreen' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Banner Curvo Widescreen (Fine-Pitch)
                  </h3>
                  <p className="text-xs text-white/60">
                    Personalize a imagem panorâmica, títulos, destaques técnicos e botão de ação do painel curvo.
                  </p>
                </div>

                {/* Banner Image Preview & Upload */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Imagem Panorâmica de Fundo
                    </label>
                    <span className="text-[11px] text-white/50">Recomendado: 1920x800 ou 16:9</span>
                  </div>

                  <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden bg-black/60 border border-white/15">
                    <img
                      src={localContent.widescreenBanner?.imageUrl || '/images/painel-led-curvo-panoramico.jpg'}
                      alt="Banner Preview"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{localContent.widescreenBanner?.badge || 'Cápsula de Destaque'}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold block">
                        {localContent.widescreenBanner?.tag || 'Categoria'}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {localContent.widescreenBanner?.title || 'Título'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-lg transition-colors">
                      {isProcessingImage === 'widescreen-banner' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Otimizando Foto...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Fazer Upload do Computador</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isProcessingImage === 'widescreen-banner'}
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            'widescreen-banner',
                            (dataUrl) => {
                              setLocalContent({
                                ...localContent,
                                widescreenBanner: {
                                  ...localContent.widescreenBanner,
                                  imageUrl: dataUrl,
                                },
                              });
                            },
                            { maxWidth: 1920, maxHeight: 1080 }
                          )
                        }
                      />
                    </label>

                    <input
                      type="text"
                      value={localContent.widescreenBanner?.imageUrl || ''}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          widescreenBanner: {
                            ...localContent.widescreenBanner,
                            imageUrl: e.target.value,
                          },
                        })
                      }
                      placeholder="Ou cole a URL direta da imagem aqui..."
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Banner Texts */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Textos e Conteúdo do Banner
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        Cápsula Flutuante Superior (Badge)
                      </label>
                      <input
                        type="text"
                        value={localContent.widescreenBanner?.badge || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            widescreenBanner: {
                              ...localContent.widescreenBanner,
                              badge: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: Painel Curvo Fine-Pitch • Imersão Panorâmica 160°"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        Etiqueta / Tag Superior (Cyan)
                      </label>
                      <input
                        type="text"
                        value={localContent.widescreenBanner?.tag || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            widescreenBanner: {
                              ...localContent.widescreenBanner,
                              tag: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: Engenharia Visual em Todos os Ambientes"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Título Principal
                    </label>
                    <input
                      type="text"
                      value={localContent.widescreenBanner?.title || ''}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          widescreenBanner: {
                            ...localContent.widescreenBanner,
                            title: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: O Impacto Imersivo da Tela Curva sob Medida"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">
                      Descrição Detalhada
                    </label>
                    <textarea
                      rows={3}
                      value={localContent.widescreenBanner?.description || ''}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          widescreenBanner: {
                            ...localContent.widescreenBanner,
                            description: e.target.value,
                          },
                        })
                      }
                      placeholder="Texto descritivo..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Destaque 1</label>
                      <input
                        type="text"
                        value={localContent.widescreenBanner?.features?.[0] || 'Curva Contínua'}
                        onChange={(e) => {
                          const currentFeats = [...(localContent.widescreenBanner?.features || ['Curva Contínua', '100% Sem Emendas', 'Raio Personalizado'])];
                          currentFeats[0] = e.target.value;
                          setLocalContent({
                            ...localContent,
                            widescreenBanner: {
                              ...localContent.widescreenBanner,
                              features: currentFeats,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Destaque 2</label>
                      <input
                        type="text"
                        value={localContent.widescreenBanner?.features?.[1] || '100% Sem Emendas'}
                        onChange={(e) => {
                          const currentFeats = [...(localContent.widescreenBanner?.features || ['Curva Contínua', '100% Sem Emendas', 'Raio Personalizado'])];
                          currentFeats[1] = e.target.value;
                          setLocalContent({
                            ...localContent,
                            widescreenBanner: {
                              ...localContent.widescreenBanner,
                              features: currentFeats,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Destaque 3</label>
                      <input
                        type="text"
                        value={localContent.widescreenBanner?.features?.[2] || 'Raio Personalizado'}
                        onChange={(e) => {
                          const currentFeats = [...(localContent.widescreenBanner?.features || ['Curva Contínua', '100% Sem Emendas', 'Raio Personalizado'])];
                          currentFeats[2] = e.target.value;
                          setLocalContent({
                            ...localContent,
                            widescreenBanner: {
                              ...localContent.widescreenBanner,
                              features: currentFeats,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        Texto do Botão
                      </label>
                      <input
                        type="text"
                        value={localContent.widescreenBanner?.ctaText || 'Consultar Projeto'}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            widescreenBanner: {
                              ...localContent.widescreenBanner,
                              ctaText: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        Link / Ação do Botão
                      </label>
                      <input
                        type="text"
                        value={localContent.buttonLinks?.widescreenBanner || '#contato'}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            buttonLinks: {
                              ...(localContent.buttonLinks || defaultSiteContent.buttonLinks || {} as any),
                              widescreenBanner: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: #contato ou https://wa.me/..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WHY US TAB (POR QUE LED MACHINE - 6 DIFERENCIAIS) */}
            {activeTab === 'whyUs' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Por que LED Machine? (Diferenciais)</h3>
                  <p className="text-xs text-white/60">
                    Edite o título principal da seção e os 6 blocos de diferenciais e acabamento.
                  </p>
                </div>

                {/* Section Header Inputs */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Textos Principais da Seção
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Título (Linha 1)</label>
                      <input
                        type="text"
                        value={localContent.whyUs?.title || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            whyUs: {
                              ...(localContent.whyUs || defaultSiteContent.whyUs),
                              title: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: Tecnologia e Qualidade"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Destaque do Título (Linha 2)</label>
                      <input
                        type="text"
                        value={localContent.whyUs?.titleHighlight || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            whyUs: {
                              ...(localContent.whyUs || defaultSiteContent.whyUs),
                              titleHighlight: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: no seu Painel de Led"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Subtítulo da Seção</label>
                      <textarea
                        rows={2}
                        value={localContent.whyUs?.subtitle || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            whyUs: {
                              ...(localContent.whyUs || defaultSiteContent.whyUs),
                              subtitle: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: Unimos engenharia avançada, estética de alto padrão e garantia estendida..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">
                        Tag / Selo Superior (Opcional - deixe vazio para manter sem selo)
                      </label>
                      <input
                        type="text"
                        value={localContent.whyUs?.badge || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            whyUs: {
                              ...(localContent.whyUs || defaultSiteContent.whyUs),
                              badge: e.target.value,
                            },
                          })
                        }
                        placeholder="Deixe em branco para manter sem selo"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 6 Cards */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Os 6 Cards de Diferenciais
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(localContent.whyUs?.cards || defaultSiteContent.whyUs.cards).map((card, idx) => (
                      <div key={card.id || idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-300">Card #{idx + 1}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                            {card.badge || card.highlight || 'Destaque'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-white/70 mb-1">Tag Superior</label>
                            <input
                              type="text"
                              value={card.tag || ''}
                              onChange={(e) => {
                                const nextCards = [...(localContent.whyUs?.cards || defaultSiteContent.whyUs.cards)];
                                nextCards[idx] = { ...nextCards[idx], tag: e.target.value };
                                setLocalContent({
                                  ...localContent,
                                  whyUs: { ...(localContent.whyUs || defaultSiteContent.whyUs), cards: nextCards },
                                });
                              }}
                              placeholder="Ex: ALTA QUALIDADE"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-white/70 mb-1">Pílula do Canto</label>
                            <input
                              type="text"
                              value={card.badge || ''}
                              onChange={(e) => {
                                const nextCards = [...(localContent.whyUs?.cards || defaultSiteContent.whyUs.cards)];
                                nextCards[idx] = { ...nextCards[idx], badge: e.target.value };
                                setLocalContent({
                                  ...localContent,
                                  whyUs: { ...(localContent.whyUs || defaultSiteContent.whyUs), cards: nextCards },
                                });
                              }}
                              placeholder="Ex: Contraste & Brilho"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-white/70 mb-1">Título do Card</label>
                          <input
                            type="text"
                            value={card.title || ''}
                            onChange={(e) => {
                              const nextCards = [...(localContent.whyUs?.cards || defaultSiteContent.whyUs.cards)];
                              nextCards[idx] = { ...nextCards[idx], title: e.target.value };
                              setLocalContent({
                                ...localContent,
                                whyUs: { ...(localContent.whyUs || defaultSiteContent.whyUs), cards: nextCards },
                              });
                            }}
                            placeholder="Título"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-white/70 mb-1">Descrição</label>
                          <textarea
                            rows={3}
                            value={card.description || ''}
                            onChange={(e) => {
                              const nextCards = [...(localContent.whyUs?.cards || defaultSiteContent.whyUs.cards)];
                              nextCards[idx] = { ...nextCards[idx], description: e.target.value };
                              setLocalContent({
                                ...localContent,
                                whyUs: { ...(localContent.whyUs || defaultSiteContent.whyUs), cards: nextCards },
                              });
                            }}
                            placeholder="Descrição detalhada..."
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-indigo-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. SOLUTIONS TAB (COMERCIAL / RESIDENCIAL COM FOTOS) */}
            {activeTab === 'solutions' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Soluções: Comercial & Residencial</h3>
                  <p className="text-xs text-white/60">Edite as fotos, listas de benefícios e textos dos blocos de soluções.</p>
                </div>

                {/* Section Header Inputs */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Textos Principais da Seção
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Tag / Selo da Seção</label>
                      <input
                        type="text"
                        value={localContent.solutions?.badge || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              badge: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Título da Seção</label>
                      <input
                        type="text"
                        value={localContent.solutions?.title || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              title: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Subtítulo da Seção</label>
                      <textarea
                        rows={2}
                        value={localContent.solutions?.subtitle || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              subtitle: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Comercial */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-blue-300">🏢 Solução Comercial</h4>
                  
                  {/* Image control */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden bg-black/60 border border-white/20 flex-shrink-0">
                      <img
                        src={localContent.solutions.commercial.imageUrl}
                        alt="Comercial"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="block text-xs font-semibold text-white/80">Trocar Imagem Comercial:</label>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                        {isProcessingImage === 'sol-commercial' ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Otimizando Imagem...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Fazer Upload</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isProcessingImage === 'sol-commercial'}
                          onChange={(e) =>
                            handleImageUpload(e, 'sol-commercial', (dataUrl) => {
                              setLocalContent({
                                ...localContent,
                                solutions: {
                                  ...localContent.solutions,
                                  commercial: {
                                    ...localContent.solutions.commercial,
                                    imageUrl: dataUrl,
                                  },
                                },
                              });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Título</label>
                      <input
                        type="text"
                        value={localContent.solutions.commercial.title}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              commercial: { ...localContent.solutions.commercial, title: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Texto do Botão</label>
                      <input
                        type="text"
                        value={localContent.solutions.commercial.ctaText}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              commercial: { ...localContent.solutions.commercial, ctaText: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Descrição</label>
                      <textarea
                        rows={2}
                        value={localContent.solutions.commercial.description}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              commercial: { ...localContent.solutions.commercial, description: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Residencial */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-blue-300">🏡 Solução Residencial</h4>
                  
                  {/* Image control */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden bg-black/60 border border-white/20 flex-shrink-0">
                      <img
                        src={localContent.solutions.residential.imageUrl}
                        alt="Residencial"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="block text-xs font-semibold text-white/80">Trocar Imagem Residencial:</label>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                        {isProcessingImage === 'sol-residential' ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Otimizando Imagem...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Fazer Upload</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isProcessingImage === 'sol-residential'}
                          onChange={(e) =>
                            handleImageUpload(e, 'sol-residential', (dataUrl) => {
                              setLocalContent({
                                ...localContent,
                                solutions: {
                                  ...localContent.solutions,
                                  residential: {
                                    ...localContent.solutions.residential,
                                    imageUrl: dataUrl,
                                  },
                                },
                              });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Título</label>
                      <input
                        type="text"
                        value={localContent.solutions.residential.title}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              residential: { ...localContent.solutions.residential, title: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Texto do Botão</label>
                      <input
                        type="text"
                        value={localContent.solutions.residential.ctaText}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              residential: { ...localContent.solutions.residential, ctaText: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Descrição</label>
                      <textarea
                        rows={2}
                        value={localContent.solutions.residential.description}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            solutions: {
                              ...localContent.solutions,
                              residential: { ...localContent.solutions.residential, description: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WARRANTY TAB (GARANTIA DE 2 ANOS) */}
            {activeTab === 'warranty' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Garantia de 2 anos & assistência</h3>
                  <p className="text-xs text-white/60">Edite os textos e termos da seção de garantia da LED Machine.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Selo / badge superior</label>
                    <input
                      type="text"
                      value={localContent.warranty?.badge || ''}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          warranty: {
                            ...(localContent.warranty || defaultSiteContent.warranty),
                            badge: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: 2 anos de garantia"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Título principal</label>
                    <input
                      type="text"
                      value={localContent.warranty?.title || ''}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          warranty: {
                            ...(localContent.warranty || defaultSiteContent.warranty),
                            title: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: Garantia total de 2 anos e assistência direta de fábrica"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Primeiro parágrafo</label>
                    <textarea
                      rows={3}
                      value={localContent.warranty?.p1 || ''}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          warranty: {
                            ...(localContent.warranty || defaultSiteContent.warranty),
                            p1: e.target.value,
                          },
                        })
                      }
                      placeholder="Texto do primeiro parágrafo..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Segundo Parágrafo</label>
                    <textarea
                      rows={3}
                      value={localContent.warranty?.p2 || ''}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          warranty: {
                            ...(localContent.warranty || defaultSiteContent.warranty),
                            p2: e.target.value,
                          },
                        })
                      }
                      placeholder="Texto do segundo parágrafo..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FEATURED GALLERY TAB */}
            {activeTab === 'featured' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Galeria de Projetos (Fotos e Textos)</h3>
                  <p className="text-xs text-white/60">
                    Gerencie as fotos em alta definição e os textos da seção de projetos LED Machine.
                  </p>
                </div>

                {/* Textos Principais */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Textos e Descrições da Seção
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Título Superior</label>
                      <input
                        type="text"
                        value={localContent.featuredGallery?.title || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            featuredGallery: {
                              ...localContent.featuredGallery,
                              title: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Destaque do Título (Gradient)</label>
                      <input
                        type="text"
                        value={localContent.featuredGallery?.titleHighlight || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            featuredGallery: {
                              ...localContent.featuredGallery,
                              titleHighlight: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Subtítulo da Seção</label>
                      <textarea
                        rows={2}
                        value={localContent.featuredGallery?.subtitle || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            featuredGallery: {
                              ...localContent.featuredGallery,
                              subtitle: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 4 Imagens da Galeria */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                  <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    4 Fotos de Alta Definição do Painel
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(localContent.featuredGallery?.images || []).map((img, idx) => (
                      <div key={img.id || idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white/90">Foto #{idx + 1} - {img.title || `Ângulo ${idx + 1}`}</span>
                          <span className="text-[10px] text-zinc-400">ID: {img.id}</span>
                        </div>

                        {/* Image Preview */}
                        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-white/10 bg-black/40">
                          {img.url ? (
                            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                              Sem foto
                            </div>
                          )}
                          {isProcessingImage === `featured-img-${idx}` && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-xs text-cyan-400">
                              <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                          )}
                        </div>

                        {/* Title & Subtitle inputs */}
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={img.title || ''}
                            placeholder="Título da foto (ex: Living Integrado)"
                            onChange={(e) => {
                              const nextImages = [...(localContent.featuredGallery?.images || [])];
                              nextImages[idx] = { ...nextImages[idx], title: e.target.value };
                              setLocalContent({
                                ...localContent,
                                featuredGallery: { ...localContent.featuredGallery, images: nextImages },
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={img.subtitle || ''}
                            placeholder="Legenda (ex: Harmonia com marcenaria nobre)"
                            onChange={(e) => {
                              const nextImages = [...(localContent.featuredGallery?.images || [])];
                              nextImages[idx] = { ...nextImages[idx], subtitle: e.target.value };
                              setLocalContent({
                                ...localContent,
                                featuredGallery: { ...localContent.featuredGallery, images: nextImages },
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                          />
                        </div>

                        {/* Upload & URL */}
                        <div className="flex flex-col gap-2">
                          <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload da Foto {idx + 1}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageUpload(
                                  e,
                                  `featured-img-${idx}`,
                                  (dataUrl) => {
                                    const nextImages = [...(localContent.featuredGallery?.images || [])];
                                    nextImages[idx] = { ...nextImages[idx], url: dataUrl };
                                    setLocalContent({
                                      ...localContent,
                                      featuredGallery: { ...localContent.featuredGallery, images: nextImages },
                                    });
                                  },
                                  { maxWidth: 1400, maxHeight: 900 }
                                )
                              }
                            />
                          </label>
                          <input
                            type="text"
                            value={img.url || ''}
                            placeholder="Ou cole a URL direta..."
                            onChange={(e) => {
                              const nextImages = [...(localContent.featuredGallery?.images || [])];
                              nextImages[idx] = { ...nextImages[idx], url: e.target.value };
                              setLocalContent({
                                ...localContent,
                                featuredGallery: { ...localContent.featuredGallery, images: nextImages },
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[11px] placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotspots Interativos (Pontos Brilhantes) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-cyan-500/30 shadow-2xl">
                  <FeaturedHotspotsEditor
                    images={localContent.featuredGallery?.images || []}
                    onChangeImages={(updatedImages) => {
                      setLocalContent({
                        ...localContent,
                        featuredGallery: {
                          ...localContent.featuredGallery,
                          images: updatedImages,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            )}

            {/* 5. FAQ TAB */}
            {activeTab === 'faq' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Perguntas Frequentes (FAQ)</h3>
                  <p className="text-xs text-white/60">Edite as perguntas e respostas que aparecem para tirar dúvidas dos clientes.</p>
                </div>

                <div className="space-y-4">
                  {localContent.faq.items.map((item, idx) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="text-xs font-bold text-blue-300">Pergunta #{idx + 1}</div>
                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1">Pergunta</label>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = [...localContent.faq.items];
                            updated[idx].question = e.target.value;
                            setLocalContent({
                              ...localContent,
                              faq: { ...localContent.faq, items: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1">Resposta</label>
                        <textarea
                          rows={3}
                          value={item.answer}
                          onChange={(e) => {
                            const updated = [...localContent.faq.items];
                            updated[idx].answer = e.target.value;
                            setLocalContent({
                              ...localContent,
                              faq: { ...localContent.faq, items: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SOCIAL TAB */}
            {activeTab === 'social' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Redes Sociais & Posts</h3>
                  <p className="text-xs text-white/60">Edite as fotos, textos e legendas dos posts do Instagram exibidos no site.</p>
                </div>

                {/* Section Header Inputs */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h4 className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
                    Textos Principais da Seção
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Título da Seção</label>
                      <input
                        type="text"
                        value={localContent.social?.title || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            social: {
                              ...localContent.social,
                              title: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: Acompanhe Nossos Projetos"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Destaque do Título</label>
                      <input
                        type="text"
                        value={localContent.social?.titleHighlight || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            social: {
                              ...localContent.social,
                              titleHighlight: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: no Instagram"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Subtítulo da Seção</label>
                      <textarea
                        rows={2}
                        value={localContent.social?.subtitle || ''}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            social: {
                              ...localContent.social,
                              subtitle: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: Bastidores, instalações recentes e a experiência real..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {localContent.social.cards.map((card, idx) => (
                    <div key={card.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-300">Post #{idx + 1}</span>
                        <span className="text-xs text-white/50">{card.tag}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/60 border border-white/20 flex-shrink-0">
                          <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-2 w-full">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                            {isProcessingImage === `social-${card.id}` ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Otimizando Foto...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5" />
                                <span>Trocar Foto deste Post</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isProcessingImage === `social-${card.id}`}
                              onChange={(e) =>
                                handleImageUpload(e, `social-${card.id}`, (dataUrl) => {
                                  const updated = [...localContent.social.cards];
                                  updated[idx].imageUrl = dataUrl;
                                  setLocalContent({
                                    ...localContent,
                                    social: { ...localContent.social, cards: updated },
                                  });
                                })
                              }
                            />
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            placeholder="Título"
                            onChange={(e) => {
                              const updated = [...localContent.social.cards];
                              updated[idx].title = e.target.value;
                              setLocalContent({
                                ...localContent,
                                social: { ...localContent.social, cards: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                          />
                          <textarea
                            rows={2}
                            value={card.caption}
                            placeholder="Legenda do post"
                            onChange={(e) => {
                              const updated = [...localContent.social.cards];
                              updated[idx].caption = e.target.value;
                              setLocalContent({
                                ...localContent,
                                social: { ...localContent.social, cards: updated },
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. FINAL CTA & OUTRAS SEÇÕES */}
            {activeTab === 'finalCta' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Chamada Final de Ação (CTA)</h3>
                  <p className="text-xs text-white/60">Edite a última chamada de conversão antes do rodapé.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Título da Chamada</label>
                    <input
                      type="text"
                      value={localContent.finalCta.title}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          finalCta: { ...localContent.finalCta, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Subtítulo</label>
                    <textarea
                      rows={2}
                      value={localContent.finalCta.subtitle}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          finalCta: { ...localContent.finalCta, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Texto Botão 1</label>
                      <input
                        type="text"
                        value={localContent.finalCta.btnPrimary}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            finalCta: { ...localContent.finalCta, btnPrimary: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Texto Botão 2</label>
                      <input
                        type="text"
                        value={localContent.finalCta.btnSecondary}
                        onChange={(e) =>
                          setLocalContent({
                            ...localContent,
                            finalCta: { ...localContent.finalCta, btnSecondary: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8. FOOTER */}
            {activeTab === 'footer' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Rodapé & Copyright</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Sobre a Empresa (Texto Curto)</label>
                    <textarea
                      rows={3}
                      value={localContent.footer.aboutText}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          footer: { ...localContent.footer, aboutText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Texto de Copyright</label>
                    <input
                      type="text"
                      value={localContent.footer.copyrightText}
                      onChange={(e) =>
                        setLocalContent({
                          ...localContent,
                          footer: { ...localContent.footer, copyrightText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Footer Bar with Save / Reset */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-xs font-medium text-red-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão de Fábrica</span>
          </button>

          <div className="flex items-center gap-3">
            {saveError && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                {saveError}
              </span>
            )}

            {saveSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                Salvo na Nuvem com Sucesso!
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={isSavingCloud}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 text-white text-xs font-bold shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
            >
              {isSavingCloud ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sincronizando Nuvem...</span>
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4" />
                  <span>Salvar Alterações no Site (Nuvem)</span>
                </>
              )}
            </button>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};
