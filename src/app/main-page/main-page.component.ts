import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { user } from '../user/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  currentUserDetails: user | any = [];
  allUserDetails: user[] = [];
  allFriends: user[] = [];
  showAdd: boolean = false;
  isAuthenticated: string | null = localStorage.getItem('isAuthenticated');
  dataUpdated = new BehaviorSubject<boolean>(false);
  showAllFriends: boolean = false;
  ngOnInit(): void {
    if (this.dataUpdated.value) {
      this.fetchUserDetails();
    }

    if (this.isAuthenticated) {
      this.fetchUserDetails();
    }
  }

  fetchUserDetails() {
    this.authService.getDetails().subscribe((data: any) => {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        this.allUserDetails.push(data[key]);
      });
      // console.log(this.allUserDetails);

      const email = localStorage.getItem('currentUser');

      this.currentUserDetails = this.allUserDetails.filter(
        (detail) => detail.email === email
      );
      console.log(this.currentUserDetails);

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
    // console.log($event);
    // console.log(this.allUserDetails);

    if (this.allUserDetails && this.allUserDetails.length > 0) {
      const theirFriend = this.allUserDetails.filter(
        (detail) => detail.email === $event
      );
      this.allUserDetails.forEach((data) => {
        if (data.email === this.currentUserDetails[0].email) {
          console.log(localStorage.getItem('currentUser'));

          if (data.friends && data.friends.length > 0) {
            data.friends = data.friends.filter((friend) => friend !== '');
            console.log(data.friends);
            // data.friends.push(theirFriend);
          }
        }
      });
      this.authService
        .updateData(this.allUserDetails)
        .subscribe(() => this.dataUpdated.next(true));
      console.log(this.allUserDetails);
    }
  }
  showFriends() {
    this.showAllFriends = !this.showAllFriends;
  }

  logout() {
    this.authService.logout();
  }
  showAddPopup() {
    this.showAdd = true;
  }
  constructor(private authService: AuthService) {}
}
