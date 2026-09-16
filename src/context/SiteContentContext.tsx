import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, defaultSiteContent } from '../data/siteContent';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';

const STORAGE_KEY = 'ledmachine_site_content_v5';
const FIRESTORE_DOC_ID = 'main_config';

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => Promise<boolean>;
  updateField: <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => Promise<boolean>;
  resetToDefault: () => Promise<void>;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  editorInitialTab?: string;
  openAdminEditor: (tab?: string) => void;
  exportContentJson: () => void;
  importContentJson: (jsonString: string) => boolean;
  isCloudSynced: boolean;
  isSavingCloud: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const STANDARD_WHATSAPP_LINK =
  'https://wa.me/5519999107788?text=Ol%C3%A1!%20Vi%20o%20site%20da%20LED%20Machine%20e%20quero%20solicitar%20um%20projeto%20sob%20medida.';

function normalizeWhatsappLinks(sc: SiteContent): SiteContent {
  const updatedButtons = {
    ...(defaultSiteContent.buttonLinks || {}),
    ...(sc.buttonLinks || {}),
  } as NonNullable<SiteContent['buttonLinks']>;

  // Ensure any configured button pointing to WhatsApp or any of the core WhatsApp buttons has the exact standard link
  const whatsappKeys: (keyof NonNullable<SiteContent['buttonLinks']>)[] = [
    'featuredProductWhatsapp',
    'finalCtaWhatsapp',
    'socialWhatsapp',
    'footerPhone',
  ];

  whatsappKeys.forEach((key) => {
    if (!updatedButtons[key] || updatedButtons[key].includes('wa.me')) {
      updatedButtons[key] = STANDARD_WHATSAPP_LINK;
    }
  });

  (Object.keys(updatedButtons) as (keyof NonNullable<SiteContent['buttonLinks']>)[]) .forEach((k) => {
    if (updatedButtons[k]?.includes('wa.me')) {
      updatedButtons[k] = STANDARD_WHATSAPP_LINK;
    }
  });

  let updatedFeaturedGallery = sc.featuredGallery;
  if (
    !updatedFeaturedGallery ||
    updatedFeaturedGallery.titleHighlight === 'Cinema Series' ||
    updatedFeaturedGallery.subtitle?.includes('Fine-Pitch Master Wall') ||
    (updatedFeaturedGallery.title === 'LED Machine' && updatedFeaturedGallery.titleHighlight === 'Cinema Series') ||
    updatedFeaturedGallery.title === 'Os melhores Projetos'
  ) {
    updatedFeaturedGallery = {
      ...(updatedFeaturedGallery || defaultSiteContent.featuredGallery),
      title: 'Os melhores projetos',
      titleHighlight: 'LED Machine',
      subtitle:
        'Conheça os detalhes dos nossos projetos sob medida: especificações técnicas de alta precisão, tecnologia de ponta e o mais elevado nível de acabamento.',
    };
  }

  let updatedWhyUs = sc.whyUs;
  if (
    !updatedWhyUs ||
    updatedWhyUs.title?.includes('Engenharia de precisão') ||
    !updatedWhyUs.cards ||
    updatedWhyUs.cards.length !== 6 ||
    updatedWhyUs.cards.some((c: any) => c.title === 'Projetos 100% Personalizados' || c.tag === '2 Anos de Garantia')
  ) {
    updatedWhyUs = defaultSiteContent.whyUs;
  } else if (updatedWhyUs.badge === 'Diferenciais Exclusivos') {
    updatedWhyUs = { ...updatedWhyUs, badge: '' };
  }

  if (updatedWhyUs?.cards) {
    updatedWhyUs = {
      ...updatedWhyUs,
      cards: updatedWhyUs.cards.map((c: any) => {
        if (c.title === 'Do projeto à instalação' || c.id === 6) {
          if (!c.description || c.description === 'Cuidamos de todas as etapas técnicas para garantir máxima precisão, segurança e um resultado final impecável.') {
            return {
              ...c,
              description: 'Cuidamos de todas as etapas técnicas para garantir máxima precisão, segurança e um resultado final impecável. A Led Machine oferece projeto em 3D, acompanhamento com engenheiro e emissão de ART, além de todo o suporte técnico necessário do projeto à instalação.',
            };
          }
        }
        return c;
      }),
    };
  }

  if (
    updatedWhyUs?.title === 'Tecnologia que você percebe.' ||
    updatedWhyUs?.title === 'Tecnologia e Qualidade'
  ) {
    updatedWhyUs = {
      ...updatedWhyUs,
      title: 'Tecnologia e qualidade',
      titleHighlight: 'no seu painel de LED',
    };
  }

  let updatedHero = sc.hero;
  if (updatedHero) {
    let cleanGuaranteeNotice = updatedHero.guaranteeNotice;
    if (
      !cleanGuaranteeNotice ||
      cleanGuaranteeNotice.includes('2 Anos') ||
      cleanGuaranteeNotice.includes('Suporte Nacional')
    ) {
      cleanGuaranteeNotice = '2 anos de garantia com suporte técnico especializado.';
    }

    updatedHero = {
      ...updatedHero,
      ctaPrimaryText: updatedHero.ctaPrimaryText === 'Solicitar Projeto' ? 'Solicitar projeto' : updatedHero.ctaPrimaryText || 'Solicitar projeto',
      ctaSecondaryText: updatedHero.ctaSecondaryText === 'Ver Galeria de Projetos' ? 'Ver galeria de projetos' : updatedHero.ctaSecondaryText || 'Ver galeria de projetos',
      guaranteeNotice: cleanGuaranteeNotice,
      trustText: updatedHero.trustText || defaultSiteContent.hero.trustText || 'Confiado por mais de 100 marcas, arquitetos e residências de alto padrão',
      clientLogos: !updatedHero.clientLogos || updatedHero.clientLogos.length === 0 ? ['Jangada', 'Casa da Esfiha', 'Hotel Capsula', 'Abilitá'] : updatedHero.clientLogos,
    };
  }

  let updatedWarranty = sc.warranty || defaultSiteContent.warranty;
  if (
    !updatedWarranty ||
    updatedWarranty.title?.includes('2 Anos') ||
    updatedWarranty.title?.includes('Suporte Nacional') ||
    updatedWarranty.badge === '2 Anos de Garantia' ||
    updatedWarranty.badge === '2 ANOS DE GARANTIA' ||
    updatedWarranty.badge === 'Confiança Inabalável'
  ) {
    updatedWarranty = defaultSiteContent.warranty;
  }

  let updatedFinalCta = sc.finalCta || defaultSiteContent.finalCta;
  if (
    !updatedFinalCta ||
    updatedFinalCta.btnPrimary === 'Solicitar Projeto Sob Medida' ||
    updatedFinalCta.btnSecondary?.includes('Especialista') ||
    updatedFinalCta.guaranteeSeal?.includes('Suporte em todo o Brasil')
  ) {
    updatedFinalCta = defaultSiteContent.finalCta;
  }

  if (
    !updatedButtons.socialMaps ||
    updatedButtons.socialMaps.includes('LED+Machine+Paineis+de+LED+Sao+Paulo') ||
    updatedButtons.socialMaps.includes('maps/search')
  ) {
    updatedButtons.socialMaps = 'https://share.google/e2fpI9CJ972PHCw3Q';
  }

  const updatedAddress =
    !sc.general?.address ||
    sc.general.address.includes('São Paulo - SP') ||
    sc.general.address.includes('Atendimento em todo o Brasil')
      ? 'R. Dr. José Rodrigues de Almeida, 632 - Paulicéia, Piracicaba - SP'
      : sc.general.address;

  // Ensure carousel project specs match the latest updated technical definitions
  const updatedCarousel = sc.carousel ? {
    ...sc.carousel,
    projects: sc.carousel.projects.map((proj, idx) => {
      const defaultProj = defaultSiteContent.carousel.projects[idx];
      if (defaultProj) {
        return {
          ...proj,
          pitch: defaultProj.pitch,
          brightness: defaultProj.brightness,
        };
      }
      return proj;
    }),
  } : defaultSiteContent.carousel;

  return {
    ...sc,
    carousel: updatedCarousel,
    general: {
      ...sc.general,
      address: updatedAddress,
      whatsappNumber: '5519999107788',
      whatsappMessage:
        'Olá! Vi o site da LED Machine e quero solicitar um projeto sob medida.',
      phoneContact: '(19) 99910-7788',
    },
    hero: updatedHero,
    whyUs: updatedWhyUs,
    warranty: updatedWarranty,
    finalCta: updatedFinalCta,
    featuredGallery: updatedFeaturedGallery,
    buttonLinks: updatedButtons,
  };
}

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      localStorage.removeItem('ledmachine_site_content_v4');
      localStorage.removeItem('ledmachine_site_content_v3');
      localStorage.removeItem('ledmachine_site_content_v2');
      localStorage.removeItem('ledmachine_site_content');
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return normalizeWhatsappLinks({ ...defaultSiteContent, ...parsed });
      }
    } catch (e) {
      console.warn('Erro ao carregar do cache local:', e);
    }
    return normalizeWhatsappLinks(defaultSiteContent);
  });

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editorInitialTab, setEditorInitialTab] = useState<string | undefined>(undefined);
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSavingCloud, setIsSavingCloud] = useState<boolean>(false);

  const openAdminEditor = (tab?: string) => {
    if (tab) {
      setEditorInitialTab(tab);
    }
    setIsEditorOpen(true);
  };

  // 1. Real-time synchronization with Firebase Firestore using modular documents
  // to avoid hitting Firestore's 1MB single-document quota.
  useEffect(() => {
    if (!db) {
      setIsCloudSynced(false);
      return;
    }

    try {
      const unsubscribe = onSnapshot(
        collection(db, 'site_settings'),
        (snapshot) => {
          if (snapshot.empty) {
            // First run: initialize main_config
            const mainDocRef = doc(db, 'site_settings', FIRESTORE_DOC_ID);
            setDoc(mainDocRef, {
              content: defaultSiteContent,
              updatedAt: new Date().toISOString(),
              updatedBy: 'system_init',
            }).catch((err) => {
              console.warn('Erro ao inicializar Firebase:', err);
            });
            setIsCloudSynced(true);
            return;
          }

          let mainContent: Partial<SiteContent> | null = null;
          let featuredGalleryData: any = null;
          let carouselData: any = null;
          let widescreenData: any = null;

          snapshot.docs.forEach((docSnap) => {
            const docId = docSnap.id;
            const data = docSnap.data();
            if (docId === 'main_config' && data?.content) {
              mainContent = data.content;
            } else if (docId === 'featured_gallery' && (data?.data || data?.content)) {
              featuredGalleryData = data.data || data.content;
            } else if (docId === 'carousel' && (data?.data || data?.content)) {
              carouselData = data.data || data.content;
            } else if (docId === 'widescreen' && (data?.data || data?.content)) {
              widescreenData = data.data || data.content;
            }
          });

          setContent((prev) => {
            const merged: SiteContent = normalizeWhatsappLinks({
              ...defaultSiteContent,
              ...prev,
              ...(mainContent || {}),
              ...(featuredGalleryData ? { featuredGallery: featuredGalleryData } : {}),
              ...(carouselData ? { carousel: carouselData } : {}),
              ...(widescreenData ? { widescreenBanner: widescreenData } : {}),
            });

            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch (err) {
              console.warn('Erro ao persistir local:', err);
            }
            return merged;
          });
          setIsCloudSynced(true);
        },
        (error) => {
          console.warn('Firestore fallback para local (offline ou sem conexão):', error);
          setIsCloudSynced(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase init error:', err);
    }
  }, []);

  // Update entire content across modular collections
  const updateContent = async (newContent: SiteContent): Promise<boolean> => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.warn('Erro ao salvar localmente:', e);
    }

    if (!db) {
      return true;
    }

    setIsSavingCloud(true);
    try {
      // 1. Save featuredGallery in its dedicated document (up to 1MB quota dedicated)
      if (newContent.featuredGallery) {
        const galleryDocRef = doc(db, 'site_settings', 'featured_gallery');
        await setDoc(galleryDocRef, {
          data: newContent.featuredGallery,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin_panel',
        });
      }

      // 2. Save carousel in its dedicated document (up to 1MB quota dedicated)
      if (newContent.carousel) {
        const carouselDocRef = doc(db, 'site_settings', 'carousel');
        await setDoc(carouselDocRef, {
          data: newContent.carousel,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin_panel',
        });
      }

      // 3. Save widescreen in dedicated document
      if (newContent.widescreenBanner) {
        const widescreenDocRef = doc(db, 'site_settings', 'widescreen');
        await setDoc(widescreenDocRef, {
          data: newContent.widescreenBanner,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin_panel',
        });
      }

      // 4. Save main_config with lightweight references for heavy assets
      const mainDocRef = doc(db, 'site_settings', FIRESTORE_DOC_ID);
      const lightweightContent = {
        ...newContent,
        featuredGallery: {
          ...newContent.featuredGallery,
          // Prevent storing heavy base64 strings in main_config since they are in featured_gallery
          images: (newContent.featuredGallery?.images || []).map((img) => ({
            ...img,
            url: img.url && img.url.startsWith('data:') ? 'saved_in_dedicated_featured_gallery_doc' : img.url,
          })),
        },
        carousel: {
          ...newContent.carousel,
          projects: (newContent.carousel?.projects || []).map((p) => ({
            ...p,
            imageUrl:
              p.imageUrl && p.imageUrl.startsWith('data:')
                ? 'https://ledmachinepaineis.com/assets/led_curved_living_1788059274464-D1t_CX-N.jpg'
                : p.imageUrl,
          })),
        },
      };

      await setDoc(mainDocRef, {
        content: lightweightContent,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin_panel',
      });

      setIsCloudSynced(true);
      setIsSavingCloud(false);
      return true;
    } catch (err) {
      console.error('Erro ao salvar no Firestore Cloud:', err);
      setIsSavingCloud(false);
      return false;
    }
  };

  // Update a single section targeted directly to its dedicated document
  const updateField = async <K extends keyof SiteContent>(
    section: K,
    data: Partial<SiteContent[K]>
  ): Promise<boolean> => {
    // 1. Synchronously resolve current section and calculate updated section data
    const currentSection = content[section];
    let updatedSectionData: any;
    if (typeof currentSection === 'object' && currentSection !== null && !Array.isArray(currentSection)) {
      updatedSectionData = {
        ...currentSection,
        ...data,
      };
    } else {
      updatedSectionData = data;
    }

    const fullSnapshot: SiteContent = {
      ...content,
      [section]: updatedSectionData,
    };

    // Update state and localStorage synchronously
    setContent(fullSnapshot);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullSnapshot));
    } catch (e) {
      console.warn('Erro ao salvar localmente:', e);
    }

    if (!db) {
      return true;
    }

    setIsSavingCloud(true);
    try {
      if (section === 'featuredGallery') {
        const galleryDocRef = doc(db, 'site_settings', 'featured_gallery');
        await setDoc(galleryDocRef, {
          data: updatedSectionData,
          updatedAt: new Date().toISOString(),
          updatedBy: 'gallery_direct_editor',
        });
      } else if (section === 'carousel') {
        const carouselDocRef = doc(db, 'site_settings', 'carousel');
        await setDoc(carouselDocRef, {
          data: updatedSectionData,
          updatedAt: new Date().toISOString(),
          updatedBy: 'carousel_direct_editor',
        });
      } else if (section === 'widescreenBanner') {
        const widescreenDocRef = doc(db, 'site_settings', 'widescreen');
        await setDoc(widescreenDocRef, {
          data: updatedSectionData,
          updatedAt: new Date().toISOString(),
          updatedBy: 'widescreen_direct_editor',
        });
      } else {
        // All text and configuration fields go to main_config
        const mainDocRef = doc(db, 'site_settings', FIRESTORE_DOC_ID);
        const lightweightContent = {
          ...fullSnapshot,
          [section]: updatedSectionData,
          featuredGallery: {
            ...fullSnapshot.featuredGallery,
            images: (fullSnapshot.featuredGallery?.images || []).map((img) => ({
              ...img,
              url: img.url && img.url.startsWith('data:') ? 'saved_in_dedicated_featured_gallery_doc' : img.url,
            })),
          },
          carousel: {
            ...fullSnapshot.carousel,
            projects: (fullSnapshot.carousel?.projects || []).map((p) => ({
              ...p,
              imageUrl:
                p.imageUrl && p.imageUrl.startsWith('data:')
                  ? 'https://ledmachinepaineis.com/assets/led_curved_living_1788059274464-D1t_CX-N.jpg'
                  : p.imageUrl,
            })),
          },
        };
        await setDoc(mainDocRef, {
          content: lightweightContent,
          updatedAt: new Date().toISOString(),
          updatedBy: 'field_direct_editor',
        });
      }

      setIsCloudSynced(true);
      setIsSavingCloud(false);
      return true;
    } catch (err) {
      console.error(`Erro ao salvar seção ${String(section)} no Firestore Cloud:`, err);
      setIsSavingCloud(false);
      return false;
    }
  };

  const resetToDefault = async () => {
    setContent(defaultSiteContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (db) {
        const docRef = doc(db, 'site_settings', FIRESTORE_DOC_ID);
        await setDoc(docRef, {
          content: defaultSiteContent,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin_reset',
        });
        const galleryDocRef = doc(db, 'site_settings', 'featured_gallery');
        await setDoc(galleryDocRef, {
          data: defaultSiteContent.featuredGallery,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin_reset',
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const exportContentJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'conteudo-ledmachine.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importContentJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      const merged = { ...defaultSiteContent, ...parsed };
      updateContent(merged);
      return true;
    } catch (e) {
      console.error('JSON inválido:', e);
      return false;
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateContent,
        updateField,
        resetToDefault,
        isEditorOpen,
        setIsEditorOpen,
        editorInitialTab,
        openAdminEditor,
        exportContentJson,
        importContentJson,
        isCloudSynced,
        isSavingCloud,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
