import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.scss'],
})
export class AddPopupComponent implements OnInit {
  detailsForm!: FormGroup;
  @Output() hide = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.detailsForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  onSubmit() {
    if (this.detailsForm.valid) {
      console.log(this.detailsForm.value);
      const value = this.detailsForm.value;
    }
  }
  onCancel() {
    this.hide.emit(false);
  }

  constructor(private authService: AuthService) {}
}
