import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageCircle,
  Mail,
  Calendar,
  Download,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Sliders,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface LeadItem {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  segment?: string;
  application?: string;
  message?: string;
  createdAt?: any;
  dateFormatted?: string;
  source?: string;
  status?: 'novo' | 'em_atendimento' | 'concluido';
}

export const LeadsManagerTab: React.FC = () => {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [segmentFilter, setSegmentFilter] = useState<string>('todos');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const combinedLeads: LeadItem[] = [];

    // 1. Carregar do LocalStorage (backup imediato)
    try {
      const local = JSON.parse(localStorage.getItem('ledmachine_leads_backup') || '[]');
      if (Array.isArray(local)) {
        local.forEach((item, idx) => {
          combinedLeads.push({
            id: `local_${idx}_${item.phone}_${item.createdAt || ''}`,
            ...item,
          });
        });
      }
    } catch {
      // ignore
    }

    // 2. Carregar do Firestore
    if (db) {
      try {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(150));
        const snapshot = await getDocs(q);
        snapshot.forEach((d) => {
          const data = d.data() as LeadItem;
          // Evitar duplicidade se já veio do local
          const isDuplicate = combinedLeads.some(
            (c) => c.phone === data.phone && (c.dateFormatted === data.dateFormatted || c.createdAt === data.createdAt)
          );
          if (!isDuplicate) {
            combinedLeads.unshift({
              id: d.id,
              ...data,
            });
          }
        });
      } catch (err) {
        console.warn('Não foi possível ler do Firestore (usando backup local):', err);
      }
    }

    // Ordenar do mais recente para o mais antigo
    combinedLeads.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    setLeads(combinedLeads);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleExportCsv = () => {
    if (leads.length === 0) {
      alert('Nenhum lead para exportar.');
      return;
    }

    const headers = ['Data', 'Nome', 'WhatsApp/Telefone', 'Email', 'Segmento', 'Ambiente', 'Origem', 'Status', 'Detalhes'];
    const rows = leads.map((l) => [
      `"${l.dateFormatted || l.createdAt || ''}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.segment || ''}"`,
      `"${l.application || ''}"`,
      `"${l.source || ''}"`,
      `"${l.status || 'novo'}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_ledmachine_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteLead = async (lead: LeadItem) => {
    if (!confirm(`Deseja remover o lead de "${lead.name}"?`)) return;

    // Remover do local
    try {
      const local = JSON.parse(localStorage.getItem('ledmachine_leads_backup') || '[]');
      const filtered = local.filter((l: LeadItem) => l.phone !== lead.phone || l.createdAt !== lead.createdAt);
      localStorage.setItem('ledmachine_leads_backup', JSON.stringify(filtered));
    } catch {
      // ignore
    }

    // Remover do Firestore se tiver id do firestore
    if (db && lead.id && !lead.id.startsWith('local_')) {
      try {
        await deleteDoc(doc(db, 'leads', lead.id));
      } catch (err) {
        console.warn('Erro ao deletar lead no Firestore:', err);
      }
    }

    setLeads((prev) => prev.filter((l) => l.id !== lead.id));
  };

  const handleCreateTestLead = () => {
    const testLead: LeadItem = {
      name: 'Cliente Exemplo (Teste)',
      phone: '(19) 98765-4321',
      email: 'exemplo@cliente.com.br',
      segment: 'Residencial',
      application: 'Home Cinema Exclusivo',
      message: 'Painel de LED Indoor 3.5m x 2.0m (7.0 m²) | P1.53mm | 28 gabinetes | Estimativa de projeto sob medida.',
      createdAt: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString('pt-BR'),
      source: 'Simulador com medidas',
      status: 'novo',
    };

    try {
      const local = JSON.parse(localStorage.getItem('ledmachine_leads_backup') || '[]');
      localStorage.setItem('ledmachine_leads_backup', JSON.stringify([testLead, ...local]));
    } catch {
      // ignore
    }

    fetchLeads();
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone || '').includes(searchTerm) ||
      (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.message || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSegment =
      segmentFilter === 'todos' ||
      (segmentFilter === 'comercial' && (l.segment || '').toLowerCase().includes('comercial')) ||
      (segmentFilter === 'residencial' && (l.segment || '').toLowerCase().includes('residencial'));

    return matchesSearch && matchesSegment;
  });

  const totalComercial = leads.filter((l) => (l.segment || '').toLowerCase().includes('comercial')).length;
  const totalResidencial = leads.filter((l) => (l.segment || '').toLowerCase().includes('residencial')).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Leads Recebidos & Contatos</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {leads.length} {leads.length === 1 ? 'contato' : 'contatos'}
            </span>
          </div>
          <p className="text-xs text-white/60 mt-1">
            Aqui ficam registrados todos os contatos que preencheram o formulário no site ou solicitaram projeto pelo simulador.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            title="Atualizar lista"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            <span>Atualizar</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 text-xs font-semibold flex items-center gap-1.5 border border-blue-500/40 transition-colors cursor-pointer"
            title="Exportar para Excel / Planilha"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-white/50 block">Total de solicitações</span>
            <span className="text-2xl font-bold text-white mt-0.5 block">{leads.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-white/50 block">Projetos Comerciais</span>
            <span className="text-2xl font-bold text-white mt-0.5 block">{totalComercial}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-white/50 block">Projetos Residenciais</span>
            <span className="text-2xl font-bold text-white mt-0.5 block">{totalResidencial}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Explanatory Banner */}
      <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3">
        <MessageCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-100/90 leading-relaxed">
          <strong className="text-white block mb-0.5">Como chegam os contatos:</strong>
          Quando o cliente preenche o formulário, ele é direcionado **imediatamente para o seu WhatsApp** com a mensagem pronta.
          Além disso, todos os dados ficam salvos aqui como garantia e histórico para sua equipe comercial não perder nenhuma oportunidade.
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, telefone, email ou projeto..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400 cursor-pointer"
          >
            <option value="todos" className="bg-[#10121a]">Todos os segmentos</option>
            <option value="comercial" className="bg-[#10121a]">Comercial</option>
            <option value="residencial" className="bg-[#10121a]">Residencial</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="py-12 text-center text-white/60 text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
          <span>Carregando contatos...</span>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-12 px-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-white/40">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Nenhum lead encontrado</h4>
          <p className="text-xs text-white/50 max-w-md mx-auto mb-4">
            Assim que os visitantes clicarem em "Solicitar Orçamento" ou usarem o simulador no site, eles aparecerão nesta lista.
          </p>
          <button
            onClick={handleCreateTestLead}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Criar contato de teste para visualizar
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead, idx) => {
            const cleanPhone = (lead.phone || '').replace(/\D/g, '');
            const whatsappLink = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
              `Olá ${lead.name}, tudo bem? Sou da LED Machine e recebi sua solicitação de projeto através do nosso site!`
            )}`;

            return (
              <div
                key={lead.id || idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{lead.name || 'Sem nome'}</span>
                    {lead.segment && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.segment.toLowerCase().includes('comercial')
                          ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {lead.segment}
                      </span>
                    )}
                    {lead.application && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 text-white/70 border border-white/10">
                        {lead.application}
                      </span>
                    )}
                    {lead.source && (
                      <span className="text-[10px] text-white/40">
                        • {lead.source}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-white/50">
                    <Clock className="w-3 h-3 text-white/40" />
                    <span>{lead.dateFormatted || (lead.createdAt ? new Date(lead.createdAt).toLocaleString('pt-BR') : 'Data recente')}</span>
                  </div>
                </div>

                {/* Contact Details & Project Message */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                  <div className="sm:col-span-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-white/80">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-mono font-medium">{lead.phone}</span>
                      <button
                        onClick={() => handleCopyPhone(lead.phone)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/60 hover:text-white"
                        title="Copiar telefone"
                      >
                        {copiedPhone === lead.phone ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>

                    {lead.email && (
                      <div className="flex items-center gap-2 text-white/70">
                        <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <a href={`mailto:${lead.email}`} className="hover:underline hover:text-white truncate">
                          {lead.email}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-7 p-2.5 rounded-xl bg-black/30 border border-white/5 text-white/75 text-xs whitespace-pre-line leading-relaxed">
                    {lead.message || 'Solicitação sem detalhes adicionais.'}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Abrir conversa no WhatsApp</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}?subject=Orçamento Painel LED Machine`}
                        className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Email</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteLead(lead)}
                    className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Remover este lead"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
