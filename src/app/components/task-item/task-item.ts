import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../services/task';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {

  // Parent -> Enfant
  @Input() task!: Task;

  // Enfant -> Parent
  @Output() done = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  markDone(): void {
    this.done.emit();
  }

  delete(): void {
    this.remove.emit();
  }

}
