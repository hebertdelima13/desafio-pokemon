import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly api = 'https://pokeapi.co/api/v2/pokemon';

  page = signal(0);
  limit = 6;

  pokemons = signal<any[]>([]);
  selectedPokemon = signal<any>(null);
  favorites = signal<Set<number>>(new Set());
  http = inject(HttpClient);

  constructor() {
    this.loadPokemons();
  }

  loadPokemons() {
  const offset = this.page() * this.limit;

  this.http
    .get<any>(`${this.api}?offset=${offset}&limit=${this.limit}`)
    .pipe(
      map((res) => res.results),
      switchMap((results: any[]) =>
        forkJoin(results.map((p) => this.http.get<any>(p.url)))
      ),
      tap((detailed: any[]) => this.pokemons.set(detailed))
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

  selectPokemon(pokemon: any) {
    this.selectedPokemon.set(pokemon);
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
