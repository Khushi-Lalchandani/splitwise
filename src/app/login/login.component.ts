import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  isLoginMode: boolean = true;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    console.log(this.myForm);
    this.router.navigate(['/main']);
  }
  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
  constructor(private router: Router) {}
}
