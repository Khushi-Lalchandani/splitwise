import { user } from './../user/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  dropDownList: any[] = [];
  selectedEmails: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  billDetails!: FormGroup;
  @Input() options: any;
  @Output() show = new EventEmitter<boolean>();
  @Output() details = new EventEmitter<[]>();

  ngOnInit() {
    this.options.forEach((option: user) => {
      this.dropDownList = [...this.dropDownList, option.email];
    });

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
  onSelectEmail($event: any) {
    console.log($event);

    this.selectedEmails = [...this.selectedEmails, $event];
    console.log(this.selectedEmails);
  }
  onDeSelectEmail($event: any) {
    console.log($event);
  }
}
// export class AddExpenseComponent implements OnInit {
//   dropDownList: any[] = [];
//   selectedEmails: string[] = [];
//   dropdownSettings: IDropdownSettings = {};
//   billDetails!: FormGroup;
//   @Input() options: any;
//   @Output() show = new EventEmitter<boolean>();
//   @Output() details = new EventEmitter<[]>();

//   // This will store the dynamically generated percentage form controls
//   dynamicPercentageControls: FormControl[] = [];

//   ngOnInit() {
//     this.options.forEach((option: user) => {
//       this.dropDownList = [...this.dropDownList, option.email];
//     });

//     this.billDetails = new FormGroup({
//       email: new FormControl('', Validators.required),
//       description: new FormControl('', Validators.required),
//       amount: new FormControl('', Validators.required),
//       splitBill: new FormControl(false),
//       // Initially, there will be no percentage fields
//       percentages: new FormControl([]),
//     });

//     this.billDetails.get('splitBill')?.valueChanges.subscribe((value) => {
//       if (value) {
//         this.billDetails.patchValue({
//           percentages: [50], // Default to one percentage field for splitting equally
//         });
//       } else {
//         this.billDetails.patchValue({
//           percentages: [],
//         });
//       }
//     });
//   }

//   onSelectEmail($event: any) {
//     this.selectedEmails = [...this.selectedEmails, $event];
//     this.updatePercentageFields();
//   }

//   onDeSelectEmail($event: any) {
//     this.selectedEmails = this.selectedEmails.filter(
//       (email) => email !== $event
//     );
//   }

//   // Dynamically update percentage fields based on the number of selected emails
//   updatePercentageFields() {
//     const emailCount = this.selectedEmails.length;
//     const percentageArray = new Array(emailCount).fill(null);

//     // Set percentage controls for each selected email
//     this.billDetails.patchValue({
//       percentages: percentageArray,
//     });
//   }

//   onSubmit() {
//     console.log(this.billDetails.value);
//     if (this.billDetails.valid) {
//       this.details.emit(this.billDetails.value);
//       this.onCancel();
//     }
//   }

//   onCancel() {
//     this.show.emit(false);
//   }
// }
