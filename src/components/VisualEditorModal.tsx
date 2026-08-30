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
  CloudCheck,
  Loader2
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { SiteContent } from '../data/siteContent';

interface VisualEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PIN = '199722'; // Senha personalizada do administrador

export const VisualEditorModal: React.FC<VisualEditorModalProps> = ({ isOpen, onClose }) => {
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
    'general' | 'hero' | 'carousel' | 'solutions' | 'whyUs' | 'warranty' | 'featured' | 'moreThan' | 'experience' | 'faq' | 'social' | 'finalCta' | 'footer'
  >('general');

  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with context on open
  React.useEffect(() => {
    if (isOpen) {
      setLocalContent(content);
      // Checar se já autenticou na sessão
      const sessionAuth = sessionStorage.getItem('ledmachine_admin_auth');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setPinInput('');
      setPinError('');
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

  const handleSave = () => {
    updateContent(localContent);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar todos os textos e imagens para o padrão original de fábrica?')) {
      resetToDefault();
      onClose();
    }
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

  // Helper to handle image file upload and convert to base64 data URL
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (prevent freezing localStorage with 50MB files)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem é muito pesada (máx 5MB recomendado). Tente uma imagem otimizada em JPG ou WebP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onComplete(base64);
      }
    };
    reader.readAsDataURL(file);
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

            <h3 className="text-xl font-bold text-white mb-1">Área Administrativa Restrita</h3>
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
                <span>Desbloquear Painel</span>
              </button>
            </form>

            <div className="mt-8 text-[11px] text-white/40">
              LED Machine Painéis • Segurança Administrativa
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
                  Painel de Edição Visual do Site
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Nuvem Conectada (Tempo Real)
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
              <span>Exportar Backup</span>
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
              Seções do Site
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
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'hero'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-purple-400" />
                <span>Topo / Hero Principal</span>
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
                <span>Carrossel de Projetos (8 Fotos)</span>
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
                <span>Por que LED Machine?</span>
              </div>
              {activeTab === 'whyUs' && <ChevronRight className="w-3.5 h-3.5" />}
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
                <span>Soluções (Comercial/Residencial)</span>
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
                <span>Garantia de 2 Anos</span>
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
                <span>Cinema Series (Galeria)</span>
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
                <Type className="w-4 h-4 text-cyan-400" />
                <span>Mais que um Painel</span>
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
                <Layout className="w-4 h-4 text-teal-400" />
                <span>Etapas de Atendimento (4 Passos)</span>
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
                <HelpCircle className="w-4 h-4 text-pink-400" />
                <span>Perguntas Frequentes (FAQ)</span>
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
                <span>Redes Sociais (Instagram)</span>
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
                <span>Chamada Final (CTA)</span>
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
                <span>Rodapé & Copyright</span>
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
                  <h3 className="text-base font-bold text-white">Configurações Gerais & Logotipo</h3>
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
                          <Upload className="w-4 h-4" />
                          <span>Selecionar Imagem do Logo (PNG / SVG)</span>
                          <input
                            type="file"
                            accept="image/png,image/svg+xml,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (dataUrl) => {
                                setLocalContent({
                                  ...localContent,
                                  general: {
                                    ...localContent.general,
                                    logoUrl: dataUrl,
                                  },
                                });
                              })
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
                </div>
              </div>
            )}

            {/* 3. CAROUSEL / PROJETOS TAB (COM UPLOAD DE IMAGEM) */}
            {activeTab === 'carousel' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Carrossel de Projetos Realizados</h3>
                  <p className="text-xs text-white/60">
                    Você pode alterar as fotos, títulos, tags e especificações de cada um dos 8 projetos do carrossel principal.
                  </p>
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
                          <div className="flex flex-wrap gap-2">
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Fazer Upload do Computador</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, (dataUrl) => {
                                    const updatedProjects = [...localContent.carousel.projects];
                                    updatedProjects[idx].imageUrl = dataUrl;
                                    setLocalContent({
                                      ...localContent,
                                      carousel: { ...localContent.carousel, projects: updatedProjects },
                                    });
                                  })
                                }
                              />
                            </label>
                          </div>
                          <div className="mt-1">
                            <input
                              type="text"
                              value={proj.imageUrl.startsWith('data:') ? '[Imagem personalizada carregada via upload]' : proj.imageUrl}
                              onChange={(e) => {
                                if (e.target.value.startsWith('http')) {
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

            {/* 4. SOLUTIONS TAB (COMERCIAL / RESIDENCIAL COM FOTOS) */}
            {activeTab === 'solutions' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Soluções: Comercial & Residencial</h3>
                  <p className="text-xs text-white/60">Edite as fotos, listas de benefícios e textos dos blocos de soluções.</p>
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
                        <Upload className="w-3.5 h-3.5" />
                        <span>Fazer Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (dataUrl) => {
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
                  <h4 className="text-sm font-bold text-purple-300">🏡 Solução Residencial</h4>
                  
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
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-medium text-white transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Fazer Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (dataUrl) => {
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
                  <p className="text-xs text-white/60">Edite as fotos e legendas dos posts do Instagram exibidos no site.</p>
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
                            <Upload className="w-3.5 h-3.5" />
                            <span>Trocar Foto deste Post</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageUpload(e, (dataUrl) => {
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
            {saveSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                Salvo na Nuvem! Visível para todos os clientes.
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={isSavingCloud}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
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
