const URL = 'https://api.escuelajs.co/api/v1/users';

export const getUsers = () => fetch(URL).then(r => r.json());
export const createUser = (u) => fetch(URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(u) }).then(r => r.json());
export const updateUser = (id, u) => fetch(`${URL}/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(u) }).then(r => r.json());
export const deleteUser = (id) => fetch(`${URL}/${id}`, { method: 'DELETE' });