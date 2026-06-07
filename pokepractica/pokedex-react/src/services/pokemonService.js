const URL_API = 'https://pokeapi.co/api/v2/pokemon';

// Función para obtener la lista general (Nombres y URLs)
export const obtenerListaPokemon = async (limite = 40, offset = 0) => {
  const respuesta = await fetch(`${URL_API}?limit=${limite}&offset=${offset}`);
  const datos = await respuesta.json();
  return datos;
};

// Función para obtener el "expediente completo" de un solo Pokémon
export const obtenerDetallesPokemon = async (nombre) => {
  const respuesta = await fetch(`${URL_API}/${nombre}`);
  const datos = await respuesta.json();
  return datos;
};