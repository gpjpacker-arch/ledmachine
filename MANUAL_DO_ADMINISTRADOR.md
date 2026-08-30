# Manual do Administrador & Guia de Publicação
**LED Machine Painéis** • `www.ledmachinepaineis.com`  
*Documento de Suporte & Manutenção*

---

## 1. Visão Geral da Aplicação
O site da **LED Machine Painéis** é uma Single-Page Application (SPA) construída em **React 18 + Vite + Tailwind CSS**, otimizada para carregamento ultra-rápido em CDN e alta conversão para atendimento via WhatsApp, agora equipada com **Banco de Dados em Nuvem (Cloud Firestore)** integrado.

- **Domínio Principal:** `https://ledmachinepaineis.com`
- **Hospedagem:** Hostinger (diretório `public_html`)
- **Garantia Oficial:** 2 Anos de Garantia Integral
- **Senha de Acesso ao Painel Admin:** `199722`

---

## 2. Como o Cliente Edita o Site Diretamente no Ar (CMS em Nuvem)

Quando o site estiver no ar em `ledmachinepaineis.com`:

1. **Acessar o Painel:**
   - Role até o final da página (rodapé) e clique em **"Editar Conteúdo"**.
   - Digite a senha administrativa: **`199722`**.

2. **Alterar as Informações:**
   - **Gerais & Logotipo:** Telefone de contato, WhatsApp de atendimento, e-mail e upload do arquivo de imagem do logotipo (com controle deslizante de tamanho).
   - **Topo / Hero Principal:** Frases de impacto, subtítulos e chamadas para orçamento.
   - **Projetos Realizados:** Fotos em alta resolução e legendas de ambientes.
   - **Soluções & Produtos:** Catálogo de painéis Indoor, Outdoor, Flexíveis e Curvos.
   - **Diferenciais & Garantia:** Destaques dos 2 anos de garantia e assistência técnica.
   - **Perguntas Frequentes (FAQ):** Respostas para dúvidas comuns de clientes.

3. **Salvar:**
   - Clique no botão azul **"Salvar Alterações no Site (Nuvem)"**.
   - **Pronto!** A atualização é gravada instantaneamente no banco de dados na nuvem e **fica visível na mesma hora para todos os clientes e visitantes** que acessarem o site pelo celular ou computador, sem necessidade de recompilar ou reenviar arquivos para a Hostinger!

---

## 3. Publicação Inicial ou Atualizações Estruturais na Hostinger

1. **Gerar a versão de produção:**
   - Compile a pasta de arquivos estáticos `dist/`.
2. **Subir na Hostinger:**
   - Acesse o **hPanel da Hostinger** > **Gerenciador de Arquivos**.
   - Abra a pasta **`public_html`**.
   - Suba o conteúdo de `dist/` (incluindo `index.html`, pasta `assets/` e o arquivo `.htaccess`).

---

## 4. Estrutura dos Arquivos de Código

- `/src/lib/firebase.ts`: Conexão em tempo real com o banco de dados Cloud Firestore.
- `/src/context/SiteContentContext.tsx`: Gerenciador de estado em nuvem e sincronização em tempo real.
- `/src/data/siteContent.ts`: Dados padrão de fábrica do site.
- `/src/components/VisualEditorModal.tsx`: Painel de edição visual protegido pela senha `199722`.
- `/src/components/Navbar.tsx`: Menu superior com logotipo dinâmico e botões de contato.
- `/src/components/Footer.tsx`: Rodapé limpo com link direto para o editor.

---
© LED Machine Painéis. Todos os direitos reservados.
