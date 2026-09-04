import React from 'react';
import { User, Shield } from 'lucide-react';

export function TicketConversation({ replies }) {
  if (!replies || replies.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-500">
        <p>Belum ada balasan untuk tiket ini.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Riwayat Percakapan</h2>
      </div>
      <div className="p-6 md:p-8 space-y-8">
        <div className="relative border-l-2 border-gray-100 ml-4 md:ml-6 pl-6 md:pl-8 space-y-8">
          {replies.map((reply) => {
            const isAdmin = reply.user?.role === 'admin';
            
            return (
              <div key={reply.id} className="relative">
                {/* Avatar Bullet */}
                <div className={`absolute -left-[37px] md:-left-[45px] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-4 border-white ${isAdmin ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  {isAdmin ? <Shield className="w-4 h-4 md:w-5 md:h-5" /> : <User className="w-4 h-4 md:w-5 md:h-5" />}
                </div>

                {/* Content */}
                <div className="bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{reply.user?.name}</span>
                      {isAdmin && (
                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded font-medium">Admin</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(reply.created_at)}</span>
                  </div>
                  <div className={`p-4 rounded-xl text-gray-700 whitespace-pre-wrap ${isAdmin ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
                    {reply.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
