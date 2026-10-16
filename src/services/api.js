// Single place for all backend calls. Expected endpoints (build these in Node.js):
//   POST /auth/register {name,email,password} -> { token, user }
//   POST /auth/login    {email,password}      -> { token, user }
//   GET  /auth/me                             -> { user }
//   POST /content/generate {type,tone,topic}  -> { id, content, createdAt }
//   GET  /content/history                     -> { items: [...] }
const BASE = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'novaai_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};


async function request(path, { method = 'GET', body } = {}) {
  let res;

  try {
    res = await fetch(`${BASE}/api${path}`, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Cannot reach the server. Check that the backend is running.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  register: (b) => request('/auth/register', { method: 'POST', body: b }),
  login: (b) => request('/auth/login', { method: 'POST', body: b }),
  me: () => request('/auth/me'),
  generate: (b) => request('/content/generate', { method: 'POST', body: b }),
  history: () => request('/content/history'),
};
