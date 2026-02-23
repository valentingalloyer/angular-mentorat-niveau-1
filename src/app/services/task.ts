import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private http: HttpClient) {}

  addTask(task: string, list: string[]): void {
    const t = task.trim();
    if (!t) return;
    list.push(t);
  }

  removeTask(index: number, list: string[]): void {
    if (index < 0 || index >= list.length) return;
    list.splice(index, 1);
  }

  loadMockTodosFromApi(): Observable<string[]> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/todos');
  }

}
