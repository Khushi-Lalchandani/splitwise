import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  signUp(details: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    return this.https.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZ7Wox-x5tyqRiNvD2YrVtoP69eDjZFPs',
      details
    );
  }
  signUpFirebase() {}
  login() {}
  constructor(private https: HttpClient) {}
}
