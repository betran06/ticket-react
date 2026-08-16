import React from 'react';
import { Link } from 'react-router-dom';
import { TicketStatusBadge, TicketPriorityBadge } from '../ticket/TicketStatusBadge';
import { formatDate } from '../../utils/format';

export function UserTicketCard({ ticket }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          {ticket.code}
        </span>
        <div className="flex items-center gap-1.5">
          <TicketPriorityBadge priority={ticket.priority} />
          <TicketStatusBadge status={ticket.status} />
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{ticket.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
        {ticket.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
        <span>{formatDate(ticket.created_at)}</span>
        <Link
          to={`/user/tickets/${ticket.code}`}
          className="text-blue-600 hover:text-blue-700 font-semibold transition"
        >
          Lihat Detail &rarr;
        </Link>
      </div>
    </div>
  );
}
