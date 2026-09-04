import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserSidebarContent } from '../components/user/UserSidebar';
import { UserNavbar } from '../components/user/UserNavbar';
import { Sidebar } from '../components/ui/Sidebar';

export function UserLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar>
        <UserSidebarContent />
      </Sidebar>
      <div className="flex-1 flex flex-col min-w-0">
        <UserNavbar />
        <main className="p-4 sm:p-6 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
