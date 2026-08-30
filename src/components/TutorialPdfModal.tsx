import React from 'react';
import { X, Printer, Download, BookOpen, Edit3, Image, MessageSquare, RefreshCw, Layers, CheckCircle2, Shield, Globe } from 'lucide-react';

interface TutorialPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialPdfModal: React.FC<TutorialPdfModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-[#0b1329] border border-blue-900/50 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Header (No-print controls + Print-ready Title) */}
        <div className="p-6 bg-[#040817] border-b border-blue-900/40 flex items-center justify-between print:border-b-2 print:border-black print:bg-white print:p-0 print:pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 print:hidden">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight print:text-2xl print:text-black">
                Manual do Administrador & Guia de Edição
              </h2>
              <p className="text-xs text-blue-200/70 print:text-gray-600">
                LED Machine Painéis • www.ledmachinepaineis.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Salvar em PDF / Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-white/90 text-sm leading-relaxed print:overflow-visible print:p-0 print:pt-6 print:text-black">
          
          {/* Print Alert / Tip */}
          <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3 print:hidden">
            <Printer className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-100">
              <strong className="font-semibold text-white block mb-0.5">Dica para salvar em PDF:</strong>
              Clique no botão azul <strong>"Salvar em PDF / Imprimir"</strong> acima. Na janela de impressão do navegador, em <em>Destino</em>, escolha <strong>"Salvar como PDF"</strong>.
            </div>
          </div>

          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black border-b border-white/10 pb-2 print:border-gray-300">
              <Globe className="w-5 h-5 text-blue-400 print:text-blue-600" />
              1. Visão Geral do Site
            </h3>
            <p>
              O site da <strong>LED Machine Painéis</strong> foi construído em tecnologia de ponta (React + Tailwind CSS) com foco em velocidade ultrarrápida, design premium escuro com detalhes em azul neon e alta conversão para WhatsApp e solicitações de orçamento.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 print:text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Domínio Oficial:</strong> ledmachinepaineis.com</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Hospedagem:</strong> Hostinger (pasta public_html)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Simulador Interativo:</strong> Cálculos de dimensões e consumo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Garantia & Certificações:</strong> 2 Anos e atendimento nacional</span>
              </li>
            </ul>
          </section>

          {/* Section 2: Method 1 - Built-in Visual Editor */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black border-b border-white/10 pb-2 print:border-gray-300">
              <Edit3 className="w-5 h-5 text-blue-400 print:text-blue-600" />
              2. Método 1: Painel Visual Embutido (Direto na Tela)
            </h3>
            <p>
              O site conta com um <strong>Painel de Edição Visual</strong> exclusivo para alterar textos, telefones, links de WhatsApp e fotos sem precisar mexer em linhas de código.
            </p>

            <div className="bg-[#060c20] border border-blue-900/40 rounded-xl p-4 space-y-3 print:bg-gray-50 print:border-gray-300">
              <h4 className="font-semibold text-white print:text-black text-xs uppercase tracking-wider">
                Como abrir e usar:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs text-white/85 print:text-gray-800">
                <li>
                  Role a página até o rodapé (Footer) e clique no link azul <strong>"Painel de Edição de Textos & Fotos"</strong>.
                </li>
                <li>
                  Uma janela lateral se abrirá com abas organizadas:
                  <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-white/70 print:text-gray-600">
                    <li><strong>Geral:</strong> Telefone, WhatsApp comercial, e-mail e endereço.</li>
                    <li><strong>Hero Principal:</strong> Título principal, slogan, estatísticas e botões de chamada.</li>
                    <li><strong>Carrossel de Imagens:</strong> Troca de fotos e legendas dos ambientes.</li>
                    <li><strong>Soluções & Produtos:</strong> Modelos Indoor, Outdoor, Flexíveis e Curvos.</li>
                    <li><strong>Diferenciais & Garantia:</strong> Textos sobre os 2 anos de garantia e suporte.</li>
                    <li><strong>FAQ:</strong> Perguntas e respostas frequentes.</li>
                  </ul>
                </li>
                <li>
                  Edite os campos desejados e clique no botão verde <strong>"Salvar Alterações"</strong>.
                </li>
                <li>
                  <em>Opcional:</em> Você pode clicar em <strong>"Exportar Backup JSON"</strong> para guardar uma cópia das suas alterações no computador.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 3: Method 2 - Editing via AI Studio */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black border-b border-white/10 pb-2 print:border-gray-300">
              <MessageSquare className="w-5 h-5 text-blue-400 print:text-blue-600" />
              3. Método 2: Edição Inteligente pelo Google AI Studio
            </h3>
            <p>
              Você pode solicitar qualquer mudança apenas conversando em português neste chat. O assistente programa e aplica tudo na hora:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#060c20] border border-blue-900/40 rounded-lg space-y-1 print:bg-gray-50 print:border-gray-200">
                <strong className="text-blue-300 print:text-blue-700 block">Exemplos de Pedidos:</strong>
                <p className="text-white/75 print:text-gray-700">
                  • <em>"Mude o WhatsApp de contato para o número (11) 98888-7777."</em><br />
                  • <em>"Adicione um novo modelo P1.5 na seção de soluções residenciais."</em><br />
                  • <em>"Troque o texto da garantia para destacar troca expressa de módulos."</em>
                </p>
              </div>

              <div className="p-3 bg-[#060c20] border border-blue-900/40 rounded-lg space-y-1 print:bg-gray-50 print:border-gray-200">
                <strong className="text-blue-300 print:text-blue-700 block">Alteração de Fotos & Cores:</strong>
                <p className="text-white/75 print:text-gray-700">
                  • <em>"Gere uma nova imagem de showroom de luxo para o banner principal."</em><br />
                  • <em>"Ajuste os botões para um tom azul ainda mais vibrante."</em>
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Publishing Updates to Hostinger */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black border-b border-white/10 pb-2 print:border-gray-300">
              <RefreshCw className="w-5 h-5 text-blue-400 print:text-blue-600" />
              4. Como Publicar Novas Atualizações na Hostinger
            </h3>
            <p>
              Sempre que fizer novas modificações no site e quiser enviá-las para a Hostinger, siga este passo a passo de 1 minuto:
            </p>

            <div className="bg-[#060c20] border border-blue-900/40 rounded-xl p-4 space-y-2 text-xs text-white/85 print:bg-gray-50 print:border-gray-300 print:text-gray-800">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500 text-blue-300 flex items-center justify-center font-bold shrink-0 text-[10px] print:bg-gray-200 print:text-black">1</span>
                <div>
                  <strong>Sincronizar no GitHub:</strong> No Google AI Studio, clique no botão <strong>GitHub</strong> no topo direito e depois em <strong>Push changes to GitHub</strong>.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500 text-blue-300 flex items-center justify-center font-bold shrink-0 text-[10px] print:bg-gray-200 print:text-black">2</span>
                <div>
                  <strong>Baixar o ZIP:</strong> Acesse seu GitHub (<a href="https://github.com/gpjpacker-arch/ledmachine" target="_blank" rel="noreferrer" className="text-blue-400 underline">github.com/gpjpacker-arch/ledmachine</a>), clique no botão verde <strong>&lt;&gt; Code</strong> &gt; <strong>Download ZIP</strong>.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500 text-blue-300 flex items-center justify-center font-bold shrink-0 text-[10px] print:bg-gray-200 print:text-black">3</span>
                <div>
                  <strong>Extrair a pasta dist:</strong> Abra o ZIP e extraia o arquivo <code>dist.tar.gz</code> ou os arquivos de dentro da pasta <code>dist/</code> (que contém o <code>index.html</code>, a pasta <code>assets/</code> e o <code>.htaccess</code>).
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500 text-blue-300 flex items-center justify-center font-bold shrink-0 text-[10px] print:bg-gray-200 print:text-black">4</span>
                <div>
                  <strong>Enviar para a Hostinger:</strong> No Gerenciador de Arquivos da Hostinger, acesse a pasta <code>public_html</code> e envie os novos arquivos (substituindo os anteriores).
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Structure of Project Files */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black border-b border-white/10 pb-2 print:border-gray-300">
              <Layers className="w-5 h-5 text-blue-400 print:text-blue-600" />
              5. Estrutura dos Arquivos de Conteúdo (Para Desenvolvedores)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-[#060c20] border border-blue-900/30 rounded-lg print:bg-gray-50">
                <span className="font-mono text-blue-300 print:text-blue-700 block">/src/data/siteContent.ts</span>
                <p className="text-white/70 print:text-gray-600">Contém todos os textos, números de telefone, dados de contato e listas de especificações.</p>
              </div>
              <div className="p-3 bg-[#060c20] border border-blue-900/30 rounded-lg print:bg-gray-50">
                <span className="font-mono text-blue-300 print:text-blue-700 block">/src/components/</span>
                <p className="text-white/70 print:text-gray-600">Componentes modulares de cada seção da página (Hero, Soluções, Calculadora, Rodapé, etc.).</p>
              </div>
            </div>
          </section>

          {/* Footer inside document */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 print:text-gray-500 print:border-gray-300">
            <span>© {new Date().getFullYear()} LED Machine Painéis. Todos os direitos reservados.</span>
            <span>Documento emitido para: gpjpacker@gmail.com</span>
          </div>

        </div>

      </div>
    </div>
  );
};
