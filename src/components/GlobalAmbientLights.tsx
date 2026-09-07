import React, { useEffect, useRef } from 'react';

export const GlobalAmbientLights: React.FC = () => {
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
      // Direct wheel reaction adds an immediate subtle push to target scroll
      targetScrollY = Math.max(0, targetScrollY + e.deltaY * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Smooth animation loop
    const animate = () => {
      // Linear interpolation factor (0.07 gives smooth cinematic inertia)
      currentScrollY += (targetScrollY - currentScrollY) * 0.07;
      currentMouseX += (targetMouseX - currentMouseX) * 0.03;
      currentMouseY += (targetMouseY - currentMouseY) * 0.03;

      const windowW = window.innerWidth || 1920;
      const windowH = window.innerHeight || 1080;

      // Normalized mouse coordinates from -1 to 1 for gentle ambient depth shift
      const normX = (currentMouseX / windowW - 0.5) * 2;
      const normY = (currentMouseY / windowH - 0.5) * 2;

      // 1. Top Sapphire/Royal Blue Luminous Orb (Foreground Depth)
      if (orb1Ref.current) {
        const xOffset = normX * 30;
        const yOffset = (currentScrollY * 0.2) + (normY * 20);
        orb1Ref.current.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }

      // 2. Midnight Deep Blue Orb (Midground Depth)
      if (orb2Ref.current) {
        const xOffset = -normX * 40;
        const yOffset = (currentScrollY * -0.12) + (normY * -25);
        orb2Ref.current.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }

      // 3. Dark Titanium Obsidian Core (Background Depth)
      if (orb3Ref.current) {
        const xOffset = normX * 15;
        const yOffset = (currentScrollY * 0.06) + (normY * 12);
        orb3Ref.current.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      }

      // 4. Volumetric Deep Blue Aurora Beam (Translates along diagonal axis -32deg)
      if (beamRef.current) {
        const beamShift = (currentScrollY * 0.3) + (normX * 20);
        beamRef.current.style.transform = `translate3d(${-beamShift * 0.6}px, ${beamShift * 0.8}px, 0) rotate(-32deg)`;
      }

      // 5. Clean Steel Blue Accent Beam Core
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#020617]"
      aria-hidden="true"
    >
      {/* 1. Base Grid and Deep Midnight Cosmic Ambience */}
      <div className="absolute inset-0 cosmic-grid-bg opacity-20" />
      <div className="absolute inset-0 cosmic-glow-radial" />

      {/* 2. Deep Titanium Obsidian Nebula Core (Dark Midnight Steel) */}
      <div
        ref={orb3Ref}
        style={{
          background: 'radial-gradient(circle, rgba(30, 41, 59, 0.22) 0%, rgba(15, 23, 42, 0.12) 45%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        className="absolute top-1/4 right-[-10%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full will-change-transform"
      />

      {/* 3. Pure Royal Sapphire Blue 3D Luminous Orb */}
      <div
        ref={orb1Ref}
        style={{
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.14) 0%, rgba(30, 58, 138, 0.07) 35%, transparent 75%)',
          filter: 'blur(50px)',
        }}
        className="absolute -top-32 left-[5%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full will-change-transform"
      />

      {/* 4. Deep Midnight Navy 3D Orb */}
      <div
        ref={orb2Ref}
        style={{
          background: 'radial-gradient(circle, rgba(30, 58, 138, 0.14) 0%, rgba(15, 23, 42, 0.08) 40%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        className="absolute top-[45%] left-[-15%] w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full will-change-transform"
      />

      {/* 5. Dynamic 3D Volumetric Diagonal Aurora Beam (Deep Royal Blue / Steel) */}
      <div
        ref={beamRef}
        className="absolute -top-28 right-[-10%] w-[800px] sm:w-[1200px] h-[220px] sm:h-[320px] aurora-beam opacity-45 will-change-transform"
      />

      {/* 6. Clean Steel Blue Linear Beam Core */}
      <div
        ref={beamSharpRef}
        className="absolute top-8 right-[5%] w-[700px] sm:w-[1050px] h-[50px] sm:h-[85px] aurora-beam-sharp opacity-50 will-change-transform"
      />

      {/* 7. Bottom Ambiance (Deep Obsidian Steel) */}
      <div 
        style={{
          background: 'radial-gradient(circle, rgba(15, 23, 42, 0.2) 0%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        className="absolute -bottom-48 left-1/4 w-[750px] sm:w-[1000px] h-[650px] rounded-full" 
      />
    </div>
  );
};
