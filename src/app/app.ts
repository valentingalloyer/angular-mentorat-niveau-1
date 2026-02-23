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

  // Injection de dépendance : Angular fournit TaskService automatiquement
  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    // this.tasks = this.taskService.getTasks();
    this.loadFromApi();
  }

  addTask(task: string): void {
    this.taskService.addTask(task);
    // this.tasks = this.taskService.getTasks();
  }

  removeTask(index: number): void {
    this.taskService.removeTask(index);
    // this.tasks = this.taskService.getTasks();
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
