import { Component, Input, OnChanges, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detalle-panel',
  standalone: true,
  templateUrl: './detalle-panel.component.html',
  styleUrl: './detalle-panel.component.css'
})
export class DetallePanelComponent implements OnChanges {
  @Input() pokemonDetalles: any = null;

  private pokemonService = inject(PokemonService);

  historiaEspanol: string = '';

  ngOnChanges() {
    if (!this.pokemonDetalles) return;

    this.pokemonService.obtenerEspecie(this.pokemonDetalles.id).subscribe(especie => {
      const entradaEspanol = especie.flavor_text_entries.find(
        (entrada: any) => entrada.language.name === 'es'
      );
      this.historiaEspanol = entradaEspanol
        ? entradaEspanol.flavor_text.replace(/\f/g, ' ')
        : 'Historia no disponible en español.';
    });
  }

  obtenerColorBarra(valor: number): string {
    if (valor >= 80) return '#4caf50';
    if (valor >= 50) return '#ffcb05';
    return '#dc0a2d';
  }
}