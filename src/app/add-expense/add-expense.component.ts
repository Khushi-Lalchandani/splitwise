import { user } from './../user/user.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  dropDownList: any[] = [];
  currentUserEmail!: string | null;
  selectedEmails: string[] | any = [];
  dropdownSettings: IDropdownSettings = {};
  billDetails!: FormGroup;

  percentage: Array<{ email: string; perc: number }> = [];

  @Input() options: any;
  @Output() show = new EventEmitter<boolean>();
  @Output() details = new EventEmitter<[]>();

  ngOnInit() {
    this.currentUserEmail = localStorage.getItem('currentUser');

    this.options.forEach((option: user) => {
      this.dropDownList = [...this.dropDownList, option.email];
    });

    this.dropdownSettings = {
      limitSelection: 5,
      maxHeight: 80,
      allowSearchFilter: true,
      searchPlaceholderText: 'Search for email id',
    };
    this.billDetails = new FormGroup({
      email: new FormControl([this.currentUserEmail], Validators.required),
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      splitBill: new FormControl(false),
      percentage: new FormArray([]),
    });

    this.billDetails.get('splitBill')?.valueChanges.subscribe((value) => {
      if (value) {
        for (let i = 0; i < this.billDetails.value.email.length; i++) {
          const emails = this.billDetails.value.email;
          const equalShare = (
            100 / this.billDetails.value.email.length
          ).toFixed(2);

          this.percentage = emails.map((email: string) => ({
            email: email,
            perc: +equalShare,
          }));

          this.billDetails.patchValue({ percentage: this.percentage });
        }
      } else {
        this.billDetails.value.percentage = [];
      }
    });
  }
  onSubmit() {
    if (this.billDetails.valid) {
      if (this.percentage.length > 0) {
        this.billDetails.value.percentage = this.percentage;
      }
      console.log(this.billDetails.value);
      this.details.emit(this.billDetails.value);
      this.onCancel();
    }
  }

  onCancel() {
    this.show.emit(false);
  }
  onSelectEmail($event: any) {
    this.selectedEmails = [...this.selectedEmails, $event];
  }

  addPercentage(email: string, $event: any) {
    if (this.percentage.length > 0) {
      this.percentage = [
        ...this.percentage,
        { email: email, perc: Number($event.target.value) },
      ];
    } else {
      this.percentage = [{ email: email, perc: Number($event.target.value) }];
    }
  }
}
