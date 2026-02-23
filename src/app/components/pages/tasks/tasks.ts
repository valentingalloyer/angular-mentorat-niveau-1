import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TaskService} from '../../../services/task';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {

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
    this.tasks = this.taskService.loadFromStorage();
  }

  clearAll(): void {
    this.taskService.clearAll();
  }

  addTaskReactive(): void {
    if (this.form.invalid) {
      return;
    }

    const value = this.form.controls.task.value;

    if (!value) return;

    this.taskService.addTask(value);

    // réinitialise le formulaire
    this.form.reset();
    this.refresh();
  }

  removeTask(index: number): void {
    this.taskService.removeTask(index);
    this.refresh();
  }

  loadFromApi(limit = 5): void {
    this.taskService.loadMockTodosFromApi().subscribe({
      next: (apiTasks: any[]) => {
        this.tasks = apiTasks.slice(0, limit);
      },
      error: (err: any) => {
        console.log('Erreur lors du chargement API', err);
      }
    });
  }

  toggleDone(index: number): void {
    this.taskService.toggleDone(index);
    this.refresh();
  }

  refresh(): void {
    this.tasks = this.taskService.getTasks();
  }

}
