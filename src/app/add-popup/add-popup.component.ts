import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss'],
})
export class AddPopupComponent implements OnInit {
  detailsForm!: FormGroup;
  @Input() options!: any[];
  @Output() friendSelected = new EventEmitter<string>();
  @Output() hide = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.detailsForm = new FormGroup({
      selectedOption: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.detailsForm.valid) {
      const value = this.detailsForm.value.selectedOption;
      this.friendSelected.emit(value);
      this.hide.emit(false);
    }
  }
  onCancel() {
    this.hide.emit(false);
  }

  constructor(private authService: AuthService) {}
}
