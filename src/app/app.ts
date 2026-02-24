import { Component, signal } from '@angular/core';
import {TeamService} from './services/team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-mentorat-niveau-1');

  constructor(private teamService: TeamService) {}

  get teamCount(): number {
    return this.teamService.count();
  }
}
