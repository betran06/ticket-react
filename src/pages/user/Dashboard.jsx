import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTickets } from '../../hooks/useTickets';
import { Ticket, Activity, CheckCircle, Plus, AlertCircle, ChevronRight } from 'lucide-react';

export function UserDashboard() {
  const { user } = useAuth();
  const { tickets, isLoading, error } = useTickets();

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-32"></div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-64"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-6 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-6 h-6" />
        <div>
          <h3 className="font-semibold text-lg">Gagal memuat data</h3>
          <p className="text-sm">Terjadi kesalahan saat mengambil data tiket Anda. Silakan coba lagi.</p>
        </div>
      </div>
    );
  }

  const myTicketsCount = tickets.length;
  const activeTicketsCount = tickets.filter(t => t.status === 'open' || t.status === 'onprogress').length;
  const resolvedTicketsCount = tickets.filter(t => t.status === 'resolved').length;
  const recentTickets = tickets.slice(0, 5); // Ambil 5 terbaru

  const statCards = [
    { title: 'My Tickets', value: myTicketsCount, icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Tickets', value: activeTicketsCount, icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Resolved Tickets', value: resolvedTicketsCount, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome, {user?.name} 👋</h1>
          <p className="text-gray-500 text-sm">Ringkasan tiket dan status pengajuan Anda.</p>
        </div>
        <Link 
          to="/user/tickets/create" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Ticket
        </Link>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
          <Link to="/user/tickets" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {recentTickets.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Ticket className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>Belum ada tiket yang dibuat.</p>
            <Link to="/user/tickets/create" className="text-blue-600 hover:underline mt-2 inline-block text-sm">
              Buat tiket pertama Anda
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentTickets.map(ticket => (
              <Link 
                key={ticket.id} 
                to={`/user/tickets/${ticket.code}`}
                className="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">{ticket.code} - {ticket.title}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="capitalize px-2 py-0.5 bg-gray-100 rounded-full">{ticket.status}</span>
                    <span className="capitalize">{ticket.priority} priority</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
