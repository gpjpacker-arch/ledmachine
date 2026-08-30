# 🚀 Como Publicar seu Site na Hostinger (Passo a Passo)

Você tem **duas formas** de colocar o site no ar na Hostinger:

---

## ⚡ Opção 1: Deploy Automático via GitHub (Recomendado)
Sempre que você fizer um `git push` no GitHub, o site compila e atualiza sozinho na Hostinger em segundos.

### Como configurar:
1. No seu painel da Hostinger (hPanel), vá em **Arquivos > Contas FTP** e anote:
   - **Host / Servidor FTP** (ex: `ftp.seudominio.com.br` ou o IP do servidor)
   - **Usuário FTP**
   - **Senha FTP**
2. No seu repositório no **GitHub**, vá em **Settings > Secrets and variables > Actions > New repository secret** e cadastre 3 segredos:
   - `HOSTINGER_FTP_SERVER` -> seu Host/IP do FTP
   - `HOSTINGER_FTP_USERNAME` -> seu usuário FTP
   - `HOSTINGER_FTP_PASSWORD` -> sua senha FTP
3. Pronto! O arquivo `.github/workflows/deploy-hostinger.yml` já está criado no seu projeto. A cada commit na branch `main`, o GitHub compilará o React/Vite e publicará os arquivos na pasta `public_html` da Hostinger automaticamente.

---

## 📦 Opção 2: Deploy Direto via hPanel (Manual / Rápido em 2 Minutos)

Se você preferir subir direto pelo painel da Hostinger sem GitHub:

1. No terminal do seu projeto, rode:
   ```bash
   npm run build
   ```
2. Uma pasta chamada **`dist`** será gerada com todos os arquivos prontos (HTML, JS, CSS, imagens e o `.htaccess`).
3. Acesse o **hPanel da Hostinger** > selecione seu domínio > vá em **Gerenciador de Arquivos**.
4. Abra a pasta **`public_html`**.
5. Selecione todo o conteúdo de dentro da pasta `dist` e faça o upload para a pasta `public_html`.
6. Seu site já estará 100% online com carregamento ultrarrápido e certificado SSL ativo.
