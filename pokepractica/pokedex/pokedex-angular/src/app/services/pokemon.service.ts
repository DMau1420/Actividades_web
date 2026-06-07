import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient); 
  private urlApi = 'https://pokeapi.co/api/v2/pokemon';
  private urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species';

  // Trae la lista básica con paginación
  obtenerLista(limite: number = 10, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.urlApi}?limit=${limite}&offset=${offset}`);
  }

  // Trae los detalles completos de un Pokémon específico
  obtenerDetalles(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${nombre}`);
  }


  obtenerEspecie(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlSpecies}/${id}`);
  }
}