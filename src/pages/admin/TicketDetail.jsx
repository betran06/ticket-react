import React from 'react';
import { useParams } from 'react-router-dom';

export function AdminTicketDetail() {
  const { code } = useParams();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Detail Tiket #{code}</h1>
      <p className="text-gray-600">Halaman detail percakapan dan pengelolaan tiket admin.</p>
    </div>
  );
}
