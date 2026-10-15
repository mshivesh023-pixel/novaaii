import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, tokenStore } from '../services/api.js';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(tokenStore.get()));

  // Restore the session from the backend, never from client-side guesses.
  useEffect(() => {
    if (!tokenStore.get()) return;
    api.me().then((d) => setUser(d.user)).catch(() => tokenStore.clear()).finally(() => setLoading(false));
  }, []);

  const authenticate = useCallback(async (fn, payload) => {
    const { token, user } = await fn(payload);
    tokenStore.set(token);
    setUser(user);
  }, []);

  const value = {
    user, loading,
    login: (p) => authenticate(api.login, p),
    register: (p) => authenticate(api.register, p),
    logout: () => { tokenStore.clear(); setUser(null); },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
