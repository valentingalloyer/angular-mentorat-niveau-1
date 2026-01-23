import { Component } from '@angular/core';

@Component({
  selector: 'app-ex1',
  standalone: false,
  templateUrl: './ex1.html',
  styleUrl: './ex1.css',
})
export class Ex1 {
  count = 0;

  increment(): void {
    this.count++;
  }
}
