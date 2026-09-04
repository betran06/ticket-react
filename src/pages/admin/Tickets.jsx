import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTickets } from '../../hooks/useTickets';
import { Search, Filter, AlertCircle, TicketIcon, ChevronRight } from 'lucide-react';

export function AdminTickets() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { tickets, isLoading, error } = useTickets({
    search: searchQuery,
    status: statusFilter,
    priority: priorityFilter
  });

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
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Tiket</h1>
        <p className="text-gray-500 text-sm">Kelola seluruh tiket masuk dari pengguna.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari kode atau judul tiket..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="open">Open</option>
              <option value="onprogress">On Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full md:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Semua Prioritas</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Content State */}
      {error && (
        <div className="bg-red-50 text-red-500 p-6 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <div>
            <h3 className="font-semibold text-lg">Gagal memuat data</h3>
            <p className="text-sm">Terjadi kesalahan saat mengambil daftar tiket.</p>
          </div>
        </div>
      )}

      {!error && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Kode Tiket</th>
                  <th className="px-6 py-4">Judul & Pengaju</th>
                  <th className="px-6 py-4">Prioritas</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tanggal Dibuat</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse bg-white">
                      <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-gray-100 rounded"></div>
                      </td>
                      <td className="px-6 py-4"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                      <td className="px-6 py-4 text-right"><div className="h-8 w-8 bg-gray-200 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : tickets?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <TicketIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p>Tidak ada tiket yang ditemukan.</p>
                      <p className="text-sm mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{ticket.code}</td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 truncate max-w-[200px] md:max-w-xs">{ticket.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ticket.user?.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {formatDate(ticket.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          to={`/admin/tickets/${ticket.code}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Lihat Detail"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
