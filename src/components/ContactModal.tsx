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
        className="relative w-full max-w-lg rounded-2xl bg-[#10121a] border border-white/10 p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
      >
        {/* Close Button */}
        <button
          id="contact-modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <LedMachineLogo size="sm" />
          <h3 className="text-2xl font-bold text-white mt-3 tracking-tight">
            Solicitar Projeto Personalizado
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Conte-nos sobre seu espaço ou necessidade. Desenvolvemos uma proposta sob medida com 2 anos de garantia.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold text-white">Solicitação Enviada</h4>
            <p className="text-sm text-zinc-400 max-w-sm">
              Abrindo seu WhatsApp com os dados técnicos do projeto preenchidos automaticamente...
            </p>
            {submittedUrl && (
              <a
                href={submittedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Seu Nome
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/30"
                />
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  WhatsApp / Telefone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/30"
                  />
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@dominio.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/30"
                  />
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Tipo de Projeto
                </label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#141724] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 cursor-pointer"
                >
                  <option value="Comercial">Comercial / Empresarial</option>
                  <option value="Residencial">Residencial de Alto Padrão</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Ambiente Pretendido
                </label>
                <select
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#141724] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 cursor-pointer"
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Conte-nos o que você deseja criar
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Gostaria de um painel integrado para transformar o ambiente com excelente resolução e sofisticação..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/30"
                />
                <MessageSquare className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0" />
              <span>Garantia de 2 anos integral e instalação profissional incluídas.</span>
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-full bg-white hover:bg-zinc-100 text-[#090a0f] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#090a0f]" />
              <span>Enviar e Abrir no WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
