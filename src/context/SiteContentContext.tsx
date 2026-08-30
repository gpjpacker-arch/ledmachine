import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, defaultSiteContent } from '../data/siteContent';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const STORAGE_KEY = 'ledmachine_site_content_v1';
const FIRESTORE_DOC_ID = 'main_config';

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => Promise<boolean>;
  updateField: <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => void;
  resetToDefault: () => Promise<void>;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  exportContentJson: () => void;
  importContentJson: (jsonString: string) => boolean;
  isCloudSynced: boolean;
  isSavingCloud: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultSiteContent, ...parsed };
      }
    } catch (e) {
      console.warn('Erro ao carregar do cache local:', e);
    }
    return defaultSiteContent;
  });

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSavingCloud, setIsSavingCloud] = useState<boolean>(false);

  // 1. Real-time synchronization with Firebase Firestore
  useEffect(() => {
    if (!db) {
      setIsCloudSynced(false);
      return;
    }

    try {
      const docRef = doc(db, 'site_settings', FIRESTORE_DOC_ID);
      
      // Listen to real-time updates from Cloud Firestore
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data && data.content) {
              setContent((prev) => {
                const merged = { ...defaultSiteContent, ...data.content };
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                } catch (err) {
                  console.warn('Erro ao persistir local:', err);
                }
                return merged;
              });
              setIsCloudSynced(true);
            }
          } else {
            // First run: save initial default content to Firestore cloud
            setDoc(docRef, {
              content: defaultSiteContent,
              updatedAt: new Date().toISOString(),
              updatedBy: 'system_init',
            }).catch((err) => {
              console.warn('Erro ao inicializar Firebase:', err);
            });
            setIsCloudSynced(true);
          }
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

  // Update content both in state, localStorage, and Firestore Cloud
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
      const docRef = doc(db, 'site_settings', FIRESTORE_DOC_ID);
      await setDoc(docRef, {
        content: newContent,
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

  const updateField = <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => {
    setContent((prev) => {
      const currentSection = prev[section];
      let updated: SiteContent;
      if (typeof currentSection === 'object' && currentSection !== null && !Array.isArray(currentSection)) {
        updated = {
          ...prev,
          [section]: {
            ...currentSection,
            ...data,
          },
        };
      } else {
        updated = {
          ...prev,
          [section]: data as SiteContent[K],
        };
      }
      // Async sync to cloud
      updateContent(updated).catch(() => {});
      return updated;
    });
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
