import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTicketDetail } from '../../hooks/useTickets';
import { TicketInfo } from '../../components/ticket/TicketInfo';
import { TicketConversation } from '../../components/ticket/TicketConversation';
import { TicketReply } from '../../components/ticket/TicketReply';
import { ArrowLeft } from 'lucide-react';
import { SkeletonDetail, ErrorState } from '../../components/ui';

export function UserTicketDetail() {
  const { code } = useParams();
  const { ticket, isLoading, error, mutate } = useTicketDetail(code);

  if (isLoading) {
    return <div className="max-w-4xl mx-auto"><SkeletonDetail /></div>;
  }

  if (error) {
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
        <ErrorState title="Tiket tidak ditemukan" message="Terjadi kesalahan atau tiket dengan kode tersebut tidak dapat diakses." />
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
