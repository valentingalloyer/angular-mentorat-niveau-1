import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeamMember} from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-item',
  standalone: false,
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.css',
})
export class PokemonItem {

  @Input() member!: TeamMember;

  @Output() ko = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  toggleKo(): void {
    this.ko.emit();
  }

  delete(): void {
    this.remove.emit();
  }

  // ngStyle démo : couleur selon 1er type
  get borderColor(): string {
    const t = this.member?.types?.[0] ?? '';
    const map: Record<string, string> = {
      electric: '#f2c200',
      fire: '#ff6b57',
      water: '#4aa3ff',
      grass: '#47c27d',
      poison: '#b06cff',
      normal: '#b9b9b9',
    };
    return map[t] ?? '#ddd';
  }

}
