import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss'],
})
export class DeletePopupComponent {
  @Output() showModal = new EventEmitter<boolean>();
  @Output() confirmDelete = new EventEmitter<boolean>();

  confirm() {
    this.confirmDelete.emit(true);
    this.closeModal();
  }
  closeModal() {
    this.showModal.emit(false);
  }
}
