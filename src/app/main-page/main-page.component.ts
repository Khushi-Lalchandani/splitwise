import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { user } from '../user/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  currentUserDetails!: user;
  isAuthenticated: string | null = localStorage.getItem('isAuthenticated');
  ngOnInit(): void {}
  isOpen: boolean = false;
  onOpen() {
    this.isOpen = !this.isOpen;
  }
  logout() {
    this.authService.logout();
  }
  constructor(private authService: AuthService) {}
}
