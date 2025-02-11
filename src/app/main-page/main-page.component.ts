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
  showDelete: boolean = false;
  isAuthenticated: string | null = localStorage.getItem('isAuthenticated');
  dataUpdated = new BehaviorSubject<boolean>(false);
  showAllFriends: boolean = false;
  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.fetchUserDetails();
    }
    this.dataUpdated.subscribe((value) => {
      if (value) {
        this.fetchUserDetails();
      }
    });
  }

  fetchUserDetails() {
    this.authService.getDetails().subscribe((data: any) => {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        this.allUserDetails.push(data[key]);
      });
      const email = localStorage.getItem('currentUser');

      this.currentUserDetails = this.allUserDetails.filter(
        (detail) => detail.email === email
      );
      console.log(this.currentUserDetails);
      this.allFriends = this.allUserDetails.filter(
        (detail) => detail.email !== email
      );
    });

    console.log(this.currentUserDetails);
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
        this.allUserDetails.forEach((data) => {
          if (data.email === this.currentUserDetails[0].email) {
            if (!data.friends) {
              data.friends = [];
            }
            data.friends = data.friends.filter((friend) => friend !== '');
            if ((data.friends = [])) {
              data.friends.push(...theirFriend);
            }
            if (data.friends.length > 0) {
              data.friends.forEach((friend) => {
                if (friend.email !== theirFriend[0].email) {
                  data.friends.push(...theirFriend);
                } else {
                  console.log('Friend already exists');
                }
              });
            }
          }
        });
        this.authService
          .updateData(this.allUserDetails)
          .subscribe(() => this.dataUpdated.next(true));
      }
    }
  }
  showFriends() {
    this.showAllFriends = !this.showAllFriends;
  }

  logout() {
    this.authService.logout();
  }

  constructor(private authService: AuthService) {}
}
