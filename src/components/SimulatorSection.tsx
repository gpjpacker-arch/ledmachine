import React, { useState } from 'react';
import {
  Calculator,
  Tv,
  Layers,
  Zap,
  Eye,
  ArrowRight,
  MessageCircle,
  Maximize2,
  Boxes,
  Sliders,
  Plus,
  Minus,
  Sparkles,
  Scale,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface SimulatorSectionProps {
  onRequestQuoteWithSpecs: (specsText: string) => void;
  onDirectWhatsapp?: (specsText: string) => void;
}

interface PresetOption {
  id: string;
  name: string;
  width: number;
  height: number;
  pitch: number;
  environment: 'indoor' | 'outdoor' | 'rental';
}

const PRESETS: PresetOption[] = [
  {
    id: 'cinema',
    name: 'Home cinema 16:9',
    width: 3.5,
    height: 2.0,
    pitch: 1.53,
    environment: 'indoor',
  },
  {
    id: 'outdoor_billboard',
    name: 'Outdoor comercial',
    width: 6.0,
    height: 3.5,
    pitch: 3.91,
    environment: 'outdoor',
  },
  {
    id: 'corporate',
    name: 'Sala de reunião',
    width: 3.0,
    height: 1.7,
    pitch: 1.86,
    environment: 'indoor',
  },
  {
    id: 'vitrine',
    name: 'Vitrine de loja',
    width: 2.0,
    height: 3.0,
    pitch: 2.5,
    environment: 'indoor',
  },
  {
    id: 'rental_event',
    name: 'Palco & eventos',
    width: 8.0,
    height: 4.5,
    pitch: 2.9,
    environment: 'rental',
  },
];

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({
  onRequestQuoteWithSpecs,
  onDirectWhatsapp,
}) => {
  const { content } = useSiteContent();
  const [environment, setEnvironment] = useState<'indoor' | 'outdoor' | 'rental'>('indoor');
  const [width, setWidth] = useState<number>(3.5);
  const [height, setHeight] = useState<number>(2.0);
  const [pixelPitch, setPixelPitch] = useState<number>(1.53);
  const [activePreset, setActivePreset] = useState<string>('cinema');

  // Calculations
  const totalArea = Number((width * height).toFixed(2));
  const pixelsHorizontal = Math.round((width * 1000) / pixelPitch);
  const pixelsVertical = Math.round((height * 1000) / pixelPitch);
  const totalPixels = pixelsHorizontal * pixelsVertical;
  const minViewingDist = Math.max(1, parseFloat((pixelPitch * 0.9).toFixed(1)));
  const cabinetCols = Math.ceil(width / 0.5);
  const cabinetRows = Math.ceil(height / 0.5);
  const totalCabinets = cabinetCols * cabinetRows;
  const estimatedPowerAvg = Math.round(totalArea * (environment === 'outdoor' ? 320 : 200));
  const estimatedPowerMax = Math.round(totalArea * (environment === 'outdoor' ? 850 : 580));
  const estimatedWeight = Math.round(totalCabinets * (environment === 'outdoor' ? 12 : 7.5));

  // Determine aspect ratio display
  const ratioValue = width / height;
  let ratioLabel = `${width.toFixed(1)}:${height.toFixed(1)}`;
  if (Math.abs(ratioValue - 16 / 9) < 0.08) ratioLabel = '16:9 (widescreen)';
  else if (Math.abs(ratioValue - 16 / 10) < 0.08) ratioLabel = '16:10';
  else if (Math.abs(ratioValue - 4 / 3) < 0.08) ratioLabel = '4:3';
  else if (Math.abs(ratioValue - 21 / 9) < 0.1) ratioLabel = '21:9 (ultra-wide)';
  else if (Math.abs(ratioValue - 1) < 0.05) ratioLabel = '1:1 (quadrado)';

  const applyPreset = (preset: PresetOption) => {
    setActivePreset(preset.id);
    setWidth(preset.width);
    setHeight(preset.height);
    setPixelPitch(preset.pitch);
    setEnvironment(preset.environment);
  };

  const handleWidthChange = (val: number) => {
    setActivePreset('');
    setWidth(Math.max(1.0, Math.min(20.0, parseFloat(val.toFixed(1)))));
  };

  const handleHeightChange = (val: number) => {
    setActivePreset('');
    setHeight(Math.max(1.0, Math.min(12.0, parseFloat(val.toFixed(1)))));
  };

  const getSpecsSummary = () => {
    const envName =
      environment === 'outdoor'
        ? 'Outdoor (IP65)'
        : environment === 'rental'
        ? 'Rental (Eventos)'
        : 'Indoor (Alta definição)';

    return `Painel de LED ${envName}\n• Medidas: ${width}m (largura) × ${height}m (altura) | Área: ${totalArea} m²\n• Resolução calculada: ${pixelsHorizontal} × ${pixelsVertical} px (~${totalPixels.toLocaleString('pt-BR')} pixels)\n• Pixel pitch: P${pixelPitch} mm | Gabinetes 500×500mm: ${totalCabinets} módulos\n• Distância ideal: a partir de ~${minViewingDist} metros\n• Consumo estimado: ~${estimatedPowerAvg}W médio (~${estimatedPowerMax}W máx)`;
  };

  const handleQuoteClick = () => {
    onRequestQuoteWithSpecs(getSpecsSummary());
  };

  const handleWhatsappClick = () => {
    const specs = getSpecsSummary();
    if (onDirectWhatsapp) {
      onDirectWhatsapp(specs);
      return;
    }
    const phone = content.general?.whatsappNumber || '5519999107788';
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Olá! Calculei um projeto no simulador da LED Machine e gostaria de um orçamento:\n\n${specs}`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="simulador-section"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      {/* Ambient glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-5xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-zinc-300 text-xs font-semibold mb-4 backdrop-blur-sm">
          <Calculator className="w-3.5 h-3.5 text-zinc-300" />
          <span>Simulador interativo</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2] mb-3 [text-wrap:balance]">
          Calcule as medidas e a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
            resolução ideal do seu painel
          </span>
        </h2>

        <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto [text-wrap:balance]">
          Ajuste as dimensões em metros, selecione o ambiente e o pixel pitch para visualizar a proporção real, a contagem de gabinetes e a estimativa técnica em tempo real.
        </p>

        {/* Quick Presets */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/50 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Sugestões rápidas:</span>
          </span>
          {PRESETS.map((p) => {
            const isSelected = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-zinc-950 font-semibold shadow-md border border-white'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulator Card */}
      <div
        id="simulador"
        className="relative z-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0e1220] via-[#090d18] to-[#060810] border border-white/10 p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Environment Selection */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
                <Sliders className="w-3.5 h-3.5 text-zinc-300" />
                <span>1. Ambiente de aplicação</span>
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'indoor',
                    label: 'Indoor',
                    desc: 'Alta definição',
                    icon: Tv,
                    defaultPitch: 1.53,
                  },
                  {
                    id: 'outdoor',
                    label: 'Outdoor',
                    desc: 'IP65 contra sol e chuva',
                    icon: Tv,
                    defaultPitch: 3.91,
                  },
                  {
                    id: 'rental',
                    label: 'Rental',
                    desc: 'Shows & palcos',
                    icon: Layers,
                    defaultPitch: 2.9,
                  },
                ].map((item) => {
                  const isSelected = environment === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setEnvironment(item.id as any);
                        setPixelPitch(item.defaultPitch);
                        setActivePreset('');
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white/10 border-white/40 text-white shadow-sm'
                          : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-white/40'}`} />
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-white block">{item.label}</span>
                      <span className="text-[10px] text-white/50 block leading-tight">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dimensions Sliders */}
            <div className="space-y-4 pt-1">
              {/* Width */}
              <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white/80 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Largura do painel:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleWidthChange(width - 0.5)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                      title="Diminuir 0.5m"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-white text-sm bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                      {width.toFixed(1)} m
                    </span>
                    <button
                      onClick={() => handleWidthChange(width + 0.5)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                      title="Aumentar 0.5m"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={width}
                  onChange={(e) => handleWidthChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>1.0 metro</span>
                  <span>10.0 metros</span>
                  <span>20.0 metros</span>
                </div>
              </div>

              {/* Height */}
              <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white/80 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-zinc-300 rotate-90" />
                    <span>Altura do painel:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleHeightChange(height - 0.5)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                      title="Diminuir 0.5m"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-white text-sm bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                      {height.toFixed(1)} m
                    </span>
                    <button
                      onClick={() => handleHeightChange(height + 0.5)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                      title="Aumentar 0.5m"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={0.5}
                  value={height}
                  onChange={(e) => handleHeightChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>1.0 metro</span>
                  <span>6.0 metros</span>
                  <span>12.0 metros</span>
                </div>
              </div>
            </div>

            {/* 3. Pixel Pitch Selection */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                  2. Pixel pitch (distância entre os LEDs)
                </label>
                <span className="text-[11px] text-zinc-300 font-mono">
                  P{pixelPitch} mm
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { p: 1.53, label: 'P1.53', note: 'Ultra HD' },
                  { p: 1.86, label: 'P1.86', note: 'Full HD' },
                  { p: 2.5, label: 'P2.5', note: 'Indoor' },
                  { p: 2.9, label: 'P2.9', note: 'Rental' },
                  { p: 3.91, label: 'P3.91', note: 'Outdoor' },
                  { p: 4.81, label: 'P4.81', note: 'Fachada' },
                ].map((item) => {
                  const isSelected = pixelPitch === item.p;
                  return (
                    <button
                      key={item.p}
                      onClick={() => {
                        setPixelPitch(item.p);
                        setActivePreset('');
                      }}
                      className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#060814] border-white font-bold shadow-lg'
                          : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.07]'
                      }`}
                    >
                      <span className="block text-xs font-bold leading-tight">{item.label}</span>
                      <span className={`block text-[9px] ${isSelected ? 'text-zinc-600' : 'text-white/40'}`}>
                        {item.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-Time Preview & Calculation Metrics (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visual Aspect Ratio Canvas Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Prévia proporcional do formato:</span>
                </span>
                <span className="font-mono text-white/90 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {ratioLabel}
                </span>
              </div>

              <div className="w-full h-48 sm:h-56 rounded-2xl bg-[#030611] border border-white/15 p-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* Background ambient grid pattern */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                  }}
                />

                {/* Simulated Screen with Dynamic Aspect Ratio */}
                <div
                  className="relative rounded-xl border border-white/20 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                  style={{
                    aspectRatio: `${width} / ${height}`,
                    height: width / height > 2.2 ? 'auto' : '84%',
                    width: width / height > 2.2 ? '90%' : 'auto',
                    maxWidth: '92%',
                    maxHeight: '88%',
                    backgroundColor: environment === 'outdoor' ? '#08101a' : '#080c14',
                  }}
                >
                  {/* Modular Cabinet Grid Overlay */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${Math.min(cabinetCols, 16)}, 1fr)`,
                      gridTemplateRows: `repeat(${Math.min(cabinetRows, 12)}, 1fr)`,
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    {Array.from({
                      length: Math.min(cabinetCols, 16) * Math.min(cabinetRows, 12),
                    }).map((_, i) => (
                      <div key={i} className="border border-white/15" />
                    ))}
                  </div>

                  {/* Centered Spec Tag on Screen */}
                  <div className="relative z-10 text-center p-2.5 flex flex-col items-center justify-center select-none backdrop-blur-[2px]">
                    <span className="text-sm sm:text-base font-extrabold font-mono text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {width.toFixed(1)}m × {height.toFixed(1)}m
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-300 mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {pixelsHorizontal} × {pixelsVertical} px
                    </span>
                    <span className="text-[9.5px] text-white/70 mt-0.5">
                      {totalCabinets} módulos (500×500 mm)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5">Área total:</span>
                <span className="text-base font-extrabold text-white">{totalArea} m²</span>
                <span className="text-[9.5px] text-white/40 block mt-0.5">{totalCabinets} gabinetes</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5">Resolução total:</span>
                <span className="text-sm sm:text-[15px] font-bold text-white font-mono leading-tight">
                  {pixelsHorizontal} × {pixelsVertical}
                </span>
                <span className="text-[9.5px] text-zinc-400 block mt-0.5">
                  ~{(totalPixels / 1000).toFixed(0)}k pixels
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-zinc-300" />
                  <span>Distância ideal:</span>
                </span>
                <span className="text-base font-extrabold text-white">~{minViewingDist} m</span>
                <span className="text-[9.5px] text-white/40 block mt-0.5">Visão sem pixels</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Consumo médio:</span>
                </span>
                <span className="text-base font-bold text-white font-mono">~{estimatedPowerAvg} W</span>
                <span className="text-[9.5px] text-white/40 block mt-0.5">Máx: ~{estimatedPowerMax} W</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-zinc-300" />
                  <span>Peso estimado:</span>
                </span>
                <span className="text-base font-bold text-white font-mono">~{estimatedWeight} kg</span>
                <span className="text-[9.5px] text-white/40 block mt-0.5">Estrutura leve</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5">Garantia inclusa:</span>
                <span className="text-base font-bold text-white">2 anos</span>
                <span className="text-[9.5px] text-white/40 block mt-0.5">Integral de fábrica</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleQuoteClick}
                className="w-full sm:flex-1 py-3.5 px-5 rounded-full bg-white hover:bg-zinc-100 text-[#070c20] font-bold text-sm transition-all shadow-[0_4px_25px_rgba(255,255,255,0.22)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.32)] border border-white flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>Solicitar projeto com estas medidas</span>
                <ArrowRight className="w-4 h-4 text-[#070c20]" />
              </button>

              <button
                onClick={handleWhatsappClick}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-sm border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-zinc-300" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SimulatorSection;
