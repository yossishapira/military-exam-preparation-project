const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function request(path, options = {}) {
  const url = `${BASE}${path}`;
  
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? res.statusText);
  return data;
}

export async function login(agentCode, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ agentCode, password }),
  });
}

export async function getMe(token) {
  return request('/auth/me', {
    method: 'GET',
    token: token 
  });
}

export async function register(userData, token) {
  return request('/admin/register', { 
    method: 'POST',
    body: JSON.stringify(userData),
    token: token 
  });
}

