import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

export type Task = {
  title: string;
  done: boolean;
};

export type TodoFromApi = {
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private readonly storageKey = 'angular-mentorat-tasks';

  tasks: Task[] = [];
  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  loadFromStorage(): Task[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw) as any[];
      this.tasks = parsed.map(t => ({title: t.title, done: t.done}));
    } catch {
      this.tasks = [];
    }
    return this.tasks;
  }

  clearAll(): void {
    this.tasks = [];
    localStorage.removeItem(this.storageKey);
  }

  addTask(task: string): void {
    const t = task.trim();
    if (!t) return;
    this.tasks.push({ title: t, done: false });
    this.saveToStorage();
  }

  removeTask(index: number): void {
    if (index < 0 || index >= this.tasks.length) return;
    this.tasks.splice(index, 1);
    this.saveToStorage();
  }

  loadMockTodosFromApi(): Observable<Task[]> {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        map((todos) =>
          todos.slice(0, todos.length)
            .map(t => ({
              title: t.title,
              done: t.completed
            }))
        )
      );
  }

  toggleDone(index: number): void {
    if (index < 0 || index >= this.tasks.length) return;
    this.tasks[index].done = !this.tasks[index].done;
    this.saveToStorage();
  }

  replaceTasks(tasks: Task[]): void {
    this.tasks = tasks.map(t => ({ ...t }));
    this.saveToStorage();
  }

}
