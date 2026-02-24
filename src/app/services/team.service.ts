import { Injectable } from '@angular/core';
import { TeamMember, PokemonSummary } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly storageKey = 'mentorat-angular-team';
  private team: TeamMember[] = [];

  constructor() {
    this.loadFromStorage();
  }

  getTeam(): TeamMember[] {
    return this.team.map(m => ({ ...m, types: [...m.types] }));
  }

  count(): number {
    return this.team.length;
  }

  addPokemon(p: PokemonSummary): void {
    const exists = this.team.some(x => x.name.toLowerCase() === p.name.toLowerCase());
    if (exists) return;

    this.team.push({ ...p, ko: false });
    this.saveToStorage();
  }

  removeAt(index: number): void {
    if (index < 0 || index >= this.team.length) return;
    this.team.splice(index, 1);
    this.saveToStorage();
  }

  toggleKo(index: number): void {
    if (index < 0 || index >= this.team.length) return;
    this.team[index].ko = !this.team[index].ko;
    this.saveToStorage();
  }

  clear(): void {
    this.team = [];
    localStorage.removeItem(this.storageKey);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.team));
  }

  private loadFromStorage(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as any[];
      this.team = parsed
        .filter(x =>
          typeof x?.id === 'number' &&
          typeof x?.name === 'string' &&
          Array.isArray(x?.types) &&
          typeof x?.ko === 'boolean'
        )
        .map(x => ({
          id: x.id,
          name: x.name,
          sprite: typeof x.sprite === 'string' ? x.sprite : null,
          types: x.types.filter((t: any) => typeof t === 'string'),
          ko: x.ko,
        }));
    } catch {
      this.team = [];
    }
  }
}
