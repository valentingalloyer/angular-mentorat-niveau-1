import { Component } from '@angular/core';
import {TeamService} from '../../services/team.service';
import {TeamMember} from '../../models/pokemon';

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {

  team: TeamMember[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.team = this.teamService.getTeam();
  }

  toggleKo(i: number): void {
    this.teamService.toggleKo(i);
    this.refresh();
  }

  remove(i: number): void {
    this.teamService.removeAt(i);
    this.refresh();
  }

  clear(): void {
    this.teamService.clear();
    this.refresh();
  }

}
