import { Component, OnInit } from '@angular/core';
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
  showAllFriends: boolean = false;
  ngOnInit(): void {
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
    console.log($event);
    console.log(this.allUserDetails);
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
