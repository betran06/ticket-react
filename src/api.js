const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export async function api(path, options = {}) {
  const token = localStorage.getItem('ticket_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const validation = body.errors ? Object.values(body.errors).flat()[0] : null;
    throw new Error(validation || body.message || 'Terjadi kesalahan. Silakan coba lagi.');
  }
  return body;
}
