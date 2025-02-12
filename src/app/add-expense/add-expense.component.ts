import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  billDetails!: FormGroup;
  @Output() show = new EventEmitter<boolean>();
  @Output() details = new EventEmitter<[]>();

  ngOnInit() {
    this.billDetails = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      splitBill: new FormControl(false),
      percentage1: new FormControl(null, Validators.required),
      percentage2: new FormControl(null, Validators.required),
    });

    this.billDetails.get('splitBill')?.valueChanges.subscribe((value) => {
      if (value) {
        this.billDetails.patchValue({
          percentage1: 50,
          percentage2: 50,
        });
      } else {
        this.billDetails.patchValue({
          percentage1: 0,
          percentage2: 0,
        });
      }
    });
  }
  onSubmit() {
    if (this.billDetails.valid) {
      this.details.emit(this.billDetails.value);
      this.onCancel();
    }
  }
  onCancel() {
    this.show.emit(false);
  }
}
