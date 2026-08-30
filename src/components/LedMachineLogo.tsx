import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

interface LedMachineLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  iconOnly?: boolean;
  customSrc?: string;
}

export const LedMachineLogo: React.FC<LedMachineLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  iconOnly = false,
  customSrc,
}) => {
  const { content } = useSiteContent();
  const logoImage = customSrc || content?.general?.logoUrl;

  const heights = {
    sm: 'h-7',
    md: 'h-9 sm:h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  // If user uploaded a custom logo image file (PNG/SVG/JPG), render it with strict aspect ratio preservation
  if (logoImage) {
    return (
      <div
        id="led-machine-logo-container"
        className={`inline-flex items-center select-none cursor-pointer ${className}`}
      >
        <img
          src={logoImage}
          alt={content?.general?.siteName || 'LED Machine Painéis'}
          className={`${heights[size]} w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-transform duration-300 hover:scale-105`}
          style={{
            maxHeight: content?.general?.logoHeight ? `${content.general.logoHeight}px` : undefined,
          }}
        />
      </div>
    );
  }

  const iconDimensions = {
    sm: { width: 34, height: 28 },
    md: { width: 44, height: 36 },
    lg: { width: 56, height: 46 },
    xl: { width: 72, height: 60 },
  };

  const textScales = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const subtitleScales = {
    sm: 'text-[9px] tracking-[0.28em]',
    md: 'text-[11px] tracking-[0.32em]',
    lg: 'text-[13px] tracking-[0.36em]',
    xl: 'text-[15px] tracking-[0.4em]',
  };

  const dim = iconDimensions[size];

  return (
    <div
      id="led-machine-logo-container"
      className={`inline-flex items-center gap-3 select-none cursor-pointer transition-all duration-300 hover:opacity-95 ${className}`}
    >
      {/* 3D Perspective LED Matrix Cabinet Graphic matching uploaded logo */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={dim.width}
          height={dim.height}
          viewBox="0 0 160 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        >
          <defs>
            <linearGradient id="ledCabinetBorder" x1="0" y1="0" x2="160" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <filter id="dotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Perspective 3D Outer Frame */}
          <path
            d="M 12 18 
               L 80 8 
               C 125 24, 142 35, 152 42 
               L 152 76 
               C 142 84, 125 94, 80 110 
               L 12 120 
               Z"
            stroke="url(#ledCabinetBorder)"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="rgba(168, 85, 247, 0.08)"
          />

          {/* Left perspective face border */}
          <path
            d="M 12 18 L 80 8 L 80 110 L 12 120 Z"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          />

          {/* LED Matrix Grid Diodes with perspective scaling */}
          {/* Column 1 */}
          <circle cx="28" cy="35" r="4.5" fill="#ffffff" filter="url(#dotGlow)" />
          <circle cx="28" cy="52" r="4.5" fill="#ffffff" />
          <circle cx="28" cy="69" r="4.5" fill="#ffffff" />
          <circle cx="28" cy="86" r="4.5" fill="#ffffff" />
          <circle cx="28" cy="103" r="4.5" fill="#ffffff" />

          {/* Column 2 */}
          <circle cx="45" cy="32" r="4.5" fill="#ffffff" />
          <circle cx="45" cy="49" r="4.5" fill="#ffffff" filter="url(#dotGlow)" />
          <circle cx="45" cy="66" r="4.5" fill="#ffffff" />
          <circle cx="45" cy="83" r="4.5" fill="#ffffff" />
          <circle cx="45" cy="100" r="4.5" fill="#ffffff" />

          {/* Column 3 */}
          <circle cx="62" cy="29" r="4.5" fill="#ffffff" />
          <circle cx="62" cy="46" r="4.5" fill="#ffffff" />
          <circle cx="62" cy="63" r="4.5" fill="#ffffff" filter="url(#dotGlow)" />
          <circle cx="62" cy="80" r="4.5" fill="#ffffff" />
          <circle cx="62" cy="97" r="4.5" fill="#ffffff" />

          {/* Perspective Angled Diodes (Column 4) */}
          <circle cx="95" cy="35" r="3.8" fill="#ffffff" opacity="0.95" />
          <circle cx="95" cy="49" r="3.8" fill="#ffffff" opacity="0.95" />
          <circle cx="95" cy="63" r="3.8" fill="#ffffff" opacity="0.95" />
          <circle cx="95" cy="77" r="3.8" fill="#ffffff" opacity="0.95" />
          <circle cx="95" cy="91" r="3.8" fill="#ffffff" opacity="0.95" />

          {/* Column 5 */}
          <circle cx="112" cy="40" r="3.4" fill="#ffffff" opacity="0.9" />
          <circle cx="112" cy="52" r="3.4" fill="#ffffff" opacity="0.9" />
          <circle cx="112" cy="64" r="3.4" fill="#ffffff" opacity="0.9" />
          <circle cx="112" cy="76" r="3.4" fill="#ffffff" opacity="0.9" />
          <circle cx="112" cy="88" r="3.4" fill="#ffffff" opacity="0.9" />

          {/* Column 6 */}
          <circle cx="128" cy="45" r="3.0" fill="#ffffff" opacity="0.85" />
          <circle cx="128" cy="55" r="3.0" fill="#ffffff" opacity="0.85" />
          <circle cx="128" cy="65" r="3.0" fill="#ffffff" opacity="0.85" />
          <circle cx="128" cy="75" r="3.0" fill="#ffffff" opacity="0.85" />
          <circle cx="128" cy="85" r="3.0" fill="#ffffff" opacity="0.85" />

          {/* Column 7 (Tapering) */}
          <circle cx="142" cy="50" r="2.5" fill="#ffffff" opacity="0.75" />
          <circle cx="142" cy="59" r="2.5" fill="#ffffff" opacity="0.75" />
          <circle cx="142" cy="68" r="2.5" fill="#ffffff" opacity="0.75" />
          <circle cx="142" cy="77" r="2.5" fill="#ffffff" opacity="0.75" />
        </svg>
      </div>

      {/* Typography: LED MACHINE & PAINÉIS */}
      {showText && !iconOnly && (
        <div className="flex flex-col justify-center">
          {/* LED MACHINE */}
          <div className="flex items-center tracking-wider">
            <span
              className={`font-extrabold text-white uppercase ${textScales[size]}`}
              style={{
                letterSpacing: '0.12em',
                fontFamily: 'DM Sans, sans-serif',
                textShadow: '0 0 10px rgba(255,255,255,0.4)',
              }}
            >
              LED M<span className="inline-block transform font-black tracking-normal">Λ</span>CHINE
            </span>
          </div>

          {/* — PAINÉIS — */}
          <div className="flex items-center justify-between gap-1.5 opacity-90 mt-0.5">
            <div className="h-[1px] flex-1 bg-white/60" />
            <span
              className={`font-semibold text-white uppercase ${subtitleScales[size]}`}
              style={{
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              PAINÉIS
            </span>
            <div className="h-[1px] flex-1 bg-white/60" />
          </div>
        </div>
      )}
    </div>
  );
};
