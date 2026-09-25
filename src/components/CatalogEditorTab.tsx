import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Layers,
  Check,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import {
  CatalogCategory,
  CatalogCategoryData,
  ModelBoxItem,
  defaultCatalogData,
} from '../data/siteContent';
import { compressAndOptimizeImage } from '../utils/imageCompressor';

interface CatalogEditorTabProps {
  catalogData: Record<CatalogCategory, CatalogCategoryData>;
  onChange: (updatedCatalog: Record<CatalogCategory, CatalogCategoryData>) => void;
}

export const CatalogEditorTab: React.FC<CatalogEditorTabProps> = ({
  catalogData,
  onChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('residencial');
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(0);
  const [isProcessingImage, setIsProcessingImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploadTarget, setImageUploadTarget] = useState<{
    type: 'category' | 'model';
    catKey: CatalogCategory;
    modelIdx?: number;
  } | null>(null);

  const rawCatalog = (catalogData as any) || {};
  const safeData: Record<CatalogCategory, CatalogCategoryData> = {
    residencial: rawCatalog.residencial || defaultCatalogData.residencial,
    comercial: rawCatalog.comercial || defaultCatalogData.comercial,
  };
  const currentCategoryData = safeData[activeCategory] || defaultCatalogData[activeCategory];
  const currentModel =
    currentCategoryData?.models?.[selectedModelIdx] || currentCategoryData?.models?.[0];

  const handleUpdateCategoryField = (
    field: keyof CatalogCategoryData,
    value: any
  ) => {
    const updated = {
      ...safeData,
      [activeCategory]: {
        ...safeData[activeCategory],
        [field]: value,
      },
    };
    onChange(updated);
  };

  const handleUpdateModelField = (
    modelIdx: number,
    field: keyof ModelBoxItem,
    value: string
  ) => {
    const updatedModels = [...currentCategoryData.models];
    updatedModels[modelIdx] = {
      ...updatedModels[modelIdx],
      [field]: value,
    };
    const updated = {
      ...safeData,
      [activeCategory]: {
        ...safeData[activeCategory],
        models: updatedModels,
      },
    };
    onChange(updated);
  };

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !imageUploadTarget) return;

    const processKey = `${imageUploadTarget.type}_${imageUploadTarget.catKey}_${imageUploadTarget.modelIdx ?? ''}`;
    setIsProcessingImage(processKey);

    try {
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

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header da Aba */}
      <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Catálogo de Produtos (/catalogo)</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Apple Minimalist
            </span>
          </div>
          <p className="text-xs text-white/60">
            Edite as fotos e dados técnicos das caixas de produtos (Residencial e Comercial).
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Restaurar fotos e especificações do catálogo para o padrão original de fábrica?')) {
              onChange(defaultCatalogData);
            }
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar padrão do catálogo</span>
        </button>
      </div>

      {/* Seleção de Categoria */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(['residencial', 'comercial'] as CatalogCategory[]).map((catKey) => {
          const cat = safeData[catKey] || defaultCatalogData[catKey];
          const isActive = activeCategory === catKey;

          return (
            <button
              key={catKey}
              type="button"
              onClick={() => {
                setActiveCategory(catKey);
                setSelectedModelIdx(0);
              }}
              className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600/30 border-blue-500/50 shadow-md text-white'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-tight">{cat.name}</div>
                  <div className="text-[11px] text-white/50">{cat.models.length} modelos cadastrados</div>
                </div>
              </div>
              <Layers className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-white/40'}`} />
            </button>
          );
        })}
      </div>

      {/* Seção 1: Configuração do Banner da Categoria */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">
              Cartão Principal da Categoria
            </span>
            <h4 className="text-sm font-bold text-white">
              {currentCategoryData.name} — Cartão na Visão Geral
            </h4>
          </div>

          {/* Imagem da Categoria */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              Título da Categoria
            </label>
            <input
              type="text"
              value={currentCategoryData.title}
              onChange={(e) => handleUpdateCategoryField('title', e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              Subtítulo / Descrição da Linha
            </label>
            <input
              type="text"
              value={currentCategoryData.subtitle}
              onChange={(e) => handleUpdateCategoryField('subtitle', e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Seção 2: Modelos Individuais (Caixas do Estilo do Print) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Caixas dos Modelos ({currentCategoryData.name})
            </h4>
            <p className="text-xs text-white/60">
              Alterne entre os modelos para personalizar cada caixa com sua respectiva foto e dados de engenharia.
            </p>
          </div>
        </div>

        {/* Tabs dos Modelos */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {currentCategoryData.models.map((mod, idx) => (
            <button
              key={idx}
              type="button"
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

        {/* Detalhes do Modelo Selecionado */}
        {currentModel && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
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

            {/* Campos de Dados Técnicos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Nome do Modelo
                </label>
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
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Pitch (Distância entre pixels)
                </label>
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
                <label className="block text-xs font-semibold text-white/80 mb-1">
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
                <label className="block text-xs font-semibold text-white/80 mb-1">
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
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Pixels por módulo / gabinete
                </label>
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
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Consumo máx. estimado
                </label>
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
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Descrição Comercial / Aplicação Recomendada
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

      {/* Input de arquivo invisível */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
