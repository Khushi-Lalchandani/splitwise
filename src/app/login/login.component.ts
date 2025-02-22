import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.authService
        .login({
          email: this.myForm.value.email,
          password: this.myForm.value.password,
          returnSecureToken: true,
        })
        .subscribe({
          next: (response) => {
            console.log('User logged in!');
            this.authService.authenticateUser('true', this.myForm.value.email);
            const username = this.myForm.value.email.split('@')[0];
            this.router.navigate([`/main/${username}`]);
          },
        });
    }
  }

  constructor(private router: Router, private authService: AuthService) {}
}
