import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserSidebar } from '../components/user/UserSidebar';
import { UserNavbar } from '../components/user/UserNavbar';

export function UserLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <UserNavbar />
        <main className="p-6 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
