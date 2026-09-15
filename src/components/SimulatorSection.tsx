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
    width: 3.52, // 11 módulos de 32cm
    height: 1.92, // 12 módulos de 16cm
    pitch: 1.8,
    environment: 'indoor',
  },
  {
    id: 'outdoor_billboard',
    name: 'Outdoor comercial',
    width: 6.08, // 19 módulos de 32cm
    height: 3.52, // 22 módulos de 16cm
    pitch: 4.0,
    environment: 'outdoor',
  },
  {
    id: 'corporate',
    name: 'Sala de reunião',
    width: 2.88, // 9 módulos de 32cm
    height: 1.60, // 10 módulos de 16cm
    pitch: 1.8,
    environment: 'indoor',
  },
  {
    id: 'vitrine',
    name: 'Vitrine de loja',
    width: 1.92, // 6 módulos de 32cm
    height: 2.88, // 18 módulos de 16cm
    pitch: 2.5,
    environment: 'indoor',
  },
  {
    id: 'rental_event',
    name: 'Palco & eventos',
    width: 8.0, // 16 gabinetes de 50cm
    height: 4.5, // 9 gabinetes de 50cm
    pitch: 2.97,
    environment: 'rental',
  },
];

interface PitchOption {
  pitch: number;
  label: string;
  sub: string;
  moduleWidthM: number;
  moduleHeightM: number;
  moduleResX: number;
  moduleResY: number;
  pixelsPerModule: number;
  powerWPerModule: number;
  unitLabel: 'módulo' | 'gabinete';
  unitDimensions: string;
}

