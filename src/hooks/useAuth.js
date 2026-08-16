import useSWR from 'swr';
import { getMeApi, loginApi, logoutApi, registerApi } from '../api/auth';
import { getToken, setToken, setUser, clearAuth, getUser } from '../utils/auth';

const fetcher = async () => {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await getMeApi();
    setUser(res.data);
    return res.data;
  } catch (err) {
    clearAuth();
    return null;
  }
};

export function useAuth() {
  const { data: user, error, mutate, isLoading } = useSWR('/api/me', fetcher, {
    fallbackData: getUser(),
    revalidateOnFocus: false,
  });

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    const { token, user: userData } = res.data;
    setToken(token);
    setUser(userData);
    await mutate(userData, false);
    return res;
  };

  const register = async (userDataInput) => {
    const res = await registerApi(userDataInput);
    const { token, user: userData } = res.data;
    setToken(token);
    setUser(userData);
    await mutate(userData, false);
    return res;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // proceed clearing auth state
    } finally {
      clearAuth();
      await mutate(null, false);
    }
  };

  return {
    user: user || null,
    isAuthenticated: !!user && !!getToken(),
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    isLoading,
    error,
    login,
    register,
    logout,
    mutate,
  };
}
