import React from 'react';
import { formatDate } from '../../utils/format';

export function TicketInfo({ ticket }) {
  if (!ticket) return null;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Deskripsi Tiket</h2>
      <p className="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">
        {ticket.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
        <div>
          <span className="block text-xs font-medium text-gray-400">Dibuat Oleh</span>
          <span className="font-medium text-gray-800">{ticket.user?.name || '-'}</span>
          <span className="block text-xs text-gray-500">({ticket.user?.email})</span>
        </div>
        <div>
          <span className="block text-xs font-medium text-gray-400">Tanggal Dibuat</span>
          <span className="font-medium text-gray-800">{formatDate(ticket.created_at)}</span>
        </div>
        <div>
          <span className="block text-xs font-medium text-gray-400">Terakhir Diperbarui</span>
          <span className="font-medium text-gray-800">{formatDate(ticket.updated_at)}</span>
        </div>
      </div>
    </div>
  );
}
