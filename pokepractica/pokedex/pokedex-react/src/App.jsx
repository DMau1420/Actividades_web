import { useState, useEffect, useRef } from 'react';
import { obtenerListaPokemon, obtenerDetallesPokemon } from './services/pokemonService';
import TarjetaPokemon from './components/TarjetaPokemon';
import FotoPrincipal from './components/FotoPrincipal';
import DetallePanel from './components/DetallePanel';
import './App.css';

const LIMITE = 20;
const TOPE_MAXIMO = 101;

export default function App() {
  const [listaPokemons, setListaPokemons] = useState([]);
  const [detallesSeleccionado, setDetallesSeleccionado] = useState(null);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    cargarMas();
  }, []);

  const cargarMas = () => {
    if (offsetRef.current >= TOPE_MAXIMO || cargando) return;
    setCargando(true);
    obtenerListaPokemon(LIMITE, offsetRef.current).then(datos => {
      setListaPokemons(actual => {
        if (offsetRef.current === 0) seleccionarPokemon(datos.results[0].name);
        return [...actual, ...datos.results];
      });
      offsetRef.current += LIMITE;
      setCargando(false);
    });
  };

  const seleccionarPokemon = (nombre) => {
    obtenerDetallesPokemon(nombre).then(detalles => {
      setDetallesSeleccionado(detalles);
    });
  };

  const onScroll = (e) => {
    const el = e.target;
    const llegueAlFondo = el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
    if (llegueAlFondo) cargarMas();
  };

  const listaFiltrada = listaPokemons.filter(p =>
    p.name.toLowerCase().includes(textoBusqueda.toLowerCase().trim())
  );

  return (
    <main className="contenedor-principal">
      <header className="cabecera">
        <h1>Pokédex React</h1>
        <input
          className="buscador"
          type="text"
          placeholder="🔍 Buscar Pokémon..."
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
        />
      </header>

      <section className="paneles-divididos">
        <div className="panel-izquierdo">
          <FotoPrincipal pokemonDetalles={detallesSeleccionado} onSeleccionar={seleccionarPokemon} />
          <DetallePanel pokemonDetalles={detallesSeleccionado} />
        </div>

        <div className="panel-derecho" onScroll={onScroll}>
          {listaFiltrada.map((poke) => (
            <TarjetaPokemon
              key={poke.name}
              nombrePokemon={poke.name}
              alHacerClic={seleccionarPokemon}
            />
          ))}
          {cargando && <p className="cargando-texto">Cargando...</p>}
        </div>
      </section>
    </main>
  );
}