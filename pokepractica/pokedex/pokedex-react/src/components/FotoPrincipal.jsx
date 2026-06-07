import { useEffect, useRef } from 'react';
import './FotoPrincipal.css';

export default function FotoPrincipal({ pokemonDetalles }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [pokemonDetalles]);

  const reproducirGrito = () => {
    const urlAudio = pokemonDetalles?.cries?.latest;
    if (!urlAudio) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(urlAudio);
    audioRef.current.play();
  };

  if (!pokemonDetalles) {
    return (
      <div className="marco-principal vacio">
        <p>Selecciona un Pokémon de la lista lateral.</p>
      </div>
    );
  }

  return (
    <div className="marco-principal">
      <h2 className="nombre-grande">
        {pokemonDetalles.name} - N°.{pokemonDetalles.id}
      </h2>
      <img
        src={pokemonDetalles.sprites.front_default}
        alt={pokemonDetalles.name}
        className="foto-gigante"
        onClick={reproducirGrito}
      />
    </div>
  );
}