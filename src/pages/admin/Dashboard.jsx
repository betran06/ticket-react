import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { Ticket, Activity, CheckCircle, Clock } from 'lucide-react';
import { SkeletonStatCard, ErrorState } from '../../components/ui';

export function AdminDashboard() {
  const { dashboardData, isLoading, isError, mutate } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-64 animate-pulse"></div>
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={mutate} />;
  }

  const { 
    total_tickets, 
    active_tickets, 
    resolved_tickets, 
    avg_resolution_time, 
    status_distribution 
  } = dashboardData || {};

  const statCards = [
    { title: 'Total Tickets', value: total_tickets || 0, icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Tickets', value: active_tickets || 0, icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Resolved Tickets', value: resolved_tickets || 0, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Avg. Resolution (Days)', value: avg_resolution_time || 0, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Statistik dan ringkasan tiket sistem (Bulan Ini).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow duration-200">
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

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Distribusi Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-1">Open</p>
            <p className="text-2xl font-bold text-gray-900">{status_distribution?.open || 0}</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-blue-600 text-sm font-medium mb-1">On Progress</p>
            <p className="text-2xl font-bold text-blue-900">{status_distribution?.onprogress || 0}</p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
            <p className="text-green-600 text-sm font-medium mb-1">Resolved</p>
            <p className="text-2xl font-bold text-green-900">{status_distribution?.resolved || 0}</p>
          </div>
          <div className="p-4 rounded-lg bg-red-50 border border-red-100">
            <p className="text-red-600 text-sm font-medium mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-900">{status_distribution?.rejected || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
