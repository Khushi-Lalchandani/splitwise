import { HttpClient } from '@angular/common/http';
import { user } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
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
  constructor(private http: HttpClient) {}
}
