import { RouterOutlet } from '@angular/router';
import { Component, inject, OnInit, signal,computed } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { TarjetaPokemonComponent } from './components/tarjeta-pokemon/tarjeta-pokemon.component';
import { FotoPrincipalComponent } from './components/foto-principal/foto-principal.component';
import { DetallePanelComponent } from './components/detalle-panel/detalle-panel.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaPokemonComponent, FotoPrincipalComponent, DetallePanelComponent,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private pokemonService = inject(PokemonService);

  listaPokemons = signal<any[]>([]);
  pokemonSeleccionadoDetalles = signal<any>(null);

  textoBusqueda = signal<string>('');
  listaFiltrada = computed(() => {
    const texto = this.textoBusqueda().toLowerCase().trim();
    if (!texto) return this.listaPokemons();
    return this.listaPokemons().filter(p => p.name.toLowerCase().includes(texto));
  });

  private offset = 0;
  private readonly LIMITE = 11;
  private readonly TOPE_MAXIMO = 101;
  cargando = signal<boolean>(false);

  ngOnInit() {
    this.cargarMas();
  }
  cargarMas() {
    if (this.offset >= this.TOPE_MAXIMO || this.cargando()) return;

    this.cargando.set(true);

    this.pokemonService.obtenerLista(this.LIMITE, this.offset).subscribe(respuesta => {
      
      this.listaPokemons.update(actual => [...actual, ...respuesta.results]);

      if (this.offset === 0) {
        this.seleccionarPokemon(respuesta.results[0].name);
      }

      this.offset += this.LIMITE;
      this.cargando.set(false);
    });
  }

  onScroll(event: Event) {
    const el = event.target as HTMLElement;

    const llegueAlFondo = el.scrollTop + el.clientHeight >= el.scrollHeight - 50;

    if (llegueAlFondo) {
      this.cargarMas();
    }
  }

  seleccionarPokemon(nombre: string) {
    this.pokemonService.obtenerDetalles(nombre).subscribe(detalles => {
      this.pokemonSeleccionadoDetalles.set(detalles);
    });
  }
}