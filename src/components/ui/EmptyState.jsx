import React from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({ icon: Icon = Inbox, title = 'Tidak ada data', message, action }) {
  return (
    <div className="px-6 py-12 text-center text-gray-500">
      <Icon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
      <p className="font-medium">{title}</p>
      {message && <p className="text-sm mt-1">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
