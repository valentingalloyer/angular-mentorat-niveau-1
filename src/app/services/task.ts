import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

export type TodoFromApi = {
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private tasks: string[] = [
    'Acheter du pain',
    'Faire les courses',
    'Coder en Angular',
  ];

  constructor(private http: HttpClient) {
  }

  getTasks(): string[] {
    // On renvoie une copie pour éviter les modifications directes hors service
    return [...this.tasks];
  }

  addTask(task: string): void {
    const t = task.trim();
    if (!t) return;
    this.tasks.push(t);
  }

  removeTask(index: number): void {
    if (index < 0 || index >= this.tasks.length) return;
    this.tasks.splice(index, 1);
  }

  loadMockTodosFromApi(limit = 5): Observable<string[]> {
    return this.http
      .get<TodoFromApi[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        map((todos) => todos.slice(0, limit).map((t) => t.title))
      );
  }

}
