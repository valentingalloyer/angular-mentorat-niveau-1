import {ChangeDetectorRef, Component} from '@angular/core';
import {TeamService} from '../../services/team.service';
import {PokeApiService} from '../../services/pokeapi.service';
import {PokemonSummary} from '../../models/pokemon';

@Component({
  selector: 'app-pokedex',
  standalone: false,
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css',
})
export class Pokedex {

  query = '';
  loading = false;
  errorMsg = '';
  result: PokemonSummary | null = null;

  constructor(
    private pokeApi: PokeApiService,
    private teamService: TeamService,
    private cdr: ChangeDetectorRef
  ) {}

  search(): void {
    this.errorMsg = '';
    this.result = null;

    const q = this.query.trim();
    if (!q) {
      this.errorMsg = 'Le champ est obligatoire.';
      return;
    }

    this.loading = true;

    this.pokeApi.getPokemonByName(q).subscribe({
      next: (p) => {
        console.log(p)
        this.result = p;
        if (!p) {
          this.errorMsg = 'Pokémon introuvable (ou mock indisponible).';
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Erreur réseau.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToTeam(): void {
    if (!this.result) return;
    this.teamService.addPokemon(this.result);
  }

}
