import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Ticket, PlusCircle, User } from 'lucide-react';

export function UserSidebar() {
  const navItems = [
    { label: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { label: 'My Tickets', path: '/user/tickets', icon: Ticket },
    { label: 'Create Ticket', path: '/user/tickets/create', icon: PlusCircle },
    { label: 'Profile', path: '/user/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="px-3 py-4 mb-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white tracking-wide">User Portal</h1>
          <p className="text-xs text-gray-400">Helpdesk & Support</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-gray-800/60 rounded-xl border border-gray-700/50 text-xs">
        <span className="text-gray-400 block">Role</span>
        <span className="font-semibold text-emerald-400">End User</span>
      </div>
    </aside>
  );
}
