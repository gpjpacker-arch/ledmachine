import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyLedMachineSection } from './components/WhyLedMachineSection';
import { WidescreenLedBanner } from './components/WidescreenLedBanner';
import { SolutionsSection } from './components/SolutionsSection';
import { WarrantySection } from './components/WarrantySection';
import { FeaturedProductGallerySection } from './components/FeaturedProductGallerySection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { DemoPlaygroundModal } from './components/DemoPlaygroundModal';
import { VisualEditorModal } from './components/VisualEditorModal';
import { TutorialPdfModal } from './components/TutorialPdfModal';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [contactPrefill, setContactPrefill] = useState<string>('');
  const { isEditorOpen, setIsEditorOpen } = useSiteContent();

  // Scroll listener to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'diferenciais',
        'solucoes',
        'garantia',
      ];
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        let el = document.getElementById(`${sectionId}-section`);
        if (!el && sectionId === 'home') el = document.getElementById('hero-section');
        
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    let targetElement = document.getElementById(`${sectionId}-section`);
    if (!targetElement && sectionId === 'home') targetElement = document.getElementById('hero-section');

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenContactWithCustomMessage = (customMsg: string) => {
    setContactPrefill(customMsg);
    setIsContactOpen(true);
  };

  return (
    <div
      id="ledmachine-app-root"
      className="min-h-screen w-full bg-[#05020c] text-white relative selection:bg-purple-600 selection:text-white overflow-x-hidden"
    >
      {/* 1. Global Ambient Grid Background & Cosmic Lighting */}
      <div className="fixed inset-0 cosmic-grid-bg opacity-70 pointer-events-none z-0" />
      <div className="fixed inset-0 cosmic-glow-radial pointer-events-none z-0" />

      {/* Secondary Ambient Light Spheres */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-40 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed -bottom-40 left-1/3 w-[700px] h-[700px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* 2. Main Visual Frame */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        {/* Navigation Bar */}
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onOpenContact={() => {
            setContactPrefill('');
            setIsContactOpen(true);
          }}
          onOpenSimulator={() => setIsSimulatorOpen(true)}
        />

        {/* Main Content Area */}
        <main className="w-full flex-1">
          {/* 1. Hero Section */}
          <HeroSection
            onOpenContact={() => {
              setContactPrefill('');
              setIsContactOpen(true);
            }}
            onOpenSpecialist={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de conversar com um especialista da LED Machine.');
            }}
            onOpenPlayground={() => setIsSimulatorOpen(true)}
            onRequestQuoteWithDetails={(title, category) => {
              handleOpenContactWithCustomMessage(`Olá! Gostaria de um projeto personalizado similar ao '${title}' (Categoria: ${category}).`);
            }}
          />

          {/* 2. Por que LED Machine? */}
          <WhyLedMachineSection
            onSelectBlock={(blockTitle) => {
              handleOpenContactWithCustomMessage(`Olá! Gostaria de saber mais sobre: ${blockTitle}`);
            }}
          />

          {/* Widescreen LED Showcase Banner */}
          <WidescreenLedBanner
            onOpenProjectQuote={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de um orçamento para um projeto de painel de LED Outdoor de alta performance.');
            }}
          />

          {/* 3. Soluções: Comercial & Residencial */}
          <SolutionsSection
            onOpenCommercialQuote={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de uma consultoria e projeto para ambiente Comercial.');
            }}
            onOpenResidentialQuote={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de um projeto de painel de LED para minha Residência.');
            }}
          />

          {/* 4. Garantia & Confiança (2 Anos) */}
          <WarrantySection
            onOpenSpecialist={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de falar com um especialista sobre a garantia e especificações dos painéis.');
            }}
          />

          {/* 5. Galeria de Produto em Destaque (Single Product Showcase) */}
          <FeaturedProductGallerySection
            onOpenProductQuote={(productTitle) => {
              handleOpenContactWithCustomMessage(`Olá! Gostaria de um orçamento personalizado para o ${productTitle}.`);
            }}
          />

          {/* 7. Final CTA Section */}
          <FinalCtaSection
            onRequestProject={() => {
              setContactPrefill('');
              setIsContactOpen(true);
            }}
            onTalkSpecialist={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de falar diretamente com um especialista da LED Machine.');
            }}
          />

          {/* 8. Social Networks & Community Section */}
          <SocialSection
            onOpenContactModal={() => {
              setContactPrefill('');
              setIsContactOpen(true);
            }}
          />
        </main>

        {/* Global Footer */}
        <Footer
          onNavigate={scrollToSection}
          onOpenContact={() => {
            setContactPrefill('');
            setIsContactOpen(true);
          }}
          onOpenTutorial={() => setIsTutorialOpen(true)}
        />
      </div>

      {/* 3. Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledNotes={contactPrefill}
      />

      <DemoPlaygroundModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSelectQuoteWithSpecs={(specs) => {
          setContactPrefill(`Especificações do Simulador:\n${specs}`);
          setIsContactOpen(true);
        }}
      />

      {/* 4. Visual Admin Editor Modal */}
      <VisualEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* 5. PDF / Printable Administrator Manual Modal */}
      <TutorialPdfModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <MainAppContent />
    </SiteContentProvider>
  );
}
