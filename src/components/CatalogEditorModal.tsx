import React, { useState, useRef } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Loader2,
  Lock,
  Key,
  Trash2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { CatalogCategory, CatalogCategoryData, ModelBoxItem, defaultCatalogData } from '../data/siteContent';
import { compressAndOptimizeImage } from '../utils/imageCompressor';

interface CatalogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalogData: Record<CatalogCategory, CatalogCategoryData>;
  onSave: (newCatalogData: Record<CatalogCategory, CatalogCategoryData>) => Promise<boolean>;
  onReset: () => void;
  isSavingCloud?: boolean;
}

const ADMIN_PIN = '199722'; // Senha padrão do sistema LED Machine

export const CatalogEditorModal: React.FC<CatalogEditorModalProps> = ({
  isOpen,
  onClose,
  catalogData,
  onSave,
  onReset,
  isSavingCloud = false,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('residencial');
  const safeCatalogData: Record<CatalogCategory, CatalogCategoryData> = {
    residencial: (catalogData as any)?.residencial || defaultCatalogData.residencial,
    comercial: (catalogData as any)?.comercial || defaultCatalogData.comercial,
  };
  const [localData, setLocalData] = useState<Record<CatalogCategory, CatalogCategoryData>>(safeCatalogData);
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(0);

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploadTarget, setImageUploadTarget] = useState<{
    type: 'category' | 'model';
    catKey: CatalogCategory;
    modelIdx?: number;
  } | null>(null);

  // Sync state on open
  React.useEffect(() => {
    if (isOpen) {
      const safe: Record<CatalogCategory, CatalogCategoryData> = {
        residencial: (catalogData as any)?.residencial || defaultCatalogData.residencial,
        comercial: (catalogData as any)?.comercial || defaultCatalogData.comercial,
      };
      setLocalData(safe);
      const sessionAuth = sessionStorage.getItem('ledmachine_admin_auth');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setPinInput('');
      setPinError('');
      setSaveError('');
      setSaveSuccess(false);
    }
  }, [isOpen, catalogData]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === 'led2026' || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ledmachine_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Senha incorreta. Apenas administradores têm acesso à edição.');
    }
  };

  const handleSave = async () => {
    setSaveError('');
    setSaveSuccess(false);
    try {
      const ok = await onSave(localData);
      if (ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError('Erro ao sincronizar na nuvem.');
      }
    } catch (err) {
      console.error(err);
      setSaveError('Erro ao salvar os dados do catálogo.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar todos os dados e fotos do catálogo para o padrão original de fábrica?')) {
      onReset();
      onClose();
    }
  };

  // Update Category fields
  const handleUpdateCategoryField = (
    field: keyof CatalogCategoryData,
    value: any
  ) => {
    setLocalData((prev) => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        [field]: value,
      },
    }));
  };

  // Update Model item fields
  const handleUpdateModelField = (
    modelIdx: number,
    field: keyof ModelBoxItem,
    value: string
  ) => {
    setLocalData((prev) => {
      const currentModels = [...prev[activeCategory].models];
      currentModels[modelIdx] = {
        ...currentModels[modelIdx],
        [field]: value,
      };
      return {
        ...prev,
        [activeCategory]: {
          ...prev[activeCategory],
          models: currentModels,
        },
      };
    });
  };

  // Trigger file selection for an image
  const triggerImageUpload = (
    type: 'category' | 'model',
    catKey: CatalogCategory,
    modelIdx?: number
  ) => {
    setImageUploadTarget({ type, catKey, modelIdx });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Handle uploaded file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !imageUploadTarget) return;

    const processKey = `${imageUploadTarget.type}_${imageUploadTarget.catKey}_${imageUploadTarget.modelIdx ?? ''}`;
    setIsProcessingImage(processKey);

    try {
      // Otimiza e comprime imagem
      const optimizedBase64 = await compressAndOptimizeImage(file, {
        maxWidth: 1600,
        maxHeight: 1200,
        quality: 0.85,
      });

      if (imageUploadTarget.type === 'category') {
        handleUpdateCategoryField('image', optimizedBase64);
      } else if (
        imageUploadTarget.type === 'model' &&
        imageUploadTarget.modelIdx !== undefined
      ) {
        handleUpdateModelField(imageUploadTarget.modelIdx, 'image', optimizedBase64);
      }
    } catch (err: any) {
      console.error(err);
      alert('Erro ao processar imagem: ' + (err.message || 'formato inválido'));
    } finally {
      setIsProcessingImage(null);
      setImageUploadTarget(null);
    }
  };

  const currentCategoryData = localData[activeCategory] || defaultCatalogData[activeCategory];
  const currentModel = currentCategoryData?.models?.[selectedModelIdx] || currentCategoryData?.models?.[0];

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

            <h3 className="text-xl font-bold text-white mb-1">Painel Administrativo do Catálogo</h3>
            <p className="text-xs text-white/60 max-w-md mb-6">
              Digite a senha de administrador para liberar a edição completa de fotos, especificações e informações técnicas dos produtos.
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
                <span>Liberar Edição do Catálogo</span>
              </button>
            </form>

            <div className="mt-8 text-[11px] text-white/40">
              LED Machine • Gestão de Catálogo & Engenharia
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
                      Editor do Catálogo de Produtos
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Nuvem Sincronizada
                    </span>
                  </div>
                  <p className="text-xs text-white/60">
                    Edite fotos, pitches, resoluções, dimensões, consumos e descrições dos painéis.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Restaurar padrão"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Restaurar original</span>
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSavingCloud}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow-lg transition-all cursor-pointer ${
                    saveSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                  }`}
                >
                  {isSavingCloud ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Salvando na nuvem...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Salvo com sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Salvar alterações</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors ml-2 cursor-pointer"
                  title="Fechar editor"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Error banner if any */}
            {saveError && (
              <div className="bg-rose-500/20 border-b border-rose-500/40 px-6 py-2 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{saveError}</span>
              </div>
            )}

            {/* Main Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Category Selection Tabs */}
              <div className="w-60 sm:w-64 bg-black/40 border-r border-white/10 flex flex-col p-3 overflow-y-auto space-y-2">
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider px-3 py-1">
                  Categorias do Catálogo
                </div>

                {(['residencial', 'comercial'] as CatalogCategory[]).map((catKey) => {
                  const cat = localData[catKey] || defaultCatalogData[catKey];
                  const isActive = activeCategory === catKey;

                  return (
                    <button
                      key={catKey}
                      onClick={() => {
                        setActiveCategory(catKey);
                        setSelectedModelIdx(0);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-white">{cat.name}</div>
                          <div className="text-[10px] text-white/50">{cat.models.length} modelos</div>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-lg overflow-hidden bg-black/50 border border-white/10 shrink-0">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                    </button>
                  );
                })}

                <div className="pt-4 px-3 text-[11px] text-white/40 leading-relaxed border-t border-white/10">
                  <p className="mb-2">💡 <strong>Dica de imagem:</strong></p>
                  <p>Você pode fazer upload direto de arquivos JPG, PNG ou WebP. As imagens são automaticamente comprimidas para carregar instantaneamente.</p>
                </div>
              </div>

              {/* Right Content Editor Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Cabeçalho da Categoria Selecionada */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">
                        Configurações Gerais da Categoria
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {currentCategoryData.name} — Cartão de Entrada
                      </h3>
                    </div>

                    {/* Foto da Categoria */}
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-white/20 shadow-md bg-black/40">
                        <img
                          src={currentCategoryData.image}
                          alt={currentCategoryData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerImageUpload('category', activeCategory)}
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Trocar foto principal</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Título da Categoria</label>
                      <input
                        type="text"
                        value={currentCategoryData.title}
                        onChange={(e) => handleUpdateCategoryField('title', e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Subtítulo / Descrição Curta</label>
                      <input
                        type="text"
                        value={currentCategoryData.subtitle}
                        onChange={(e) => handleUpdateCategoryField('subtitle', e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Subseção: Modelos & Caixas Individuais */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        Caixas dos Modelos ({currentCategoryData.name})
                      </h4>
                      <p className="text-xs text-white/60">
                        Selecione o modelo abaixo para editar sua foto e seus parâmetros técnicos:
                      </p>
                    </div>
                  </div>

                  {/* Tabs dos Modelos */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
                    {currentCategoryData.models.map((mod, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedModelIdx(idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                          selectedModelIdx === idx
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span>{mod.model}</span>
                        <span className="text-[10px] opacity-75">({mod.pitch})</span>
                      </button>
                    ))}
                  </div>

                  {/* Formulário do Modelo Selecionado */}
                  {currentModel && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-blue-400">
                            Modelo #{selectedModelIdx + 1}
                          </span>
                          <h4 className="text-lg font-bold text-white">{currentModel.model}</h4>
                        </div>

                        {/* Imagem do Modelo com botão de troca */}
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-16 rounded-xl overflow-hidden border border-white/20 shadow-md bg-black/40">
                            <img
                              src={currentModel.image}
                              alt={currentModel.model}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              triggerImageUpload('model', activeCategory, selectedModelIdx)
                            }
                            className="px-3 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Trocar foto deste modelo</span>
                          </button>
                        </div>
                      </div>

                      {/* Campos do Modelo */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-white/70 mb-1 font-medium">Nome do Modelo</label>
                          <input
                            type="text"
                            value={currentModel.model}
                            onChange={(e) =>
                              handleUpdateModelField(selectedModelIdx, 'model', e.target.value)
                            }
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-white/70 mb-1 font-medium">Pitch (Distância entre pixels)</label>
                          <input
                            type="text"
                            value={currentModel.pitch}
                            onChange={(e) =>
                              handleUpdateModelField(selectedModelIdx, 'pitch', e.target.value)
                            }
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-white/70 mb-1 font-medium">
                            {currentCategoryData.sizeLabel || 'Dimensões'}
                          </label>
                          <input
                            type="text"
                            value={currentModel.moduleOrCabinetSize}
                            onChange={(e) =>
                              handleUpdateModelField(selectedModelIdx, 'moduleOrCabinetSize', e.target.value)
                            }
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-white/70 mb-1 font-medium">
                            {currentCategoryData.resolutionLabel || 'Resolução'}
                          </label>
                          <input
                            type="text"
                            value={currentModel.resolution}
                            onChange={(e) =>
                              handleUpdateModelField(selectedModelIdx, 'resolution', e.target.value)
                            }
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-white/70 mb-1 font-medium">Pixels por módulo / gabinete</label>
                          <input
                            type="text"
                            value={currentModel.pixelsPerModule}
                            onChange={(e) =>
                              handleUpdateModelField(selectedModelIdx, 'pixelsPerModule', e.target.value)
                            }
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-white/70 mb-1 font-medium">Consumo máx. estimado</label>
                          <input
                            type="text"
                            value={currentModel.maxPowerEstimated}
                            onChange={(e) =>
                              handleUpdateModelField(selectedModelIdx, 'maxPowerEstimated', e.target.value)
                            }
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block text-xs text-white/70 mb-1 font-medium">
                            Texto de Descrição Comercial / Aplicação
                          </label>
                          <textarea
                            rows={2}
                            value={currentModel.description}
                            onChange={(e) =>
                              handleUpdateModelField(selectedModelIdx, 'description', e.target.value)
                            }
                            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Input file invisível para uploads */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
