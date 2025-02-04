import { user } from './../user/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  signUp(details: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }): Observable<any> {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZ7Wox-x5tyqRiNvD2YrVtoP69eDjZFPs',
      details
    );
  }
  signUpFirebase(content: user): Observable<any> {
    return this.http.post(
      'https://splitbills-3abe9-default-rtdb.firebaseio.com/.json',
      content
    );
  }
  login() {}
  constructor(private http: HttpClient) {}
}
