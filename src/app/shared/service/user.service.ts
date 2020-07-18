import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {

    let jsonUsers = localStorage.getItem("users");
    if (jsonUsers == null) {
      localStorage.setItem("users", JSON.stringify([]));
    }

  }

  register(user: User): User {
    let sub = new Subject<any>();
    let jsonUsers = localStorage.getItem("users");
    let users = JSON.parse(jsonUsers);
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return user;
  }

  login(email: string, password: string) {
    let jsonUsers = localStorage.getItem("users");
    let users = JSON.parse(jsonUsers);
    for (let user of users) {
      if (user.email === email && user.password === password) {
        this.storeLoginUser(user);
        return user;
      }
    }
    return;
  }

  storeLoginUser(user: User) {
    localStorage.setItem("luser", JSON.stringify(user));
  }

  getLoginUserName() {
    if (localStorage.getItem("luser")) {
      let user: User = JSON.parse(localStorage.getItem("luser"));
      return user.name;
    }
  }
  logout() {
    localStorage.removeItem("luser");
  }
  
}
