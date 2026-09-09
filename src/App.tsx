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
import { GlobalAmbientLights } from './components/GlobalAmbientLights';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [contactPrefill, setContactPrefill] = useState<string>('');
  const { isEditorOpen, setIsEditorOpen, editorInitialTab } = useSiteContent();

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
      className="min-h-screen w-full bg-[#020617] text-white relative selection:bg-blue-600 selection:text-white overflow-x-hidden"
    >
      {/* Dynamic 3D Background Ambience with Mouse/Scroll Parallax Motion */}
      <GlobalAmbientLights />

      {/* Main Visual Frame */}
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
            onRequestQuoteWithDetails={(title, cat) => {
              handleOpenContactWithCustomMessage(`Olá! Gostaria de um projeto personalizado similar ao '${title}' (Categoria: ${cat}).`);
            }}
          />

          {/* 2. Key Pillars / Why LED Machine */}
          <WhyLedMachineSection
            onSelectBlock={(blockTitle) => {
              handleOpenContactWithCustomMessage(`Olá! Gostaria de saber mais sobre: ${blockTitle}`);
            }}
          />

          {/* 3. Widescreen Outdoor LED Banner Showcase */}
          <WidescreenLedBanner
            onOpenProjectQuote={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de um orçamento para um projeto de painel de LED Outdoor de alta performance.');
            }}
          />

          {/* 4. Solutions Showcase (Commercial & Residential) */}
          <SolutionsSection
            onOpenCommercialQuote={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de uma consultoria e projeto para ambiente Comercial.');
            }}
            onOpenResidentialQuote={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de um projeto de painel de LED para minha Residência.');
            }}
          />

          {/* 5. 2-Year Warranty & Reliability Badge */}
          <WarrantySection
            onOpenSpecialist={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de falar com um especialista sobre a garantia e especificações dos painéis.');
            }}
          />

          {/* 6. Featured Product Deep-Dive Gallery */}
          <FeaturedProductGallerySection
            onOpenProductQuote={(productName) => {
              handleOpenContactWithCustomMessage(`Olá! Gostaria de um orçamento personalizado para o ${productName}.`);
            }}
          />

          {/* 7. Final Project CTA */}
          <FinalCtaSection
            onRequestProject={() => {
              setContactPrefill('');
              setIsContactOpen(true);
            }}
            onTalkSpecialist={() => {
              handleOpenContactWithCustomMessage('Olá! Gostaria de falar diretamente com um especialista da LED Machine.');
            }}
          />

          {/* 8. Social Media & Channels */}
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

      {/* Interactive Modals */}
      {/* 1. Direct Specialist Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledNotes={contactPrefill}
      />

      {/* 2. Interactive Simulator & Demo Playground */}
      <DemoPlaygroundModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSelectQuoteWithSpecs={(specs) => {
          setContactPrefill(`Especificações do Simulador:\n${specs}`);
          setIsContactOpen(true);
        }}
      />

      {/* 3. Visual Admin Editor Modal */}
      <VisualEditorModal
        isOpen={isEditorOpen}
        initialTab={editorInitialTab}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* 4. PDF / Printable Administrator Manual Modal */}
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
