import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const GlobalAmbientLights: React.FC = () => {
  const { isLight } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const beamSharpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    // Target and current values for buttery smooth interpolation (lerp)
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let targetMouseX = window.innerWidth / 2;
    let targetMouseY = window.innerHeight / 2;
    let currentMouseX = window.innerWidth / 2;
    let currentMouseY = window.innerHeight / 2;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleWheel = (e: WheelEvent) => {
      targetScrollY = Math.max(0, targetScrollY + e.deltaY * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Smooth animation loop
    const animate = () => {
      currentScrollY += (targetScrollY - currentScrollY) * 0.07;
      currentMouseX += (targetMouseX - currentMouseX) * 0.03;
      currentMouseY += (targetMouseY - currentMouseY) * 0.03;

      const windowW = window.innerWidth || 1920;
      const windowH = window.innerHeight || 1080;

      // Normalized mouse coordinates from -1 to 1 for gentle ambient depth shift
      const normX = (currentMouseX / windowW - 0.5) * 2;
      const normY = (currentMouseY / windowH - 0.5) * 2;

      // 1. Top Luminous Orb (Foreground Depth)
      if (orb1Ref.current) {
        const xOffset = normX * 30;
        const yOffset = (currentScrollY * 0.2) + (normY * 20);
        orb1Ref.current.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }

      // 2. Midground Orb (Midground Depth)
      if (orb2Ref.current) {
        const xOffset = -normX * 40;
        const yOffset = (currentScrollY * -0.12) + (normY * -25);
        orb2Ref.current.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }

      // 3. Core Background Orb
      if (orb3Ref.current) {
        const xOffset = normX * 15;
        const yOffset = (currentScrollY * 0.06) + (normY * 12);
        orb3Ref.current.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }

      // 4. Volumetric Aurora Beam
      if (beamRef.current) {
        const beamShift = (currentScrollY * 0.3) + (normX * 20);
        beamRef.current.style.transform = `translate3d(${-beamShift * 0.6}px, ${beamShift * 0.8}px, 0) rotate(-32deg)`;
      }

      // 5. Clean Accent Beam Core
      if (beamSharpRef.current) {
        const sharpShift = (currentScrollY * 0.38) + (normX * 25);
        beamSharpRef.current.style.transform = `translate3d(${-sharpShift * 0.7}px, ${sharpShift * 0.9}px, 0) rotate(-32deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500 ${
        isLight ? 'bg-white' : 'bg-[#020617]'
      }`}
      aria-hidden="true"
    >
      {/* 1. Base Grid and Radial Ambience (Hidden in Apple Light Mode) */}
      <div
        className={`absolute inset-0 cosmic-grid-bg transition-opacity duration-500 ${
          isLight ? 'opacity-0' : 'opacity-20'
        }`}
      />
      <div className={`absolute inset-0 cosmic-glow-radial transition-opacity duration-500 ${
        isLight ? 'opacity-0' : 'opacity-100'
      }`} />

      {/* 2. Core Ambient Nebula (Subtle soft Apple wash in Light Mode) */}
      <div
        ref={orb3Ref}
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(245, 245, 247, 0.8) 0%, rgba(255, 255, 255, 0) 70%)'
            : 'radial-gradient(circle, rgba(30, 41, 59, 0.22) 0%, rgba(15, 23, 42, 0.12) 45%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        className="absolute top-1/4 right-[-10%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full will-change-transform transition-all duration-500"
      />

      {/* 3. Luminous Sky/Sapphire Blue Orb */}
      <div
        ref={orb1Ref}
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(0, 113, 227, 0.04) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(29, 78, 216, 0.22) 0%, rgba(30, 58, 138, 0.12) 35%, transparent 75%)',
          filter: 'blur(50px)',
        }}
        className="absolute -top-32 left-[5%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full will-change-transform transition-all duration-500"
      />

      {/* 4. Midground Ambient Indigo Orb */}
      <div
        ref={orb2Ref}
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(30, 58, 138, 0.20) 0%, rgba(15, 23, 42, 0.12) 40%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        className="absolute top-[45%] left-[-15%] w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full will-change-transform transition-all duration-500"
      />

      {/* 5. Dynamic 3D Volumetric Diagonal Aurora Beam (Only in Dark Mode) */}
      <div
        ref={beamRef}
        className={`absolute -top-28 right-[-10%] w-[800px] sm:w-[1200px] h-[220px] sm:h-[320px] aurora-beam will-change-transform transition-opacity duration-500 ${
          isLight ? 'opacity-0' : 'opacity-60'
        }`}
      />

      {/* 6. Linear Beam Core (Only in Dark Mode) */}
      <div
        ref={beamSharpRef}
        className={`absolute top-8 right-[5%] w-[700px] sm:w-[1050px] h-[50px] sm:h-[85px] aurora-beam-sharp will-change-transform transition-opacity duration-500 ${
          isLight ? 'opacity-0' : 'opacity-65'
        }`}
      />

      {/* 7. Bottom Ambiance */}
      <div
        style={{
          background: isLight
            ? 'transparent'
            : 'radial-gradient(circle, rgba(15, 23, 42, 0.2) 0%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        className="absolute -bottom-48 left-1/4 w-[750px] sm:w-[1000px] h-[650px] rounded-full transition-all duration-500"
      />
    </div>
  );
};
