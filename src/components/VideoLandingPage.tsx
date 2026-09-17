import React, { useRef, useState } from 'react';
import { LedMachineLogo } from './LedMachineLogo';
import { useSiteContent } from '../context/SiteContentContext';
import { useTheme } from '../context/ThemeContext';
import { openButtonLink } from '../utils/linkHelper';
import { Play, Pause, Volume2, VolumeX, MessageCircle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoLandingPageProps {
  onNavigateHome?: () => void;
}

export const VideoLandingPage: React.FC<VideoLandingPageProps> = () => {
  const { content } = useSiteContent();
  const { isLight, toggleTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const videoData = content.videoLandingPage || {
    headline: 'Conheça os Painéis LED Machine',
    subheadline: 'Transformamos residências de alto padrão e ambientes corporativos! 2 anos de garantia.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-lights-41584-large.mp4',
    posterUrl: '/images/gallery/led_cinema_room_1788059253457-3b2d1c9.jpg',
    whatsappButtonText: 'Falar com Especialista no WhatsApp',
    whatsappCustomMessage: 'Olá! Assisti ao vídeo da LED Machine e quero conversar sobre um projeto sob medida para meu espaço.',
    guaranteeNotice: 'Atendimento técnico direto com nossos especialistas • Piracicaba - SP para todo o Brasil',
  };

  const whatsappNumber = content.general.whatsappNumber || '5519999107788';
  const encodedMsg = encodeURIComponent(
    videoData.whatsappCustomMessage || 'Olá! Assisti ao vídeo da LED Machine e quero conversar sobre um projeto sob medida para meu espaço.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between selection:bg-blue-500 selection:text-white transition-colors duration-300 ${
      isLight ? 'bg-white text-[#1d1d1f]' : 'bg-[#05060b] text-white'
    }`}>
      {/* 1. Header restrito: apenas o logotipo oficial NÃO clicável (sem menu/links de saída) */}
      <header className={`w-full border-b backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-4 transition-colors ${
        isLight ? 'border-[#e5e5ea] bg-white/80' : 'border-white/[0.08] bg-[#05060b]/80'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo Não-clicável */}
          <div className="flex items-center pointer-events-none select-none">
            <LedMachineLogo size="md" />
          </div>

          {/* Selo discreto de segurança + Botão de tema D/W */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
              isLight
                ? 'text-[#1d1d1f] bg-[#f5f5f7] border border-[#e5e5ea]'
                : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-emerald-500' : 'bg-emerald-400'} animate-pulse`} />
              <span>Canal Exclusivo de Apresentação</span>
            </div>

            {/* Alternador de tema D/W */}
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black tracking-tight transition-all duration-300 cursor-pointer shadow-sm select-none ${
                isLight
                  ? 'bg-[#f5f5f7] hover:bg-[#ebebee] text-[#1d1d1f] border border-[#d2d2d7]'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
              title={isLight ? 'Modo Claro (W) - Clique para alternar para Escuro (D)' : 'Modo Escuro (D) - Clique para alternar para Claro (W)'}
              aria-label="Alternar tema"
            >
              {isLight ? 'W' : 'D'}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Conteúdo Principal - Vídeo de Apresentação + Conversão WhatsApp */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Badge superior */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
          isLight
            ? 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e5e5ea]'
            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Apresentação Oficial • LED MACHINE</span>
        </div>

        {/* Título Principal */}
        <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight max-w-3xl mb-4 leading-[1.15] ${
          isLight ? 'text-[#1d1d1f]' : 'text-white'
        }`}>
          {videoData.headline || 'Tecnologia de Painéis de LED High-End sob Medida'}
        </h1>

        {/* Subtítulo explicativo */}
        <p className={`text-sm sm:text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-normal ${
          isLight ? 'text-[#6e6e73]' : 'text-zinc-300'
        }`}>
          {videoData.subheadline || 'Descubra como transformamos residências de alto padrão e ambientes corporativos com engenharia milimétrica e 2 anos de garantia integral.'}
        </p>

        {/* Container do Vídeo com Moldura High-End */}
        <div className={`relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 group ${
          isLight 
            ? 'bg-black border-[#e5e5ea] shadow-[0_20px_50px_rgba(0,0,0,0.12)]' 
            : 'bg-black border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)]'
        }`}>
          {/* Efeito Glow Ambiente sob o vídeo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-indigo-600/30 blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Vídeo Nativo HTML5 para streaming direto no site */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoData.videoUrl}
              poster={videoData.posterUrl}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Controles customizados sobre o vídeo */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                title={isMuted ? 'Ativar Áudio' : 'Desativar Áudio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Botão de Chamada para Ação: WhatsApp Direto */}
        <div className="mt-8 sm:mt-12 w-full max-w-md flex flex-col items-center gap-3">
          <button
            onClick={() => openButtonLink(whatsappUrl)}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(16,185,129,0.35)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>{videoData.whatsappButtonText || 'Falar com Especialista no WhatsApp'}</span>
          </button>

          {/* Garantias e credenciais abaixo do botão */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-400 mt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              2 Anos de Garantia Integral
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              Engenharia e Suporte Próprios
            </span>
          </div>

          <p className="text-[11px] text-zinc-500 mt-1">
            {videoData.guaranteeNotice || 'Atendimento técnico direto com nossos especialistas • Piracicaba - SP para todo o Brasil'}
          </p>
        </div>
      </main>

      {/* 4. Rodapé minimalista restrito */}
      <footer className="w-full border-t border-white/[0.08] py-6 px-4 text-center text-xs text-zinc-500">
        <p>
          © {new Date().getFullYear()} Led Machine Painéis. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};
