import { user } from './../user/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
      'https://splitbills-3abe9-default-rtdb.firebaseio.com/users.json',
      content
    );
  }

  authenticateUser(isAuth: string, email: string) {
    localStorage.setItem('isAuthenticated', isAuth);
    localStorage.setItem('currentUser', email);
  }
  login(details: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }): Observable<any> {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZ7Wox-x5tyqRiNvD2YrVtoP69eDjZFPs',
      details
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getDetails() {
    return this.http.get(
      'https://splitbills-3abe9-default-rtdb.firebaseio.com/users.json'
    );
  }
  updateData(data: user[]) {
    return this.http.put(
      'https://splitbills-3abe9-default-rtdb.firebaseio.com/users.json',
      data
    );
  }

  constructor(private http: HttpClient, private router: Router) {}
}
