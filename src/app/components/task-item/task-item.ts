import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {

  // Parent -> Enfant
  @Input() task!: string;

  // Enfant -> Parent
  @Output() done = new EventEmitter<void>();

  markDone(): void {
    this.done.emit();
  }

}
