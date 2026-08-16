import React from 'react';
import { useForm } from 'react-hook-form';

export function TicketReply({ onSubmit, isAdmin = false, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: '',
      status: 'onprogress',
    },
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Kirim Balasan</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pesan Balasan
          </label>
          <textarea
            {...register('content', { required: 'Pesan balasan wajib diisi' })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Tulis balasan Anda..."
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-600">{errors.content.message}</p>
          )}
        </div>

        {isAdmin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubah Status Tiket
            </label>
            <select
              {...register('status', { required: 'Status wajib dipilih oleh admin' })}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
            >
              <option value="open">Open</option>
              <option value="onprogress">On Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-xs text-red-600">{errors.status.message}</p>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Balasan'}
          </button>
        </div>
      </form>
    </div>
  );
}
