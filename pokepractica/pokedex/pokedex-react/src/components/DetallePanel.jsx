import { useState, useEffect } from 'react';
import { obtenerEspeciePokemon } from '../services/pokemonService';
import './DetallePanel.css';

export default function DetallePanel({ pokemonDetalles }) {
  const [historiaEspanol, setHistoriaEspanol] = useState('');

  useEffect(() => {
    if (!pokemonDetalles) return;
    obtenerEspeciePokemon(pokemonDetalles.id).then(especie => {
      const entrada = especie.flavor_text_entries.find(e => e.language.name === 'es');
      setHistoriaEspanol(entrada ? entrada.flavor_text.replace(/\f/g, ' ') : 'Historia no disponible en español.');
    });
  }, [pokemonDetalles]);

  const obtenerColorBarra = (valor) => {
    if (valor >= 80) return '#4caf50';
    if (valor >= 50) return '#ffcb05';
    return '#dc0a2d';
  };

  if (!pokemonDetalles) return null;

  return (
    <div className="panel-datos">
      <div className="dato-fila">
        <span className="etiqueta">Tipo</span>
        <div className="tipos-contenedor">
          {pokemonDetalles.types.map((tipo) => (
            <span key={tipo.type.name} className="badge-tipo">{tipo.type.name}</span>
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

      {pokemonDetalles.stats.map((stat) => (
        <div key={stat.stat.name} className="dato-fila stat-fila">
          <span className="etiqueta etiqueta-stat">{stat.stat.name}</span>
          <div className="barra-contenedor">
            <div
              className="barra-relleno"
              style={{ width: `${stat.base_stat}%`, backgroundColor: obtenerColorBarra(stat.base_stat) }}>
            </div>
            <span className="stat-numero">{stat.base_stat}</span>
          </div>
        </div>
      ))}

      <div className="dato-fila historia-fila">
        <span className="etiqueta">Historia</span>
        <p className="historia-texto">{historiaEspanol}</p>
      </div>
    </div>
  );
}