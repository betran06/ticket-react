import React from 'react';
import { Link } from 'react-router-dom';
import { TicketStatusBadge, TicketPriorityBadge } from '../ticket/TicketStatusBadge';
import { formatDate } from '../../utils/format';

export function AdminTicketTable({ tickets = [] }) {
  if (tickets.length === 0) {
    return (
      <div className="bg-white p-8 text-center rounded-xl border border-gray-100 text-gray-500">
        Tidak ada tiket yang ditemukan.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <th className="py-3.5 px-4 font-semibold">Kode</th>
              <th className="py-3.5 px-4 font-semibold">Judul Tiket</th>
              <th className="py-3.5 px-4 font-semibold">Pelapor</th>
              <th className="py-3.5 px-4 font-semibold">Prioritas</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold">Tanggal</th>
              <th className="py-3.5 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50/80 transition">
                <td className="py-3.5 px-4 font-mono font-medium text-blue-600 text-xs">
                  {ticket.code}
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-900">
                  {ticket.title}
                </td>
                <td className="py-3.5 px-4 text-xs">
                  <span className="font-medium text-gray-800 block">{ticket.user?.name || '-'}</span>
                  <span className="text-gray-400">{ticket.user?.email}</span>
                </td>
                <td className="py-3.5 px-4">
                  <TicketPriorityBadge priority={ticket.priority} />
                </td>
                <td className="py-3.5 px-4">
                  <TicketStatusBadge status={ticket.status} />
                </td>
                <td className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(ticket.created_at)}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    to={`/admin/tickets/${ticket.code}`}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
