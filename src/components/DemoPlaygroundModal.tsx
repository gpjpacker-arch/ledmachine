import React, { useState } from 'react';
import { X, Tv, Layers, Ruler, Zap, Eye, Calculator, ArrowRight, Check } from 'lucide-react';
import { LedMachineLogo } from './LedMachineLogo';

interface DemoPlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuoteWithSpecs: (specsText: string) => void;
}

export const DemoPlaygroundModal: React.FC<DemoPlaygroundModalProps> = ({
  isOpen,
  onClose,
  onSelectQuoteWithSpecs,
}) => {
  const [environment, setEnvironment] = useState<'indoor' | 'outdoor' | 'rental'>('outdoor');
  const [width, setWidth] = useState<number>(4.0);
  const [height, setHeight] = useState<number>(2.5);
  const [pixelPitch, setPixelPitch] = useState<number>(3.91);

  if (!isOpen) return null;

  // Computations
  const totalArea = Number((width * height).toFixed(2));
  const pixelsHorizontal = Math.round((width * 1000) / pixelPitch);
  const pixelsVertical = Math.round((height * 1000) / pixelPitch);
  const totalPixels = pixelsHorizontal * pixelsVertical;
  const minViewingDist = Math.max(1, Math.round(pixelPitch));
  const cabinetCols = Math.ceil(width / 0.5);
  const cabinetRows = Math.ceil(height / 0.5);
  const totalCabinets = cabinetCols * cabinetRows;
  const estimatedPowerMax = Math.round(totalArea * 650); // ~650W/m² max
  const estimatedPowerAvg = Math.round(totalArea * 220); // ~220W/m² avg

  const handleGenerateQuote = () => {
    const specDetails = `Painel LED ${environment.toUpperCase()} | Dimensões: ${width}m x ${height}m (${totalArea}m²) | Pitch: P${pixelPitch} | Resolução: ${pixelsHorizontal}x${pixelsVertical}px (${totalPixels.toLocaleString()} pixels) | Gabinetes: ${totalCabinets} un. (500x500mm)`;
    onSelectQuoteWithSpecs(specDetails);
    onClose();
  };

  return (
    <div
      id="simulator-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        id="simulator-modal-content"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#09112d] border border-blue-500/30 p-6 md:p-8 shadow-[0_0_60px_rgba(37,99,235,0.35)] text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <LedMachineLogo size="sm" />
          <div className="h-6 w-[1px] bg-white/20" />
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Simulador de Dimensões & Resolução</span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Configure seu Painel de LED Sob Medida
        </h2>
        <p className="text-sm text-white/70 mb-8">
          Ajuste as medidas e o pixel pitch desejado para calcular a resolução real em pixels, área total e distância ideal de visualização.
        </p>

        {/* Grid Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (5 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Environment */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white uppercase tracking-wider">
                1. Ambiente de Aplicação
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'outdoor', label: 'Outdoor (IP65)', icon: Tv },
                  { id: 'indoor', label: 'Indoor (HD)', icon: Tv },
                  { id: 'rental', label: 'Rental (Shows)', icon: Layers },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setEnvironment(item.id as any);
                      if (item.id === 'indoor') setPixelPitch(2.5);
                      if (item.id === 'outdoor') setPixelPitch(3.91);
                      if (item.id === 'rental') setPixelPitch(2.9);
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      environment === item.id
                        ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-white">Largura (m)</span>
                  <span className="font-mono text-blue-300 font-bold">{width} m</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-white">Altura (m)</span>
                  <span className="font-mono text-blue-300 font-bold">{height} m</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={0.5}
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* 3. Pixel Pitch */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white uppercase tracking-wider">
                3. Pixel Pitch (Distância entre LEDs)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1.53, 1.86, 2.5, 2.9, 3.91, 4.81].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPixelPitch(p)}
                    className={`py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      pixelPitch === p
                        ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    P{p} mm
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Visual & Calculations Box (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 border border-blue-500/20 backdrop-blur-md space-y-6">
            {/* Visual Panel Display Aspect Ratio Box */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-white/70">
                <span>Visualização da Proporção</span>
                <span>{cabinetCols} x {cabinetRows} Gabinetes</span>
              </div>
              <div className="w-full h-44 sm:h-48 rounded-xl bg-[#040817] border border-blue-500/40 p-3 flex items-center justify-center relative overflow-hidden">
                {/* Subtle Grid / Measurement background in container */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Visual LED Matrix simulation with mathematically exact aspect ratio */}
                <div
                  className="bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-blue-950/90 border-2 border-blue-400 rounded-lg flex flex-col items-center justify-center relative shadow-[0_0_25px_rgba(37,99,235,0.45)] transition-all duration-300 overflow-hidden"
                  style={{
                    aspectRatio: `${width} / ${height}`,
                    height: (width / height) > 2.2 ? 'auto' : '88%',
                    width: (width / height) > 2.2 ? '90%' : 'auto',
                    maxWidth: '92%',
                    maxHeight: '90%',
                  }}
                >
                  {/* Subtle LED cabinet division lines overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${Math.min(cabinetCols, 16)}, 1fr)`,
                      gridTemplateRows: `repeat(${Math.min(cabinetRows, 12)}, 1fr)`,
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    {Array.from({ length: Math.min(cabinetCols, 16) * Math.min(cabinetRows, 12) }).map((_, i) => (
                      <div key={i} className="border border-white/20" />
                    ))}
                  </div>

                  <div className="relative z-10 text-center p-2 flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm font-black font-mono text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {width}m × {height}m
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-blue-200 drop-shadow">
                      {pixelsHorizontal} × {pixelsVertical} px
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics List */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-white/60 block">Área Total:</span>
                <span className="text-base font-bold text-white">{totalArea} m²</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-white/60 block">Resolução:</span>
                <span className="text-sm font-bold text-blue-300">{pixelsHorizontal} × {pixelsVertical}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-white/60 block">Distância Mínima:</span>
                <span className="text-base font-bold text-white">~{minViewingDist} metros</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-white/60 block">Consumo Médio:</span>
                <span className="text-base font-bold text-emerald-400">~{estimatedPowerAvg} W</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleGenerateQuote}
              className="w-full py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#070c20] font-bold text-sm transition-all shadow-[0_4px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.3)] border border-white flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <span>Solicitar Orçamento com Esta Configuração</span>
              <ArrowRight className="w-4 h-4 text-[#070c20]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
