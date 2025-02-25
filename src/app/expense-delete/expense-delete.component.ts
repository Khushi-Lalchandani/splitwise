import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-expense-delete',
  templateUrl: './expense-delete.component.html',
  styleUrls: ['./expense-delete.component.scss'],
})
export class ExpenseDeleteComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() confirmDelete = new EventEmitter<boolean>();
  closeModal() {
    this.show.emit(false);
  }
  confirm() {
    this.confirmDelete.emit(true);
    this.closeModal();
  }
}
