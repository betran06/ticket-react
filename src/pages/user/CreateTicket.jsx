import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createTicketApi } from '../../api/ticket';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { useToast } from '../../components/ui';

export function CreateTicket() {
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium'
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await createTicketApi(data);
      toast.success('Tiket berhasil dibuat.');
      navigate('/user/tickets');
    } catch (err) {
      const msg = err.response?.data?.message || 'Terjadi kesalahan saat membuat tiket.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          to="/user/tickets"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 cursor-pointer"
          title="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Buat Tiket Baru</h1>
          <p className="text-gray-500 text-sm">Silakan isi formulir di bawah untuk melaporkan kendala atau pertanyaan.</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Tiket <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Judul tiket wajib diisi', maxLength: { value: 255, message: 'Maksimal 255 karakter' } })}
              placeholder="Contoh: Kendala Printer di Lantai 2"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors ${
                errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Prioritas <span className="text-red-500">*</span>
            </label>
            <select
              id="priority"
              {...register('priority', { required: 'Prioritas wajib dipilih' })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors cursor-pointer ${
                errors.priority ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
            >
              <option value="low">Low - Kendala ringan, tidak mengganggu operasional utama</option>
              <option value="medium">Medium - Kendala mengganggu namun ada alternatif</option>
              <option value="high">High - Kendala kritis, operasional terhenti</option>
            </select>
            {errors.priority && <p className="mt-1 text-sm text-red-500">{errors.priority.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Detail <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={6}
              {...register('description', { required: 'Deskripsi wajib diisi' })}
              placeholder="Jelaskan secara detail kendala yang Anda alami..."
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-y ${
                errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link 
              to="/user/tickets"
              className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Kirim Tiket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
