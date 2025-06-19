import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly api = 'https://pokeapi.co/api/v2/pokemon';

  page = signal(0);
  limit = 20;

  pokemons = signal<any[]>([]);
  favorites = signal<Set<number>>(new Set());

  constructor(private http: HttpClient) {
    this.loadPokemons();
  }

  loadPokemons() {
    const offset = this.page() * this.limit;
    this.http
      .get<any>(`${this.api}?offset=${offset}&limit=${this.limit}`)
      .pipe(
        map((res) => res.results),
        tap((list) => this.pokemons.set(list))
      )
      .subscribe();
  }

  nextPage() {
    this.page.update((p) => p + 1);
    this.loadPokemons();
  }

  previousPage() {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.loadPokemons();
    }
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.api}/${name}`);
  }

  toggleFavorite(id: number) {
    const favs = new Set(this.favorites());
    favs.has(id) ? favs.delete(id) : favs.add(id);
    this.favorites.set(favs);
  }

  isFavorite = (id: number) => computed(() => this.favorites().has(id));
}
