import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { user } from '../user/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  error: string = '';
  myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      const { fname, lname, email, password } = this.myForm.value;
      console.log(this.myForm);
      this.authService
        .signUp({
          email: this.myForm.value.email,
          password: this.myForm.value.password,
          returnSecureToken: true,
        })
        .subscribe({
          next: (res) => {
            console.log('User signed up succesdfully', res);

            const newUser: user = {
              name: `${fname} ${lname}`,
              email: email,
              expenses: [],
              equallySplitted: false,
              unequallySplitted: false,
              percentageOfSplitting: [],
            };

            this.authService.signUpFirebase(newUser).subscribe({
              next: () => {
                console.log('User added to firebase database');
                this.router.navigate(['/main']);
              },
              error: (err) => {
                console.log('Error posting user to Firebase Database', err);
              },
            });
          },
          error: (err) => {
            console.log('Error signing up', err);
            this.error = err.error.error.message;
          },
        });
    }
  }

  constructor(private router: Router, private authService: AuthService) {}
}
