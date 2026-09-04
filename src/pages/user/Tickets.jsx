import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTickets } from '../../hooks/useTickets';
import { formatDate, formatStatus, formatPriority } from '../../utils/format';
import { Search, Filter, TicketIcon, ChevronRight, Plus } from 'lucide-react';
import { SkeletonTable, ErrorState, EmptyState } from '../../components/ui';

export function UserTickets() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { tickets, isLoading, error, mutate } = useTickets({
    search: searchQuery,
    status: statusFilter,
    priority: priorityFilter
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Tickets</h1>
          <p className="text-gray-500 text-sm">Daftar semua tiket pengaduan yang Anda buat.</p>
        </div>
        <Link 
          to="/user/tickets/create" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Create Ticket
        </Link>
      </div>

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
              className="w-full md:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer"
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
            className="w-full md:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="">Semua Prioritas</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {error && <ErrorState onRetry={mutate} />}

      {!error && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Kode Tiket</th>
                  <th className="px-6 py-4">Judul</th>
                  <th className="px-6 py-4">Prioritas</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 hidden md:table-cell">Tanggal Dibuat</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <SkeletonTable rows={5} cols={6} />
                ) : tickets?.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <EmptyState
                        icon={TicketIcon}
                        title="Tidak ada tiket yang ditemukan."
                        message="Coba sesuaikan filter atau buat tiket baru."
                        action={
                          <Link 
                            to="/user/tickets/create" 
                            className="inline-flex items-center text-blue-600 font-medium hover:underline"
                          >
                            Buat tiket pertama Anda <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => {
                    const status = formatStatus(ticket.status);
                    const priority = formatPriority(ticket.priority);
                    return (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{ticket.code}</td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900 truncate max-w-[200px] md:max-w-xs">{ticket.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${priority.color}`}>
                            {priority.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                          {formatDate(ticket.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link 
                            to={`/user/tickets/${ticket.code}`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Lihat Detail"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
