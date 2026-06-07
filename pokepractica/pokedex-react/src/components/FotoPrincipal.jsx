import './FotoPrincipal.css';

export default function FotoPrincipal({ pokemonDetalles }) {
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
      />
    </div>
  );
}