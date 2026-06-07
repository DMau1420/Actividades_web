const API_URL = 'https://api.escuelajs.co/api/v1/auth';

export const loginAPI = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) throw new Error('Credenciales incorrectas');
  
  const data = await response.json();
  // Guardamos el token en el navegador
  localStorage.setItem('token', data.access_token); 
  return data;
};

export const getProfileAPI = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) throw new Error('Token inválido');
  return await response.json();
};

export const logoutAPI = () => {
  localStorage.removeItem('token');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};