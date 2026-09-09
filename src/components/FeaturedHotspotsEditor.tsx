import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  Move,
  Info,
  Check,
  MousePointerClick
} from 'lucide-react';
import { GalleryImageItem, GalleryHotspot, defaultGalleryHotspots } from '../data/siteContent';

interface FeaturedHotspotsEditorProps {
  images: GalleryImageItem[];
  onChangeImages: (updatedImages: GalleryImageItem[]) => void;
}

export const FeaturedHotspotsEditor: React.FC<FeaturedHotspotsEditorProps> = ({
  images,
  onChangeImages,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [selectedHotspotIdx, setSelectedHotspotIdx] = useState<number>(0);
  const [justMovedMsg, setJustMovedMsg] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);

  const currentImage: GalleryImageItem = images[selectedImageIdx] || {
    id: selectedImageIdx + 1,
    title: `Foto ${selectedImageIdx + 1}`,
    subtitle: '',
    url: '',
    showHotspots: true,
    hotspots: defaultGalleryHotspots[selectedImageIdx] || [],
  };

  const currentHotspots: GalleryHotspot[] =
    currentImage.hotspots !== undefined
      ? currentImage.hotspots
      : defaultGalleryHotspots[selectedImageIdx] || [];

  const isShowingHotspots = currentImage.showHotspots !== false;

  const updateCurrentImageHotspots = (
    newHotspots: GalleryHotspot[],
    newShowHotspots: boolean = isShowingHotspots
  ) => {
    const nextImages = [...images];
    while (nextImages.length <= selectedImageIdx) {
      nextImages.push({
        id: nextImages.length + 1,
        title: `Foto ${nextImages.length + 1}`,
        subtitle: '',
        url: '',
        showHotspots: true,
        hotspots: defaultGalleryHotspots[nextImages.length] || [],
      });
    }

    nextImages[selectedImageIdx] = {
      ...nextImages[selectedImageIdx],
      showHotspots: newShowHotspots,
      hotspots: newHotspots,
    };

    onChangeImages(nextImages);
  };

  // Click on preview to position the selected hotspot
  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentHotspots.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.round(Math.max(3, Math.min(97, rawX)));
    const clampedY = Math.round(Math.max(5, Math.min(95, rawY)));

    const activeIdx = Math.min(selectedHotspotIdx, currentHotspots.length - 1);
    const updated = currentHotspots.map((h, i) =>
      i === activeIdx ? { ...h, x: clampedX, y: clampedY } : h
    );

    updateCurrentImageHotspots(updated);
    setJustMovedMsg(`Ponto #${activeIdx + 1} posicionado em X: ${clampedX}% | Y: ${clampedY}%`);
    setTimeout(() => setJustMovedMsg(''), 2500);
  };

  const handleUpdateHotspotField = (
    hotspotIdx: number,
    field: keyof GalleryHotspot,
    value: any
  ) => {
    const updated = currentHotspots.map((h, i) => {
      if (i !== hotspotIdx) return h;
      return { ...h, [field]: value };
    });
    updateCurrentImageHotspots(updated);
  };

  const handleAddHotspot = () => {
    const newPoint: GalleryHotspot = {
      x: 50,
      y: 50,
      label: `Novo Ponto ${currentHotspots.length + 1}`,
      desc: 'Descrição técnica do elemento em destaque no painel LED.',
    };
    const next = [...currentHotspots, newPoint];
    updateCurrentImageHotspots(next, true);
    setSelectedHotspotIdx(next.length - 1);
  };

  const handleDeleteHotspot = (idx: number) => {
    const next = currentHotspots.filter((_, i) => i !== idx);
    updateCurrentImageHotspots(next);
    if (selectedHotspotIdx >= next.length) {
      setSelectedHotspotIdx(Math.max(0, next.length - 1));
    }
  };

  const handleResetDefaults = () => {
    const defaults = defaultGalleryHotspots[selectedImageIdx] || [];
    updateCurrentImageHotspots(defaults, true);
    setSelectedHotspotIdx(0);
    setJustMovedMsg('Pontos originais restaurados!');
    setTimeout(() => setJustMovedMsg(''), 2500);
  };

  const activeHotspotData = currentHotspots[selectedHotspotIdx];

  return (
    <div className="space-y-6">
      {/* Header & Explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Editor de Pontos Brilhantes (Hotspots Interativos)</span>
          </h4>
          <p className="text-xs text-white/60">
            Ajuste as posições dos marcadores brilhantes de cada uma das fotos dos projetos da LED Machine.
          </p>
        </div>

        {/* Global Reset of this photo */}
        <button
          type="button"
          onClick={handleResetDefaults}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Padrões Desta Foto</span>
        </button>
      </div>

      {/* 4 Photos Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {images.slice(0, 4).map((img, idx) => {
          const isSel = selectedImageIdx === idx;
          const count = img.hotspots ? img.hotspots.length : (defaultGalleryHotspots[idx]?.length || 0);
          const visible = img.showHotspots !== false;

          return (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => {
                setSelectedImageIdx(idx);
                setSelectedHotspotIdx(0);
              }}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                isSel
                  ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/5 hover:text-white/90'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold truncate">Foto #{idx + 1}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium ${
                    visible ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-white/40'
                  }`}
                >
                  {visible ? `${count} pts` : 'Oculto'}
                </span>
              </div>
              <p className="text-[11px] truncate opacity-80">{img.title || `Ângulo ${idx + 1}`}</p>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Click-to-Position Canvas (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/90">
                Visualizador Interativo (Foto #{selectedImageIdx + 1})
              </span>
              {justMovedMsg && (
                <span className="text-[11px] text-emerald-400 font-medium animate-in fade-in flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {justMovedMsg}
                </span>
              )}
            </div>

            {/* Visibility Toggle */}
            <button
              type="button"
              onClick={() => updateCurrentImageHotspots(currentHotspots, !isShowingHotspots)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isShowingHotspots
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
              }`}
            >
              {isShowingHotspots ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pontos Visíveis</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Pontos Ocultos</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Image Container */}
          <div
            ref={previewRef}
            onClick={handlePreviewClick}
            className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl cursor-crosshair group/canvas select-none"
            title="Clique em qualquer lugar da imagem para mover o ponto selecionado"
          >
            {currentImage.url ? (
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="w-full h-full object-cover pointer-events-none"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                Sem imagem configurada
              </div>
            )}

            {/* Subtle Crosshair grid guides */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

            {/* Hotspots Rendered on Canvas */}
            {isShowingHotspots &&
              currentHotspots.map((hotspot, idx) => {
                const isSelected = selectedHotspotIdx === idx;
                return (
                  <div
                    key={idx}
                    style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspotIdx(idx);
                    }}
                  >
                    <div className="relative group/pin">
                      <button
                        type="button"
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-transform duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-500 text-white scale-125 ring-4 ring-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.9)] z-30'
                            : 'bg-white/90 text-blue-900 hover:scale-110 shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current animate-ping opacity-75 absolute" />
                        <span className="relative z-10">{idx + 1}</span>
                      </button>

                      {/* Tooltip on Canvas */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 rounded-xl bg-[#080d22]/95 border border-blue-400/40 shadow-2xl backdrop-blur-md text-left transition-all pointer-events-none ${
                          isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover/pin:opacity-100 group-hover/pin:scale-100'
                        }`}
                      >
                        <p className="text-xs font-bold text-blue-400 truncate">
                          #{idx + 1} {hotspot.label || 'Sem título'}
                        </p>
                        <p className="text-[10px] text-white/70 line-clamp-2">{hotspot.desc}</p>
                        <p className="text-[9px] text-white/40 mt-1 font-mono">
                          X: {hotspot.x}% • Y: {hotspot.y}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Instruction helper banner at bottom */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-[11px] text-white/80 pointer-events-none">
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <MousePointerClick className="w-3.5 h-3.5" />
                <span>Clique na foto para mover o Ponto #{selectedHotspotIdx + 1}</span>
              </div>
              <span className="text-[10px] text-white/50">
                {currentHotspots.length} pontos nesta imagem
              </span>
            </div>
          </div>
        </div>

        {/* Right: Point Selector & Coordinates Fine-Tuning (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Point Selection Pills */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/90">Pontos Desta Imagem</span>
              <button
                type="button"
                onClick={handleAddHotspot}
                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Ponto</span>
              </button>
            </div>

            {currentHotspots.length === 0 ? (
              <div className="text-center py-4 text-xs text-white/40">
                Nenhum ponto nesta foto.{' '}
                <button
                  type="button"
                  onClick={handleAddHotspot}
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  Clique aqui para adicionar
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {currentHotspots.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedHotspotIdx(i)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                      selectedHotspotIdx === i
                        ? 'bg-blue-600 border-blue-400 text-white shadow-md scale-[1.03]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="truncate max-w-[110px]">{h.label || `Ponto ${i + 1}`}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Editor for Selected Hotspot */}
          {activeHotspotData && (
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5" />
                  <span>Editando Ponto #{selectedHotspotIdx + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteHotspot(selectedHotspotIdx)}
                  className="text-red-400 hover:text-red-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer hover:underline"
                  title="Remover este ponto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Excluir Ponto</span>
                </button>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Título / Destaque do Ponto
                  </label>
                  <input
                    type="text"
                    value={activeHotspotData.label || ''}
                    placeholder="Ex: Módulos Fine-Pitch P1.5"
                    onChange={(e) =>
                      handleUpdateHotspotField(selectedHotspotIdx, 'label', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Descrição Técnica (Ao Clicar no Ponto)
                  </label>
                  <textarea
                    rows={2}
                    value={activeHotspotData.desc || ''}
                    placeholder="Ex: Densidade de pixels ultrafina para visualização nítida..."
                    onChange={(e) =>
                      handleUpdateHotspotField(selectedHotspotIdx, 'desc', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Precise Position Sliders & Inputs */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <span className="text-[11px] font-semibold text-white/70 block">
                  Ajuste Fino de Coordenadas
                </span>

                {/* X Coordinate */}
                <div>
                  <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                    <span>Posição Horizontal (X)</span>
                    <span className="font-mono text-cyan-300 font-bold">{activeHotspotData.x}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={2}
                      max={98}
                      value={activeHotspotData.x}
                      onChange={(e) =>
                        handleUpdateHotspotField(selectedHotspotIdx, 'x', Number(e.target.value))
                      }
                      className="flex-1 accent-cyan-400 cursor-pointer"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={activeHotspotData.x}
                      onChange={(e) =>
                        handleUpdateHotspotField(
                          selectedHotspotIdx,
                          'x',
                          Math.max(0, Math.min(100, Number(e.target.value)))
                        )
                      }
                      className="w-16 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-center text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Y Coordinate */}
                <div>
                  <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                    <span>Posição Vertical (Y)</span>
                    <span className="font-mono text-cyan-300 font-bold">{activeHotspotData.y}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={2}
                      max={98}
                      value={activeHotspotData.y}
                      onChange={(e) =>
                        handleUpdateHotspotField(selectedHotspotIdx, 'y', Number(e.target.value))
                      }
                      className="flex-1 accent-cyan-400 cursor-pointer"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={activeHotspotData.y}
                      onChange={(e) =>
                        handleUpdateHotspotField(
                          selectedHotspotIdx,
                          'y',
                          Math.max(0, Math.min(100, Number(e.target.value)))
                        )
                      }
                      className="w-16 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-center text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
