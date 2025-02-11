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
  selectedFriend!: user;
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
        window.location.reload();
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
        this.authService
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
      this.authService
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

  constructor(private authService: AuthService) {}
}