const PITCH_OPTIONS: Record<'indoor' | 'outdoor' | 'rental', PitchOption[]> = {
  indoor: [
    {
      pitch: 1.25,
      label: 'P1.25',
      sub: 'Indoor',
      moduleWidthM: 0.32,
      moduleHeightM: 0.16,
      moduleResX: 256,
      moduleResY: 128,
      pixelsPerModule: 32768,
      powerWPerModule: 20,
      unitLabel: 'módulo',
      unitDimensions: '320 × 160 mm',
    },
    {
      pitch: 1.8,
      label: 'P1.8',
      sub: 'Indoor',
      moduleWidthM: 0.32,
      moduleHeightM: 0.16,
      moduleResX: 178,
      moduleResY: 89,
      pixelsPerModule: 15842,
      powerWPerModule: 20,
      unitLabel: 'módulo',
      unitDimensions: '320 × 160 mm',
    },
    {
      pitch: 2.5,
      label: 'P2.5',
      sub: 'Indoor',
      moduleWidthM: 0.32,
      moduleHeightM: 0.16,
      moduleResX: 128,
      moduleResY: 64,
      pixelsPerModule: 8192,
      powerWPerModule: 25,
      unitLabel: 'módulo',
      unitDimensions: '320 × 160 mm',
    },
  ],
  outdoor: [
    {
      pitch: 3.0,
      label: 'P3.0',
      sub: 'Outdoor',
      moduleWidthM: 0.32,
      moduleHeightM: 0.16,
      moduleResX: 107,
      moduleResY: 53,
      pixelsPerModule: 5671,
      powerWPerModule: 40,
      unitLabel: 'módulo',
      unitDimensions: '320 × 160 mm',
    },
    {
      pitch: 4.0,
      label: 'P4.0',
      sub: 'Outdoor',
      moduleWidthM: 0.32,
      moduleHeightM: 0.16,
      moduleResX: 80,
      moduleResY: 40,
      pixelsPerModule: 3200,
      powerWPerModule: 40,
      unitLabel: 'módulo',
      unitDimensions: '320 × 160 mm',
    },
    {
      pitch: 5.0,
      label: 'P5.0',
      sub: 'Outdoor',
      moduleWidthM: 0.32,
      moduleHeightM: 0.16,
      moduleResX: 64,
      moduleResY: 32,
      pixelsPerModule: 2048,
      powerWPerModule: 50,
      unitLabel: 'módulo',
      unitDimensions: '320 × 160 mm',
    },
  ],
  rental: [
    {
      pitch: 2.97,
      label: 'P2.97',
      sub: 'Rental',
      moduleWidthM: 0.5,
      moduleHeightM: 0.5,
      moduleResX: 172,
      moduleResY: 172,
      pixelsPerModule: 29584,
      powerWPerModule: 180,
      unitLabel: 'gabinete',
      unitDimensions: '500 × 500 mm',
    },
    {
      pitch: 3.91,
      label: 'P3.91',
      sub: 'Rental',
      moduleWidthM: 0.5, // Em gabinetes padrão de rental (compostos por módulos 250×250mm montados em gabinetes 500×500mm ou modulares de 250mm)
      moduleHeightM: 0.5,
      moduleResX: 128,
      moduleResY: 128,
      pixelsPerModule: 16384,
      powerWPerModule: 180,
      unitLabel: 'gabinete',
      unitDimensions: '500 × 500 mm',
    },
  ],
};

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({
  onRequestQuoteWithSpecs,
  onDirectWhatsapp,
}) => {
  const { content } = useSiteContent();
  const [environment, setEnvironment] = useState<'indoor' | 'outdoor' | 'rental'>('indoor');
  const [width, setWidth] = useState<number>(0.32);
  const [height, setHeight] = useState<number>(0.16);
  const [pixelPitch, setPixelPitch] = useState<number>(1.25);
  const [isCustomPitchMode, setIsCustomPitchMode] = useState<boolean>(false);
  const [customPitchInput, setCustomPitchInput] = useState<string>('1.53');
  const [activePreset, setActivePreset] = useState<string>('');

  // Modular grid dimensions:
  // Find matching standard pitch specification or fallback
  const currentPitchSpec = !isCustomPitchMode
    ? PITCH_OPTIONS[environment].find((p) => p.pitch === pixelPitch)
    : undefined;

  const isRental = environment === 'rental';
  const isModular32x16 = !isRental;
  const stepW = currentPitchSpec ? currentPitchSpec.moduleWidthM : isRental ? 0.5 : 0.32;
  const stepH = currentPitchSpec ? currentPitchSpec.moduleHeightM : isRental ? 0.5 : 0.16;
  const minWidth = stepW; // Permite partir de 1 módulo (ex: 0.32m ou 0.50m)
  const maxWidth = stepW * 60;
  const minHeight = stepH; // Permite partir de 1 módulo (ex: 0.16m ou 0.50m)
  const maxHeight = 12.0;

  // Exact calculations from parameters sheet:
  const totalArea = Number((width * height).toFixed(2));
  const moduleCols = Math.round(width / stepW);
  const moduleRows = Math.round(height / stepH);
  const totalModules = moduleCols * moduleRows;

  // Resolution calculation based on official module/cabinet resolution or mathematical pitch
  const pixelsHorizontal = currentPitchSpec
    ? moduleCols * currentPitchSpec.moduleResX
    : Math.round((width * 1000) / pixelPitch);
  const pixelsVertical = currentPitchSpec
    ? moduleRows * currentPitchSpec.moduleResY
    : Math.round((height * 1000) / pixelPitch);

  const totalPixels = currentPitchSpec
    ? totalModules * currentPitchSpec.pixelsPerModule
    : pixelsHorizontal * pixelsVertical;

  // Distance: ~pixelPitch * 0.9m
  const minViewingDist = Math.max(1, parseFloat((pixelPitch * 0.9).toFixed(1)));

  // Estimated Power: Exact formula from sheet: "Watts × quantidade de módulos"
  const estimatedPower = currentPitchSpec
    ? totalModules * currentPitchSpec.powerWPerModule
    : Math.round(totalArea * (environment === 'outdoor' ? 400 : 250));

  // Weight: Sheet specification:
  // Indoor: 33 kg / m²
  // Outdoor: 33 kg / m²
  // Rental: 24 kg / m²
  const weightPerM2 = isRental ? 24 : 33;
  const estimatedWeight = Math.round(totalArea * weightPerM2);

  // Determine aspect ratio display
  const ratioValue = width / height;
  let ratioLabel = `${width.toFixed(2)}:${height.toFixed(2)}`;
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
    setIsCustomPitchMode(false);
    setEnvironment(preset.environment);
  };

  const handleStepWidth = (delta: 1 | -1) => {
    setActivePreset('');
    const currentSteps = Math.round(width / stepW);
    const minSteps = Math.round(minWidth / stepW);
    const maxSteps = Math.round(maxWidth / stepW);
    const nextSteps = Math.max(minSteps, Math.min(maxSteps, currentSteps + delta));
    setWidth(Number((nextSteps * stepW).toFixed(2)));
  };

  const handleStepHeight = (delta: 1 | -1) => {
    setActivePreset('');
    const currentSteps = Math.round(height / stepH);
    const minSteps = Math.round(minHeight / stepH);
    const maxSteps = Math.round(maxHeight / stepH);
    const nextSteps = Math.max(minSteps, Math.min(maxSteps, currentSteps + delta));
    setHeight(Number((nextSteps * stepH).toFixed(2)));
  };

  const handleWidthChange = (val: number) => {
    setActivePreset('');
    const steps = Math.round(val / stepW);
    const minSteps = Math.round(minWidth / stepW);
    const maxSteps = Math.round(maxWidth / stepW);
    const clampedSteps = Math.max(minSteps, Math.min(maxSteps, steps));
    setWidth(Number((clampedSteps * stepW).toFixed(2)));
  };

  const handleHeightChange = (val: number) => {
    setActivePreset('');
    const steps = Math.round(val / stepH);
    const minSteps = Math.round(minHeight / stepH);
    const maxSteps = Math.round(maxHeight / stepH);
    const clampedSteps = Math.max(minSteps, Math.min(maxSteps, steps));
    setHeight(Number((clampedSteps * stepH).toFixed(2)));
  };

  const handleSelectPitch = (item: PitchOption) => {
    setIsCustomPitchMode(false);
    setPixelPitch(item.pitch);
    setActivePreset('');
    // Predefine as dimensões exatamente para 1 módulo/gabinete do modelo selecionado
    // Exemplo: P1.25 -> 0.32m (320mm) de largura e 0.16m (160mm) de altura
    setWidth(item.moduleWidthM);
    setHeight(item.moduleHeightM);
  };

  const handleEnvironmentChange = (newEnv: 'indoor' | 'outdoor' | 'rental', defaultPitch?: number) => {
    setEnvironment(newEnv);
    const resolvedPitch = defaultPitch ?? (newEnv === 'indoor' ? 1.8 : newEnv === 'outdoor' ? 3.0 : 2.97);
    setPixelPitch(resolvedPitch);
    setIsCustomPitchMode(false);
    setActivePreset('');

    const pitchSpec = PITCH_OPTIONS[newEnv].find((p) => p.pitch === resolvedPitch);
    if (pitchSpec) {
      setWidth(pitchSpec.moduleWidthM);
      setHeight(pitchSpec.moduleHeightM);
    } else {
      const newStepW = newEnv === 'rental' ? 0.5 : 0.32;
      const newStepH = newEnv === 'rental' ? 0.5 : 0.16;
      setWidth(newStepW);
      setHeight(newStepH);
    }
  };

  const getSpecsSummary = () => {
    const envName =
      environment === 'outdoor'
        ? 'Outdoor (IP65)'
        : environment === 'rental'
        ? 'Rental (Eventos)'
        : 'Indoor (Alta definição)';

    const unitType = currentPitchSpec?.unitLabel || (isRental ? 'gabinete' : 'módulo');
    const unitDim = currentPitchSpec?.unitDimensions || (isRental ? '500×500 mm' : '320×160 mm');
    const unitRes = currentPitchSpec
      ? ` | Resolução por ${unitType}: ${currentPitchSpec.moduleResX}×${currentPitchSpec.moduleResY} px (${currentPitchSpec.pixelsPerModule.toLocaleString('pt-BR')} px)`
      : '';

    const moduleInfo = `${totalModules} ${unitType}s (${unitDim}) [${moduleCols} colunas × ${moduleRows} linhas]${unitRes}`;

    return `Painel de LED ${envName}\n• Medidas: ${width.toFixed(2)}m (largura) × ${height.toFixed(2)}m (altura) | Área: ${totalArea} m²\n• Resolução calculada: ${pixelsHorizontal} × ${pixelsVertical} px (~${totalPixels.toLocaleString('pt-BR')} pixels)\n• Pixel pitch: P${pixelPitch} mm\n• Estrutura: ${moduleInfo}\n• Distância ideal: a partir de ~${minViewingDist} metros\n• Consumo estimado: ~${estimatedPower.toLocaleString('pt-BR')} W (${currentPitchSpec ? `${currentPitchSpec.powerWPerModule}W × ${totalModules} ${unitType}s` : 'calculado'})\n• Peso estimado: ~${estimatedWeight} kg (${weightPerM2} kg/m²)`;
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
                    defaultPitch: 1.8,
                  },
                  {
                    id: 'outdoor',
                    label: 'Outdoor',
                    desc: 'IP65 contra sol e chuva',
                    icon: Tv,
                    defaultPitch: 3.0,
                  },
                  {
                    id: 'rental',
                    label: 'Rental',
                    desc: 'Shows & palcos',
                    icon: Layers,
                    defaultPitch: 2.97,
                  },
                ].map((item) => {
                  const isSelected = environment === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleEnvironmentChange(item.id as any, item.defaultPitch)}
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

            {/* 2. Pixel Pitch Selection (Step 2) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                  2. Pixel pitch (distância entre os LEDs)
                </label>
                <span className="text-[11px] text-zinc-300 font-mono font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  P{pixelPitch} mm
                </span>
              </div>

              <div
                className={`grid gap-2 ${
                  environment === 'rental'
                    ? 'grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-4'
                }`}
              >
                {PITCH_OPTIONS[environment].map((item) => {
                  const isSelected = !isCustomPitchMode && pixelPitch === item.pitch;
                  return (
                    <button
                      key={item.pitch}
                      type="button"
                      onClick={() => handleSelectPitch(item)}
                      className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#060814] border-white font-bold shadow-lg'
                          : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.07]'
                      }`}
                    >
                      <span className="block text-xs font-bold leading-tight">{item.label}</span>
                      <span
                        className={`block text-[9px] ${
                          isSelected ? 'text-zinc-600 font-semibold' : 'text-white/40'
                        }`}
                      >
                        {item.sub}
                      </span>
                    </button>
                  );
                })}

                {/* Option: Outros */}
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomPitchMode(true);
                    setActivePreset('');
                    const isCurrentStandard = PITCH_OPTIONS[environment].some(
                      (p) => p.pitch === pixelPitch
                    );
                    if (isCurrentStandard) {
                      const fallback =
                        environment === 'indoor'
                          ? 1.53
                          : environment === 'outdoor'
                          ? 6.0
                          : 4.81;
                      setPixelPitch(fallback);
                      setCustomPitchInput(String(fallback));
                    } else {
                      setCustomPitchInput(String(pixelPitch));
                    }
                  }}
                  className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                    isCustomPitchMode
                      ? 'bg-white text-[#060814] border-white font-bold shadow-lg'
                      : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.07]'
                  }`}
                >
                  <span className="block text-xs font-bold leading-tight">Outros</span>
                  <span
                    className={`block text-[9px] ${
                      isCustomPitchMode ? 'text-zinc-600 font-semibold' : 'text-white/40'
                    }`}
                  >
                    Personalizado
                  </span>
                </button>
              </div>

              {/* Custom Pitch Input when 'Outros' is active */}
              {isCustomPitchMode && (
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/15 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Pixel pitch personalizado:
                      </span>
                      <span className="text-[11px] text-white/50 block">
                        Digite a distância exata em milímetros
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-mono font-bold text-white text-sm">P</span>
                      <input
                        type="number"
                        min={0.5}
                        max={30}
                        step={0.01}
                        value={customPitchInput}
                        onChange={(e) => {
                          const raw = e.target.value;
                          setCustomPitchInput(raw);
                          const val = parseFloat(raw);
                          if (!isNaN(val) && val >= 0.4 && val <= 50) {
                            setPixelPitch(val);
                            setActivePreset('');
                          }
                        }}
                        className="w-24 px-2.5 py-1 rounded-lg bg-white/10 border border-white/30 text-white font-mono font-bold text-sm text-center focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                        placeholder="Ex: 1.53"
                      />
                      <span className="text-xs text-white/60 font-mono">mm</span>
                    </div>
                  </div>

                  {/* Suggestions tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/[0.07]">
                    <span className="text-[10px] text-white/40">Sugestões:</span>
                    {(environment === 'indoor'
                      ? [0.9, 1.53, 1.86, 2.0]
                      : environment === 'outdoor'
                      ? [4.81, 6.0, 8.0, 10.0]
                      : [2.6, 4.81, 5.95]
                    ).map((sp) => (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => {
                          setPixelPitch(sp);
                          setCustomPitchInput(String(sp));
                          setActivePreset('');
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                          pixelPitch === sp
                            ? 'bg-white text-black font-bold'
                            : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                        }`}
                      >
                        P{sp}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Dimensions Sliders (Step 3) */}
            <div className="space-y-4 pt-1">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/70">
                <span>3. Dimensões do painel</span>
                <span className="text-[11px] font-mono text-white/40 lowercase">
                  ({width.toFixed(2)}m × {height.toFixed(2)}m)
                </span>
              </label>

              {/* Width */}
              <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white/80 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Largura do painel:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStepWidth(-1)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                      title={isModular32x16 ? 'Diminuir 32 cm' : 'Diminuir 50 cm'}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-white text-sm bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                      {width.toFixed(2)} m
                    </span>
                    <button
                      onClick={() => handleStepWidth(1)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                      title={isModular32x16 ? 'Aumentar 32 cm' : 'Aumentar 50 cm'}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={minWidth}
                  max={maxWidth}
                  step={stepW}
                  value={width}
                  onChange={(e) => handleWidthChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between items-center text-[10px] text-white/40">
                  <span>Mín: {minWidth.toFixed(2)} m</span>
                  <span>Máx: {maxWidth.toFixed(2)} m</span>
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
                      onClick={() => handleStepHeight(-1)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                      title={isModular32x16 ? 'Diminuir 16 cm' : 'Diminuir 50 cm'}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-white text-sm bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                      {height.toFixed(2)} m
                    </span>
                    <button
                      onClick={() => handleStepHeight(1)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                      title={isModular32x16 ? 'Aumentar 16 cm' : 'Aumentar 50 cm'}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={minHeight}
                  max={maxHeight}
                  step={stepH}
                  value={height}
                  onChange={(e) => handleHeightChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between items-center text-[10px] text-white/40">
                  <span>Mín: {minHeight.toFixed(2)} m</span>
                  <span>Máx: {maxHeight.toFixed(2)} m</span>
                </div>
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
                      gridTemplateColumns: `repeat(${Math.min(moduleCols, 24)}, 1fr)`,
                      gridTemplateRows: `repeat(${Math.min(moduleRows, 16)}, 1fr)`,
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    {Array.from({
                      length: Math.min(moduleCols, 24) * Math.min(moduleRows, 16),
                    }).map((_, i) => (
                      <div key={i} className="border border-white/15" />
                    ))}
                  </div>

                  {/* Centered Spec Tag on Screen */}
                  <div className="relative z-10 text-center p-2.5 flex flex-col items-center justify-center select-none backdrop-blur-[2px]">
                    <span className="text-sm sm:text-base font-extrabold font-mono text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {width.toFixed(2)}m × {height.toFixed(2)}m
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-300 mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {pixelsHorizontal} × {pixelsVertical} px
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
                <span className="text-[9.5px] text-white/50 block mt-0.5">
                  Dimensão final
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5">Resolução total:</span>
                <span className="text-sm sm:text-[15px] font-bold text-white font-mono leading-tight">
                  {pixelsHorizontal} × {pixelsVertical}
                </span>
                <span className="text-[9.5px] text-zinc-400 block mt-0.5">
                  {totalPixels.toLocaleString('pt-BR')} pixels
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
                  <span>Consumo estimado:</span>
                </span>
                <span className="text-base font-bold text-white font-mono">
                  ~{estimatedPower.toLocaleString('pt-BR')} W
                </span>
                <span className="text-[9.5px] text-white/40 block mt-0.5">
                  ~{(estimatedPower / 1000).toFixed(1)} kW máximo
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[11px] text-white/50 block mb-0.5 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-zinc-300" />
                  <span>Peso estimado:</span>
                </span>
                <span className="text-base font-bold text-white font-mono">~{estimatedWeight} kg</span>
                <span className="text-[9.5px] text-white/40 block mt-0.5">
                  Painel completo
                </span>
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
