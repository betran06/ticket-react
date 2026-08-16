import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Ticket, User } from 'lucide-react';

export function AdminSidebar() {
  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Tickets', path: '/admin/tickets', icon: Ticket },
    { label: 'Profile', path: '/admin/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="px-3 py-4 mb-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wide">Admin Portal</h1>
          <p className="text-xs text-slate-400">Ticketing Support System</p>
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
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
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

      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 text-xs">
        <span className="text-slate-400 block">Role</span>
        <span className="font-semibold text-blue-400">Administrator</span>
      </div>
    </aside>
  );
}
