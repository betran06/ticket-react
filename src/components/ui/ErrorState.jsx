import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorState({ title = 'Gagal memuat data', message = 'Terjadi kesalahan. Silakan coba lagi.', onRetry }) {
  return (
    <div className="bg-red-50 text-red-500 p-6 rounded-xl flex items-start gap-3">
      <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
