import { useState, useEffect } from 'react';
import { obtenerDetallesPokemon } from '../services/pokemonService';
import './TarjetaPokemon.css';

export default function TarjetaPokemon({ nombrePokemon, alHacerClic }) {
  // Guardamos la foto pequeñita para la lista
  const [miniFoto, setMiniFoto] = useState('');

  useEffect(() => {
    // Vamos por la foto pequeñita al nacer el componente
    obtenerDetallesPokemon(nombrePokemon).then(detalles => {
      setMiniFoto(detalles.sprites.front_default);
    });
  }, [nombrePokemon]);

  return (
    <div className="tarjeta-pequena" onClick={() => alHacerClic(nombrePokemon)}>
      <div className="info-tarjeta">
        {miniFoto ? <img src={miniFoto} alt={nombrePokemon} className="mini-sprite" /> : <div className="placeholder"></div>}
        <h3 className="nombre-capitalizado">{nombrePokemon}</h3>
      </div>
      <span className="flecha">▶</span>
    </div>
  );
}