import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebarContent } from '../components/admin/AdminSidebar';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { Sidebar } from '../components/ui/Sidebar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar>
        <AdminSidebarContent />
      </Sidebar>
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />
        <main className="p-4 sm:p-6 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
