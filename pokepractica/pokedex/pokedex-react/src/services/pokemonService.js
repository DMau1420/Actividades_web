const URL_API = 'https://pokeapi.co/api/v2/pokemon';
const URL_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species';

export const obtenerListaPokemon = async (limite = 12, offset = 0) => {
  const respuesta = await fetch(`${URL_API}?limit=${limite}&offset=${offset}`);
  const datos = await respuesta.json();
  return datos;
};

export const obtenerDetallesPokemon = async (nombre) => {
  const respuesta = await fetch(`${URL_API}/${nombre}`);
  const datos = await respuesta.json();
  return datos;
};

export const obtenerEspeciePokemon = async (id) => {
  const respuesta = await fetch(`${URL_SPECIES}/${id}`);
  const datos = await respuesta.json();
  return datos;
};