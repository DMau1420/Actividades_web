import './DetallePanel.css';

export default function DetallePanel({ pokemonDetalles }) {
  if (!pokemonDetalles) return null;

  return (
    <div className="panel-datos">
      
      <div className="dato-fila">
        <span className="etiqueta">Tipo</span>
        <div className="tipos-contenedor">
          {pokemonDetalles.types.map((tipo) => (
            <span key={tipo.type.name} className="badge-tipo">
              {tipo.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="dato-fila">
        <span className="etiqueta">Altura</span>
        <span className="valor">{pokemonDetalles.height / 10} m</span>
      </div>

      <div className="dato-fila">
        <span className="etiqueta">Peso</span>
        <span className="valor">{pokemonDetalles.weight / 10} kg</span>
      </div>

    </div>
  );
}