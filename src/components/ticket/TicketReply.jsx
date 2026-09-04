import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { replyTicketApi } from '../../api/ticket';
import { Send, AlertCircle } from 'lucide-react';
import { useToast } from '../ui';

export function TicketReply({ ticketCode, currentStatus, role, onReplySuccess }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      content: '',
      status: currentStatus || 'open'
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const payload = role === 'admin' ? data : { content: data.content };
      await replyTicketApi(ticketCode, payload);
      reset();
      toast.success('Balasan berhasil dikirim.');
      if (onReplySuccess) {
        onReplySuccess();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Terjadi kesalahan saat mengirim balasan.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-6 overflow-hidden">
      <div className="p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tambahkan Balasan</h3>
        
        {errorMsg && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {role === 'admin' && (
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Ubah Status Tiket
              </label>
              <select
                id="status"
                {...register('status')}
                className="w-full md:w-1/3 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              >
                <option value="open">Open</option>
                <option value="onprogress">On Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Pesan Balasan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              rows={4}
              {...register('content', { required: 'Pesan balasan tidak boleh kosong' })}
              placeholder="Tulis pesan Anda di sini..."
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-y ${
                errors.content ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
            />
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
          </div>

          <div className="flex justify-end pt-2">
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
                  Kirim Balasan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
