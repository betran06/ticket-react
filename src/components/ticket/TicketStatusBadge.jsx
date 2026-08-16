import React from 'react';
import { formatStatus, formatPriority } from '../../utils/format';

export function TicketStatusBadge({ status }) {
  const { label, color } = formatStatus(status);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color}`}
    >
      {label}
    </span>
  );
}

export function TicketPriorityBadge({ priority }) {
  const { label, color } = formatPriority(priority);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}
    >
      {label}
    </span>
  );
}
