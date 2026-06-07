import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tarjeta-pokemon',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrl: './tarjeta-pokemon.component.css'
})
export class TarjetaPokemonComponent {
  @Input() nombrePokemon: string = ''; // Recibe el nombre del Padre
  @Output() tarjetaClickeada = new EventEmitter<string>(); // Avisa al padre del clic

  seleccionar() {
    this.tarjetaClickeada.emit(this.nombrePokemon);
  }
}
