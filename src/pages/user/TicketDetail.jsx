import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTicketDetail } from '../../hooks/useTickets';
import { TicketInfo } from '../../components/ticket/TicketInfo';
import { TicketConversation } from '../../components/ticket/TicketConversation';
import { TicketReply } from '../../components/ticket/TicketReply';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export function UserTicketDetail() {
  const { code } = useParams();
  const { ticket, isLoading, error, mutate } = useTicketDetail(code);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 bg-white rounded-xl border border-gray-100 p-6"></div>
        <div className="h-48 bg-white rounded-xl border border-gray-100 p-6"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-red-50 text-red-500 p-6 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-6 h-6" />
        <div>
          <h3 className="font-semibold text-lg">Tiket tidak ditemukan</h3>
          <p className="text-sm">Terjadi kesalahan atau tiket dengan kode tersebut tidak dapat diakses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/user/tickets"
          className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Tiket
        </Link>
      </div>

      <TicketInfo ticket={ticket} />
      <TicketConversation replies={ticket?.ticket_replies} />
      {ticket && (
        <TicketReply 
          ticketCode={ticket.code} 
          currentStatus={ticket.status} 
          role="user" 
          onReplySuccess={mutate} 
        />
      )}
    </div>
  );
}
