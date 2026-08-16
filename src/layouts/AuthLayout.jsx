import React from 'react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl font-bold text-2xl mb-3 shadow-lg shadow-blue-500/30">
            T
          </div>
          <h1 className="text-2xl font-bold text-white">Ticketing System</h1>
          <p className="text-sm text-slate-400 mt-1">Masuk atau daftar untuk mengakses layanan support</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
