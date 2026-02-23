import {Component, OnInit, signal} from '@angular/core';
import {Task, TaskService} from './services/task';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-mentorat-niveau-1');

  tasks: Task[] = [];
  showList = true;

  form = new FormGroup({
    task: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  // Injection de dépendance : Angular fournit TaskService automatiquement
  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadFromApi();
  }

  addTaskReactive(): void {
    if (this.form.invalid) {
      return;
    }

    const value = this.form.controls.task.value;

    if (!value) return;

    this.taskService.addTask(value, this.tasks);

    // réinitialise le formulaire
    this.form.reset();
  }

  removeTask(index: number): void {
    this.taskService.removeTask(index, this.tasks);
  }

  loadFromApi(limit = 5): void {
    this.taskService.loadMockTodosFromApi().subscribe({
      next: (apiTasks: any[]) => {
        this.tasks = apiTasks.slice(0, limit);
        },
      error: (err) => {
        console.log('Erreur lors du chargement API', err);
      }
    });
  }

  toggleDone(index: number): void {
    if (index < 0 || index >= this.tasks.length) return;
    this.tasks[index].done = !this.tasks[index].done;
  }
}
