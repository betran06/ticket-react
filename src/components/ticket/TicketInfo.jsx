import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';

export function TicketInfo({ ticket }) {
  if (!ticket) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'onprogress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {ticket.code}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority} Priority
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
          </div>
          
          <div className="shrink-0">
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border capitalize ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{ticket.user?.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Dibuat: {formatDate(ticket.created_at)}</span>
          </div>
          {ticket.updated_at && ticket.updated_at !== ticket.created_at && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Diperbarui: {formatDate(ticket.updated_at)}</span>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Deskripsi Kendala</h3>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100">
            {ticket.description}
          </div>
        </div>
      </div>
    </div>
  );
}
