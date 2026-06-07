import { useState, useEffect } from 'react';
import { obtenerListaPokemon, obtenerDetallesPokemon } from './services/pokemonService';
import TarjetaPokemon from './components/TarjetaPokemon';
import FotoPrincipal from './components/FotoPrincipal';
import DetallePanel from './components/DetallePanel';
import './App.css';

export default function App() {
  const [listaPokemons, setListaPokemons] = useState([]);
  const [detallesSeleccionado, setDetallesSeleccionado] = useState(null);

  useEffect(() => {
    // Al cargar la app, pedimos 40 Pokémon
    obtenerListaPokemon(40).then(datos => {
      setListaPokemons(datos.results);
      // Seleccionamos el primero automáticamente para que no esté vacío
      seleccionarPokemon(datos.results[0].name);
    });
  }, []);

  // Función que se ejecuta al dar clic en una tarjeta de la derecha
  const seleccionarPokemon = (nombre) => {
    obtenerDetallesPokemon(nombre).then(detalles => {
      setDetallesSeleccionado(detalles);
    });
  };

  return (
    <main className="contenedor-principal">
      
      <header className="cabecera">
        <h1>Pokédex React</h1>
      </header>

      <section className="paneles-divididos">
        
        {/* PANEL IZQUIERDO: Pasamos los detalles por Props */}
        <div className="panel-izquierdo">
          <FotoPrincipal pokemonDetalles={detallesSeleccionado} />
          <DetallePanel pokemonDetalles={detallesSeleccionado} />
        </div>

        {/* PANEL DERECHO: Lista escroleable */}
        <div className="panel-derecho">
          {listaPokemons.length > 0 ? (
            listaPokemons.map((poke) => (
              <TarjetaPokemon 
                key={poke.name} 
                nombrePokemon={poke.name} 
                alHacerClic={seleccionarPokemon} 
              />
            ))
          ) : (
            <h2>Cargando Pokédex...</h2>
          )}
        </div>

      </section>
    </main>
  );
}