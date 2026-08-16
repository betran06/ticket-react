import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export function Register() {
  const { register: registerAuth, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [serverErrors, setServerErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  if (authLoading) {
    return <LoadingSpinner message="Memuat session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  const onSubmit = async (data) => {
    setErrorMessage('');
    setServerErrors({});
    setIsSubmitting(true);
    try {
      await registerAuth(data);
      navigate('/user/dashboard', { replace: true });
    } catch (err) {
      if (err.response?.status === 422) {
        setServerErrors(err.response.data.errors || {});
        setErrorMessage(err.response.data.message || 'Validasi formulir gagal.');
      } else if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Terjadi kesalahan pada server. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Pendaftaran Akun Baru</h2>
      <p className="text-sm text-gray-500 mb-6">
        Buat akun baru untuk mulai mengajukan dan memantau tiket support.
      </p>

      {errorMessage && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl leading-relaxed">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            {...register('name', {
              required: 'Nama lengkap wajib diisi',
              maxLength: { value: 255, message: 'Maksimal 255 karakter' },
            })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="John Doe"
          />
          {(errors.name || serverErrors.name) && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {errors.name?.message || serverErrors.name?.[0]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Format email tidak valid',
              },
            })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="nama@email.com"
          />
          {(errors.email || serverErrors.email) && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {errors.email?.message || serverErrors.email?.[0]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: { value: 6, message: 'Password minimal 6 karakter' },
            })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Minimal 6 karakter"
          />
          {(errors.password || serverErrors.password) && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {errors.password?.message || serverErrors.password?.[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 disabled:opacity-50 transition"
        >
          {isSubmitting ? 'Mendaftar...' : 'Daftar Akun'}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-500">
        Sudah memiliki akun?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
          Masuk Sekarang
        </Link>
      </div>
    </div>
  );
}
