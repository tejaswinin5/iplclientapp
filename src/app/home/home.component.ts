import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/service/user.service';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  
  }

}
