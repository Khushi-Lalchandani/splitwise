import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss'],
})
export class DeletePopupComponent {
  @Output() showModal = new EventEmitter<boolean>();

  closeModal() {
    this.showModal.emit(false);
  }
}
