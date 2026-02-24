import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, catchError } from 'rxjs';
import { PokemonSummary } from '../models/pokemon';

type PokeApiPokemon = {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: Array<{ type: { name: string } }>;
};

@Injectable({ providedIn: 'root' })
export class PokeApiService {
  constructor(private http: HttpClient) {}

  getPokemonByName(nameRaw: string): Observable<PokemonSummary | null> {
    const name = nameRaw.trim().toLowerCase();
    if (!name) return of(null);

    return this.http
      .get<PokeApiPokemon>(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`)
      .pipe(
        map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.sprites?.front_default ?? null,
          types: (p.types ?? []).map(t => t.type.name),
        })),
        // fallback si API KO / réseau
        catchError(() => of(this.mockPokemon(name)))
      );
  }

  private mockPokemon(name: string): PokemonSummary | null {
    // fallback très simple pour ne pas bloquer l’atelier
    const mocks: Record<string, PokemonSummary> = {
      pikachu: { id: 25, name: 'pikachu', sprite: null, types: ['electric'] },
      bulbasaur: { id: 1, name: 'bulbasaur', sprite: null, types: ['grass', 'poison'] },
      charmander: { id: 4, name: 'charmander', sprite: null, types: ['fire'] },
      squirtle: { id: 7, name: 'squirtle', sprite: null, types: ['water'] },
    };
    return mocks[name] ?? null;
  }
}
