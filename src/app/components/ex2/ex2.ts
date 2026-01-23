import { Component } from '@angular/core';

@Component({
  selector: 'app-ex2',
  standalone: false,
  templateUrl: './ex2.html',
  styleUrl: './ex2.css',
})
export class Ex2 {

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
