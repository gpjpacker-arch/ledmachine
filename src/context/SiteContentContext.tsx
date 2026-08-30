import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, defaultSiteContent } from '../data/siteContent';

const STORAGE_KEY = 'ledmachine_site_content_v1';

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  updateField: <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => void;
  resetToDefault: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  exportContentJson: () => void;
  importContentJson: (jsonString: string) => boolean;
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
      console.warn('Erro ao carregar conteúdo customizado do localStorage:', e);
    }
    return defaultSiteContent;
  });

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('Erro ao salvar conteúdo no localStorage:', e);
    }
  }, [content]);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const updateField = <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => {
    setContent((prev) => {
      const currentSection = prev[section];
      if (typeof currentSection === 'object' && currentSection !== null && !Array.isArray(currentSection)) {
        return {
          ...prev,
          [section]: {
            ...currentSection,
            ...data,
          },
        };
      }
      return {
        ...prev,
        [section]: data as SiteContent[K],
      };
    });
  };

  const resetToDefault = () => {
    setContent(defaultSiteContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
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
      setContent({ ...defaultSiteContent, ...parsed });
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
