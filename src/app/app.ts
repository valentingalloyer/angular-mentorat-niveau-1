import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-mentorat-niveau-1');

  // Liste des tâches
  tasks: string[] = [
    'Acheter du pain',
    'Faire les courses',
    'Coder en Angular',
  ];

  // Pour *ngIf
  showList = true;

  addTask(task: string): void {
    if (task.trim() === '') {
      return;
    }
    this.tasks.push(task);
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
