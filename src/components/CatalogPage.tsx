import React, { useState } from 'react';
import { LedMachineLogo } from './LedMachineLogo';
import { useSiteContent } from '../context/SiteContentContext';
import { openButtonLink } from '../utils/linkHelper';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Sliders,
  Settings,
} from 'lucide-react';
import {
  CatalogCategory,
  CatalogCategoryData,
  defaultCatalogData,
} from '../data/siteContent';

export type { CatalogCategory };
import { CatalogEditorModal } from './CatalogEditorModal';

interface CatalogPageProps {
  initialCategory?: CatalogCategory;
  onNavigateHome: () => void;
  onNavigateSimulator?: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory,
  onNavigateHome,
}) => {
  const { content, updateField, isSavingCloud } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory | null>(
    initialCategory || null
  );
  const [isCatalogEditorOpen, setIsCatalogEditorOpen] = useState<boolean>(false);

  // Utiliza os dados do catálogo salvos no siteContent, com fallback garantido para as novas categorias
  const rawCatalog = (content.catalog as any) || {};
  const catalogData: Record<CatalogCategory, CatalogCategoryData> = {
    residencial: rawCatalog.residencial || defaultCatalogData.residencial,
    comercial: rawCatalog.comercial || defaultCatalogData.comercial,
  };

  const whatsappNumber = content.general?.whatsappNumber || '5519999107788';

  const handleOpenWhatsapp = (subject: string) => {
    const text = `Olá! Estava no catálogo da LED Machine e gostaria de informações sobre: ${subject}.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    openButtonLink(url);
  };

  const handleSaveCatalog = async (
    newCatalogData: Record<CatalogCategory, CatalogCategoryData>
  ): Promise<boolean> => {
    try {
      const ok = await updateField('catalog', newCatalogData as any);
      return ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleResetCatalog = async () => {
    try {
      await updateField('catalog', defaultCatalogData as any);
    } catch (err) {
      console.error(err);
    }
  };

  const categoriesKeys: CatalogCategory[] = ['residencial', 'comercial'];

  // =========================================================================
  // SUBPÁGINA DETALHADA: CAIXAS MINIMALISTAS APPLE (IMAGEM + INFORMAÇÕES)
  // Cada modelo possui sua caixa com imagem centralizada e especificações técnicas
  // =========================================================================
  if (selectedCategory) {
    const categoryData = catalogData[selectedCategory] || defaultCatalogData[selectedCategory];

    return (
      <div className="min-h-screen w-full bg-white text-[#1d1d1f] font-sans antialiased selection:bg-[#1d1d1f] selection:text-white flex flex-col justify-between">
        {/* Header Minimalista Apple */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#f0f0f2] px-6 sm:px-12 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-[#f5f5f7]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar às categorias</span>
            </button>

            <div onClick={onNavigateHome} className="cursor-pointer">
              <LedMachineLogo size="sm" />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Botão de Edição do Catálogo */}
              <button
                onClick={() => setIsCatalogEditorOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-[#d2d2d7] hover:border-[#1d1d1f] bg-white text-[#1d1d1f] text-xs font-semibold tracking-tight transition-all cursor-pointer shadow-sm hover:bg-[#f5f5f7]"
                title="Editar informações e fotos do catálogo"
              >
                <Settings className="w-3.5 h-3.5 text-[#1d1d1f]" />
                <span className="hidden sm:inline">Editar Catálogo</span>
                <span className="sm:hidden">Editar</span>
              </button>

              <button
                onClick={() => handleOpenWhatsapp(categoryData.title)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-[#333336] !text-white text-xs font-semibold tracking-tight transition-all cursor-pointer shadow-sm"
                style={{ color: '#ffffff', backgroundColor: '#1d1d1f' }}
              >
                <MessageCircle className="w-3.5 h-3.5 !text-white shrink-0" style={{ color: '#ffffff' }} />
                <span className="hidden sm:inline !text-white font-semibold" style={{ color: '#ffffff' }}>Solicitar orçamento</span>
                <span className="sm:hidden !text-white font-semibold" style={{ color: '#ffffff' }}>Orçamento</span>
              </button>
            </div>
          </div>
        </header>

        {/* Conteúdo Central da Categoria */}
        <main className="max-w-6xl mx-auto w-full px-6 sm:px-12 py-10 sm:py-14 flex-1">
          {/* Topo da Categoria com Título e Subtítulo Minimalistas */}
          <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
                {categoryData.title}
              </h1>
              <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed max-w-2xl">
                {categoryData.subtitle}
              </p>
            </div>

            <button
              onClick={() => setIsCatalogEditorOpen(true)}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs text-[#6e6e73] hover:text-[#1d1d1f] underline font-medium py-1 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Editar fotos e especificações</span>
            </button>
          </div>

          {/* AS CAIXAS DOS MODELOS (IMAGEM + INFORMAÇÃO NO ESTILO DO PRINT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {categoryData.models.map((item, idx) => (
              <div
                key={idx}
                className="group relative w-full rounded-[32px] bg-[#f5f5f7] p-7 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-[#ebebee]"
              >
                {/* Cabeçalho da Caixa do Modelo */}
                <div className="relative z-10 mb-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h2 className="text-xl sm:text-[22px] font-semibold tracking-tight text-[#1d1d1f] leading-tight">
                      {item.model}
                    </h2>
                    <span className="text-[11px] font-medium text-[#86868b] px-2.5 py-0.5 rounded-full bg-white/90 shadow-2xs shrink-0 whitespace-nowrap">
                      {item.pitch.toLowerCase().startsWith('p') ? `Pitch ${item.pitch}` : item.pitch}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#6e6e73] leading-relaxed font-normal mt-2 min-h-[36px]">
                    {item.description}
                  </p>
                </div>

                {/* Imagem do Modelo centralizada */}
                <div className="w-full min-h-[170px] sm:min-h-[190px] flex items-center justify-center my-3">
                  <div className="w-full max-w-[280px] aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white transition-transform duration-500 ease-out group-hover:scale-105">
                    <img
                      src={item.image}
                      alt={item.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Informações Técnicas da Caixa: Apenas Dimensões e Resolução */}
                <div className="relative z-10 pt-4 border-t border-[#e5e5ea] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-[#6e6e73]">
                    <span className="font-medium text-[#6e6e73]">Dimensões</span>
                    <span className="font-semibold text-[#1d1d1f]">
                      {item.moduleOrCabinetSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#6e6e73]">
                    <span className="font-medium text-[#6e6e73]">Resolução</span>
                    <span className="font-semibold text-[#1d1d1f]">
                      {item.resolution}
                    </span>
                  </div>

                  {/* Botão de Ação Cotar */}
                  <div className="pt-3">
                    <button
                      onClick={() =>
                        handleOpenWhatsapp(`${categoryData.title} - ${item.model}`)
                      }
                      className="w-full py-3 px-4 rounded-full bg-[#1d1d1f] hover:bg-[#333336] !text-white text-xs font-bold tracking-tight transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98]"
                      style={{ backgroundColor: '#1d1d1f', color: '#ffffff' }}
                    >
                      <span className="font-bold !text-white" style={{ color: '#ffffff' }}>Cotar {item.model}</span>
                      <ArrowRight className="w-3.5 h-3.5 !text-white shrink-0" style={{ color: '#ffffff' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card de Contato com Especialista Minimalista */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-[24px] bg-[#f5f5f7]">
            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">
                Precisa de um projeto sob medida para seu espaço?
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] mt-0.5">
                Nossos especialistas desenvolvem o cálculo estrutural e luminotécnico para o seu projeto.
              </p>
            </div>

            <button
              onClick={() => handleOpenWhatsapp(categoryData.title)}
              className="px-6 py-3 rounded-full bg-[#1d1d1f] hover:bg-[#333336] !text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 shadow-sm"
              style={{ color: '#ffffff', backgroundColor: '#1d1d1f' }}
            >
              <MessageCircle className="w-4 h-4 !text-white shrink-0" style={{ color: '#ffffff' }} />
              <span className="!text-white font-semibold" style={{ color: '#ffffff' }}>
                Falar com Especialista no WhatsApp
              </span>
            </button>
          </div>
        </main>

        {/* Footer Minimalista Apple */}
        <footer className="border-t border-[#f0f0f2] bg-white py-6 px-6 text-center text-xs text-[#86868b]">
          <p>© {new Date().getFullYear()} Led Machine Painéis</p>
        </footer>

        {/* Modal de Edição Exclusivo do Catálogo */}
        <CatalogEditorModal
          isOpen={isCatalogEditorOpen}
          onClose={() => setIsCatalogEditorOpen(false)}
          catalogData={catalogData}
          onSave={handleSaveCatalog}
          onReset={handleResetCatalog}
          isSavingCloud={isSavingCloud}
        />
      </div>
    );
  }

  // =========================================================================
  // VISTA PRINCIPAL DO CATÁLOGO:
  // Estilo Apple minimalista exato com as 3 caixas (Indoor, Outdoor, Rental).
  // Imagens perfeitamente centralizadas e tons neutros (cinza, chumbo, branco).
  // =========================================================================
  return (
    <div className="min-h-screen w-full bg-white text-[#1d1d1f] font-sans antialiased selection:bg-[#1d1d1f] selection:text-white flex flex-col justify-between">
      {/* Header Minimalista Apple com Logo e Voltar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#f0f0f2] px-6 sm:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div onClick={onNavigateHome} className="cursor-pointer">
            <LedMachineLogo size="md" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botão de Edição Rápida do Catálogo */}
            <button
              onClick={() => setIsCatalogEditorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-[#d2d2d7] hover:border-[#1d1d1f] bg-white text-[#1d1d1f] text-xs font-semibold tracking-tight transition-all cursor-pointer shadow-sm hover:bg-[#f5f5f7]"
              title="Menu de edição do catálogo"
            >
              <Settings className="w-3.5 h-3.5 text-[#1d1d1f]" />
              <span className="hidden sm:inline">Editar Catálogo</span>
              <span className="sm:hidden">Editar</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-[#f5f5f7]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main: AS 3 CAIXAS NO ESTILO APPLE COM IMAGENS CENTRALIZADAS */}
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-12 py-10 sm:py-16 flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
              Catálogo LED Machine
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b] mt-1">
              Selecione uma categoria para visualizar especificações técnicas de engenharia.
            </p>
          </div>

          <button
            onClick={() => setIsCatalogEditorOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors px-3 py-1.5 rounded-full hover:bg-[#f5f5f7] cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Personalizar fotos e textos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full">
          {categoriesKeys.map((catKey) => {
            const item = catalogData[catKey] || defaultCatalogData[catKey];

            return (
              <div
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className="group cursor-pointer relative w-full rounded-[32px] bg-[#f5f5f7] p-8 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-[#ebebee] hover:shadow-xl hover:-translate-y-1 min-h-[460px] sm:min-h-[500px]"
              >
                {/* Topo da Caixa */}
                <div className="relative z-10 max-w-[90%]">
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-3 leading-none">
                    {item.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed font-normal mb-5 line-clamp-3">
                    {item.subtitle}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1d1d1f] group-hover:text-black transition-colors py-1">
                    <span>Explorar catálogo {item.name.toLowerCase()}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>

                {/* Imagem do Produto perfeitamente centralizada na parte inferior */}
                <div className="w-full flex-1 min-h-[190px] sm:min-h-[220px] flex items-center justify-center pt-6 pointer-events-none">
                  <div className="w-full max-w-[340px] aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] bg-white transition-transform duration-500 ease-out group-hover:scale-105">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Minimalista Apple */}
      <footer className="border-t border-[#f0f0f2] bg-white py-6 px-6 text-center text-xs text-[#86868b]">
        <p>© {new Date().getFullYear()} Led Machine Painéis</p>
      </footer>

      {/* Modal de Edição Exclusivo do Catálogo */}
      <CatalogEditorModal
        isOpen={isCatalogEditorOpen}
        onClose={() => setIsCatalogEditorOpen(false)}
        catalogData={catalogData}
        onSave={handleSaveCatalog}
        onReset={handleResetCatalog}
        isSavingCloud={isSavingCloud}
      />
    </div>
  );
};
