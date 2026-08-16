import React from 'react';
import { TicketStatusBadge, TicketPriorityBadge } from './TicketStatusBadge';

export function TicketHeader({ ticket }) {
  if (!ticket) return null;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {ticket.code}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{ticket.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <TicketPriorityBadge priority={ticket.priority} />
          <TicketStatusBadge status={ticket.status} />
        </div>
      </div>
    </div>
  );
}
