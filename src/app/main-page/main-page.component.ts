import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { expenses, user } from '../user/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  currentUserDetails: user | any = [];
  allUserDetails: user[] = [];
  selectedFriend!: user;
  allFriends: user[] = [];
  showAdd: boolean = false;
  showDelete: boolean = false;
  isAuthenticated: string | null = localStorage.getItem('isAuthenticated');
  dataUpdated = new BehaviorSubject<boolean>(false);
  showAllFriends: boolean = false;
  showAddExpense: boolean = false;
  showDeleteExpense: boolean = false;
  newExpenses!: expenses;
  showBankDetails: boolean = false;

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.fetchUserDetails();
    }
    this.dataUpdated.subscribe((value) => {
      if (value) {
        window.location.reload();
        this.fetchUserDetails();
      }
    });
  }

  fetchUserDetails() {
    this.userService.getDetails().subscribe((data: any) => {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        this.allUserDetails.push(data[key]);
      });
      const email = localStorage.getItem('currentUser');

      this.currentUserDetails = this.allUserDetails.filter(
        (detail) => detail.email === email
      );

      this.allFriends = this.allUserDetails.filter(
        (detail) => detail.email !== email
      );
    });
  }

  isOpen: boolean = false;
  onOpen() {
    this.isOpen = !this.isOpen;
  }
  onFriendSelected($event: string) {
    if (this.allUserDetails && this.allUserDetails.length > 0) {
      const theirFriend = this.allUserDetails.filter(
        (detail) => detail.email === $event
      );
      if (theirFriend) {
        this.allUserDetails.map((data) => {
          if (data.email === this.currentUserDetails[0].email) {
            if (!data.friends || data.friends.length === 0) {
              data.friends = [...theirFriend];
            }

            if (data.friends.length > 0) {
              data.friends = data.friends.filter((friend) => friend !== '');
              data.friends.some((friend) =>
                friend.email !== theirFriend[0].email
                  ? data.friends.push(...theirFriend)
                  : ''
              );
            }
          }
        });
        this.userService
          .updateData(this.allUserDetails)
          .subscribe(() => this.dataUpdated.next(true));
      }
    }
  }

  deleteFriend(friend: user) {
    this.selectedFriend = friend;
    this.showDelete = true;
  }
  onConfirmDelete($event: boolean) {
    if (
      $event &&
      this.selectedFriend &&
      this.allUserDetails.length > 0 &&
      this.currentUserDetails.length > 0
    ) {
      this.allUserDetails.map((person) => {
        if (person.email === this.currentUserDetails[0].email) {
          person.friends.some((friend) => {
            if (friend.email === this.selectedFriend.email) {
              person.friends = person.friends.filter(
                (friend) => friend.email !== this.selectedFriend.email
              );
            }
          });
        }
      });
      this.userService
        .updateData(this.allUserDetails)
        .subscribe(() => this.dataUpdated.next(true));
    }
  }
  showFriends() {
    this.showAllFriends = !this.showAllFriends;
  }

  logout() {
    this.authService.logout();
  }

  onGettingDetails($event: any) {
    console.log($event);
    const paid = $event.percentage.reduce((acc: number, value: any) => {
      if (value.email === this.currentUserDetails[0].email) {
        acc += value.perc;
      }
      return acc;
    }, 0);
    const received = $event.percentage.reduce((acc: number, value: any) => {
      if (value.email !== this.currentUserDetails[0].email) {
        acc += value.perc;
      }
      return acc;
    }, 0);

    if (
      this.allUserDetails &&
      this.allUserDetails.length > 0 &&
      this.currentUserDetails.length > 0
    ) {
      this.allUserDetails.filter((person) => {
        if (person.email === this.currentUserDetails[0].email) {
          const amountPaid = (paid * +$event.amount) / 100;
          const amountReceived = (received * +$event.amount) / 100;
          console.log(amountPaid, amountReceived, +$event.amount);
          if (!person.expenses) {
            person.expenses = [];
          }
          if (person.expenses.length >= 0) {
            const defaultExpenseIndex = person.expenses.findIndex(
              (expense) =>
                expense.category === '' &&
                expense.totalAmount === 0 &&
                expense.amountToBeReceived === 0 &&
                expense.amountToBePaid === 0 &&
                expense.date === ''
            );

            const expenseValues = [
              {
                category: $event.description,
                amountToBePaid: amountPaid,
                totalAmount: $event.amount,
                equallySplitted: $event.splitBill,
                unequallySplitted: !$event.splitBill,
                percentageOfSplitting: $event.percentage,
                amountToBeReceived: amountReceived,
                date: new Date().toISOString(),
              },
            ];

            if (defaultExpenseIndex !== -1) {
              person.expenses = expenseValues;
            } else {
              person.expenses = [...person.expenses, ...expenseValues];
            }

            // Adding bank account details
            this.calcBankDetails(person);
          }
        }
      });
    }
    console.log(this.allUserDetails);
    this.userService
      .updateData(this.allUserDetails)
      .subscribe(() => this.dataUpdated.next(true));
  }

  deleteExpense(expense: expenses) {
    this.showDeleteExpense = true;
    this.newExpenses = expense;
  }

  calcBankDetails(person: user) {
    let totalYouPaid = person.expenses.reduce(
      (acc: number, expense: expenses) => {
        return acc + expense.amountToBePaid;
      },
      0
    );

    let totalYouLent = person.expenses.reduce(
      (acc: number, expense: expenses) => {
        return acc + expense.amountToBeReceived;
      },
      0
    );

    if (!person.bankAccountDetails) {
      // Initialize bankAccountDetails with a default object
      person.bankAccountDetails = [
        {
          youPaid: 0,
          youLent: 0,
        },
      ];
    }

    // Update the bank account details
    const bankAccountDetails = {
      youPaid: totalYouPaid,
      youLent: totalYouLent,
    };

    if (person.bankAccountDetails.length > 0) {
      person.bankAccountDetails[0] = bankAccountDetails;
    } else {
      person.bankAccountDetails.push(bankAccountDetails);
    }

    console.log(bankAccountDetails);
  }

  onDeleteExpense($event: any) {
    console.log($event);
    if (this.newExpenses && Object.keys(this.newExpenses).length > 0) {
      const expenseIndex = this.currentUserDetails[0].expenses.findIndex(
        (e: expenses) =>
          e.category === this.newExpenses.category &&
          e.date === this.newExpenses.date
      );

      if (expenseIndex !== -1) {
        this.currentUserDetails[0].expenses.splice(expenseIndex, 1);
        this.calcBankDetails(this.currentUserDetails[0]);

        this.userService.updateData(this.allUserDetails).subscribe(() => {
          // Trigger data update and refresh the view
          this.dataUpdated.next(true);
        });
      }
    }
  }

  // Function to get the amount paid by the current user
  getCurrentUserPaidAmount(): number {
    return this.currentUserDetails[0]?.expenses.reduce(
      (acc: number, expense: expenses) => {
        // Sum the amounts paid by the current user
        if (
          expense.percentageOfSplitting.some(
            (percent) => percent.email === this.currentUserDetails[0].email
          )
        ) {
          const amountPaid =
            (expense.amountToBePaid *
              expense.percentageOfSplitting.find(
                (p) => p.email === this.currentUserDetails[0].email
              )?.perc || 0) / 100;
          acc += amountPaid;
        }
        return acc;
      },
      0
    );
  }

  // Function to get the friend's name and the respective amount
  getFriendName(email: string): string {
    const friend = this.allUserDetails.find((user) => user.email === email);
    return friend ? friend.name : 'Unknown Friend';
  }
  getFriendAmount(perc: any, expense: expenses): number {
    const amount = (perc.perc / 100) * expense.totalAmount;
    return amount;
  }

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
}
