import {Component, OnInit, signal} from '@angular/core';
import {TaskService} from './services/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-mentorat-niveau-1');

  tasks: string[] = [];
  showList = true;

  newTask = '';

  // Injection de dépendance : Angular fournit TaskService automatiquement
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (this.newTask.trim() === '') return;

    this.taskService.addTask(this.newTask);
    this.tasks = this.taskService.getTasks();
    this.newTask = '';
  }

  removeTask(index: number): void {
    this.taskService.removeTask(index);
    this.tasks = this.taskService.getTasks();
  }

  loadFromApi(): void {
    this.taskService.loadMockTodosFromApi(5).subscribe({
      next: (apiTasks) => {
        this.tasks = apiTasks;
      },
      error: () => {
        console.log('Erreur lors du chargement API');
      },
    });
  }
}
