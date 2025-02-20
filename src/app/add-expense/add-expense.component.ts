import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormControlName,
} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  dropDownList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  billDetails!: FormGroup;
  @Input() options: any;
  @Output() show = new EventEmitter<boolean>();
  @Output() details = new EventEmitter<[]>();

  ngOnInit() {
    this.dropDownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' },
    ];

    this.dropdownSettings = { idField: 'item_id', textField: 'item_text' };
    this.billDetails = new FormGroup({
      email: new FormControl('', Validators.required),
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
    console.log(this.billDetails.value);
    if (this.billDetails.valid) {
      this.details.emit(this.billDetails.value);
      this.onCancel();
    }
  }
  onCancel() {
    this.show.emit(false);
  }
}
