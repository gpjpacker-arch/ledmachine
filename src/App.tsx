import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyLedMachineSection } from './components/WhyLedMachineSection';
import { SolutionsSection } from './components/SolutionsSection';
import { SimulatorSection } from './components/SimulatorSection';
import { WarrantySection } from './components/WarrantySection';
import { FeaturedProductGallerySection } from './components/FeaturedProductGallerySection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { DemoPlaygroundModal } from './components/DemoPlaygroundModal';
import { VisualEditorModal } from './components/VisualEditorModal';
import { TutorialPdfModal } from './components/TutorialPdfModal';
import { GlobalAmbientLights } from './components/GlobalAmbientLights';
import { VideoLandingPage } from './components/VideoLandingPage';
import { SimulatorLandingPage } from './components/SimulatorLandingPage';
import { AmbientesLandingPage } from './components/AmbientesLandingPage';
import { CatalogPage, CatalogCategory } from './components/CatalogPage';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function getInitialRoute(): string {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase().replace('#', '');
  
  if (path === '/video' || hash === '/video' || hash === 'video') return '/video';
  if (path === '/simulador' || hash === '/simulador' || hash === 'simulador-page') return '/simulador';
  if (path === '/ambientes' || hash === '/ambientes' || hash === 'ambientes') return '/ambientes';
  if (path.startsWith('/catalogo') || hash.startsWith('/catalogo') || hash.startsWith('catalogo')) {
    return path || hash;
  }
  return '/';
}

function MainAppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [contactPrefill, setContactPrefill] = useState<string>('');
  const { isEditorOpen, setIsEditorOpen, editorInitialTab } = useSiteContent();
  const { isLight } = useTheme();

  // Listen for browser navigation (popstate/hashchange)
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(getInitialRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigateTo = (route: string) => {
    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', route);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll listener to update active section in navbar (only active on home page)
  useEffect(() => {
    if (currentRoute !== '/') return;

    const handleScroll = () => {
      const sections = [
        'home',
        'diferenciais',
        'simulador',
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
  }, [currentRoute]);

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(`${sectionId}-section`) || document.getElementById('hero-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

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

  // 1. Rota /video: Landing Page de Alta Conversão com vídeo e botão WhatsApp direto
  if (currentRoute === '/video') {
    return (
      <div className={`min-h-screen ${isLight ? 'theme-light bg-white text-[#1d1d1f]' : 'theme-dark bg-[#05060b] text-white'}`}>
        <VideoLandingPage onNavigateHome={() => navigateTo('/')} />

        {/* Modal de Edição caso o admin acione pela sessão */}
        <VisualEditorModal
          isOpen={isEditorOpen}
          initialTab={editorInitialTab}
          onClose={() => setIsEditorOpen(false)}
        />
      </div>
    );
  }

  // 2. Rota /simulador: Landing Page do Simulador Interativo com botão WhatsApp
  if (currentRoute === '/simulador') {
    return (
      <div className={`min-h-screen ${isLight ? 'theme-light bg-white text-[#1d1d1f]' : 'theme-dark bg-[#030712] text-white'}`}>
        <SimulatorLandingPage
          onOpenContactWithSpecs={(specs) => {
            setContactPrefill(`Especificações do Simulador:\n${specs}`);
            setIsContactOpen(true);
          }}
          onNavigateHome={() => navigateTo('/')}
        />

        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          prefilledNotes={contactPrefill}
        />

        <VisualEditorModal
          isOpen={isEditorOpen}
          initialTab={editorInitialTab}
          onClose={() => setIsEditorOpen(false)}
        />
      </div>
    );
  }

  // 3. Rota /ambientes: Placeholder
  if (currentRoute === '/ambientes') {
    return (
      <div className={`min-h-screen ${isLight ? 'theme-light bg-white text-[#1d1d1f]' : 'theme-dark bg-[#05060b] text-white'}`}>
        <AmbientesLandingPage onNavigateHome={() => navigateTo('/')} />

        <VisualEditorModal
          isOpen={isEditorOpen}
          initialTab={editorInitialTab}
          onClose={() => setIsEditorOpen(false)}
        />
      </div>
    );
  }

  // 4. Rota /catalogo (e subpáginas /catalogo/indoor, /catalogo/outdoor, /catalogo/rental)
  // A página de catálogo é sempre na paleta CLARA e elegante conforme solicitado pelo usuário
  if (currentRoute.startsWith('/catalogo')) {
    let initialCat: CatalogCategory | undefined = undefined;
    if (currentRoute.includes('indoor')) initialCat = 'indoor';
    else if (currentRoute.includes('outdoor')) initialCat = 'outdoor';
    else if (currentRoute.includes('rental')) initialCat = 'rental';

    return (
      <div className="theme-light bg-white text-[#1d1d1f] min-h-screen">
        <CatalogPage
          initialCategory={initialCat}
          onNavigateHome={() => navigateTo('/')}
          onNavigateSimulator={() => navigateTo('/simulador')}
        />

        <VisualEditorModal
          isOpen={isEditorOpen}
          initialTab={editorInitialTab}
          onClose={() => setIsEditorOpen(false)}
        />
      </div>
    );
  }

  // Rota Principal (Home Page "/")
  return (
    <div
      id="ledmachine-app-root"
      className={`min-h-screen w-full relative selection:bg-blue-600 selection:text-white overflow-x-hidden transition-colors duration-300 ${
        isLight ? 'light bg-white text-[#1d1d1f]' : 'dark bg-[#020617] text-white'
      }`}
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
          onOpenSimulator={() => scrollToSection('simulador')}
          onNavigateCatalog={(cat) => {
            if (cat) {
              navigateTo(`/catalogo/${cat}`);
            } else {
              navigateTo('/catalogo');
            }
          }}
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
            onOpenPlayground={() => scrollToSection('simulador')}
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

          {/* 3. Interactive Simulator Section (Subiu para o lugar do banner/galeria, visível em Dark e Claro) */}
          <SimulatorSection
            onRequestQuoteWithSpecs={(specsText) => {
              handleOpenContactWithCustomMessage(`Olá! Utilizei o simulador da LED Machine e gostaria de um orçamento com estas especificações:\n\n${specsText}`);
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

          {/* 6. 2-Year Warranty & Reliability Badge */}
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

          {/* 7. Social Media & Channels */}
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
    <ThemeProvider>
      <SiteContentProvider>
        <MainAppContent />
      </SiteContentProvider>
    </ThemeProvider>
  );
}
