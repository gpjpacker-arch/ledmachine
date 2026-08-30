import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, Building2, User, Phone, MessageSquare, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react';
import { LedMachineLogo } from './LedMachineLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

const DEFAULT_MESSAGE = 'Olá, vi os produtos da Led Machine no site e gostaria de um orçamento.';

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  prefilledNotes = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState('Comercial');
  const [application, setApplication] = useState('Fachada / Vitrine');
  const [message, setMessage] = useState(prefilledNotes || DEFAULT_MESSAGE);
  const [submitted, setSubmitted] = useState(false);

  const [submittedUrl, setSubmittedUrl] = useState('');

  React.useEffect(() => {
    setMessage(prefilledNotes || DEFAULT_MESSAGE);
  }, [prefilledNotes, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the WhatsApp message
    const messageLines: string[] = [
      'Olá, vi os produtos da Led Machine no site e gostaria de um orçamento.',
      '',
      `*Nome:* ${name.trim()}`,
      `*WhatsApp / Telefone:* ${phone.trim()}`,
    ];

    if (email.trim()) {
      messageLines.push(`*E-mail:* ${email.trim()}`);
    }

    messageLines.push(`*Segmento:* ${segment}`);
    messageLines.push(`*Ambiente:* ${application}`);

    if (message.trim() && message.trim() !== DEFAULT_MESSAGE) {
      messageLines.push(`*Detalhes do Projeto:* ${message.trim()}`);
    }

    const fullMessage = messageLines.join('\n');
    const whatsappUrl = `https://wa.me/5519999107788?text=${encodeURIComponent(fullMessage)}`;
    setSubmittedUrl(whatsappUrl);
    setSubmitted(true);

    // Automatically open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setName('');
      setPhone('');
      setEmail('');
      setMessage(DEFAULT_MESSAGE);
      setSubmittedUrl('');
    }, 4000);
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="contact-modal-card"
        className="relative w-full max-w-lg rounded-3xl bg-[#09112d] border border-blue-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(37,99,235,0.4)] text-white overflow-hidden"
      >
        {/* Top Glow */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="contact-modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="mb-6">
          <LedMachineLogo size="sm" />
          <h3 className="text-2xl font-bold text-white mt-3 tracking-tight">
            Solicitar Projeto Personalizado
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Conte-nos sobre seu espaço ou necessidade. Desenvolvemos uma proposta sob medida com 2 anos de garantia.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold text-white">Solicitação Enviada!</h4>
            <p className="text-sm text-white/80 max-w-sm">
              Abrindo seu WhatsApp com os dados do projeto preenchidos automaticamente...
            </p>
            {submittedUrl && (
              <a
                href={submittedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Clique aqui se o WhatsApp não abriu</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </a>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                Seu Nome
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-blue-400"
                />
                <User className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                  WhatsApp / Telefone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-blue-400"
                  />
                  <Phone className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@dominio.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-blue-400"
                  />
                  <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                  Tipo de Projeto
                </label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0d173d] border border-white/15 text-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                >
                  <option value="Comercial">Comercial / Empresarial</option>
                  <option value="Residencial">Residencial de Alto Padrão</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                  Ambiente Pretendido
                </label>
                <select
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0d173d] border border-white/15 text-white text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
                >
                  {segment === 'Comercial' ? (
                    <>
                      <option value="Fachada / Vitrine">Fachada / Vitrine</option>
                      <option value="Loja / Shopping">Loja / Shopping</option>
                      <option value="Showroom / Corporativo">Showroom / Corporativo</option>
                      <option value="Restaurante / Hotel">Restaurante / Hotel</option>
                      <option value="Igreja / Auditório">Igreja / Auditório</option>
                    </>
                  ) : (
                    <>
                      <option value="Home Theater / Cinema">Home Theater / Cinema</option>
                      <option value="Área Gourmet / Convivência">Área Gourmet / Convivência</option>
                      <option value="Sala de Estar Principal">Sala de Estar Principal</option>
                      <option value="Área Externa / Piscina">Área Externa / Piscina</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                Conte-nos o que você deseja criar
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Gostaria de um painel integrado para transformar o ambiente com excelente resolução e sofisticação..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-blue-400"
                />
                <MessageSquare className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-blue-300">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Garantia de 2 anos e instalação profissional incluídas.</span>
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] border border-emerald-400/40 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Enviar e Abrir no WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
