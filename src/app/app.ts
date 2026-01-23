import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-mentorat-niveau-1');

  count = 0;

  increment(): void {
    this.count++;
  }
}
