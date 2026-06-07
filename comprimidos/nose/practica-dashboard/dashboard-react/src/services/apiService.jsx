export const getProductos = () => {
  return fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=5')
    .then(r => r.json());
};
