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
  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadFromApi();
  }

  addTask(): void {
    if (this.newTask.trim() === '') return;

    this.taskService.addTask(this.newTask, this.tasks);
    this.newTask = '';
  }

  removeTask(index: number): void {
    this.taskService.removeTask(index, this.tasks);
  }

  loadFromApi(limit = 5): void {
    this.taskService.loadMockTodosFromApi().subscribe({
      next: (apiTasks: any[]) => {
        this.tasks = apiTasks.slice(0, limit).map((t: any) => t.title);
        },
      error: (err) => {
        console.log('Erreur lors du chargement API', err);
      }
    });
  }
}
