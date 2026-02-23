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

  constructor(private http: HttpClient) {}

  addTask(task: string, list: Task[]): void {
    const t = task.trim();
    if (!t) return;
    list.push({ title: t, done: false });
  }

  removeTask(index: number, list: Task[]): void {
    if (index < 0 || index >= list.length) return;
    list.splice(index, 1);
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

  replaceTasks(tasks: Task[], list: Task[]): void {
    list = tasks.map(t => ({ ...t }));
  }

}
