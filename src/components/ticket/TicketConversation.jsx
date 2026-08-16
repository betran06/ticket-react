import React from 'react';
import { formatDate } from '../../utils/format';

export function TicketConversation({ replies = [] }) {
  if (!replies || replies.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 text-center text-gray-500">
        Belum ada balasan pada tiket ini.
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Riwayat Percakapan</h3>
      {replies.map((reply) => {
        const isAdmin = reply.user?.role === 'admin';
        return (
          <div
            key={reply.id}
            className={`p-4 rounded-xl shadow-sm border ${
              isAdmin
                ? 'bg-blue-50/50 border-blue-100 ml-4 border-l-4 border-l-blue-600'
                : 'bg-white border-gray-100 mr-4 border-l-4 border-l-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">
                  {reply.user?.name || 'Pengguna'}
                </span>
                {isAdmin && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-blue-600 text-white rounded">
                    Admin
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">{formatDate(reply.created_at)}</span>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {reply.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
