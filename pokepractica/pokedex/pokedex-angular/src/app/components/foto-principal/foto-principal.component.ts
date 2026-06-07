import { Component, Input, OnChanges } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-foto-principal',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './foto-principal.component.html',
  styleUrl: './foto-principal.component.css'
})
export class FotoPrincipalComponent implements OnChanges {
  // Recibe el SIGNAL de detalles completo del padre
  @Input() pokemonDetalles: any = null; 

  private audioActual: HTMLAudioElement | null = null;

  ngOnChanges() {
    if (this.audioActual) {
      this.audioActual.pause();
      this.audioActual.currentTime = 0;
    }
  }
  reproducirGrito() {
    const urlAudio = this.pokemonDetalles?.cries?.latest;
    if (!urlAudio) return;

    // Detenemos el anterior si existe
    if (this.audioActual) {
      this.audioActual.pause();
      this.audioActual.currentTime = 0;
    }

    this.audioActual = new Audio(urlAudio);
    this.audioActual.play();
  }
}
