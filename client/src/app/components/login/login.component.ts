import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  User } from '../../models/user';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(): void {
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user)
        .subscribe(data => {
          if (data.success) {
            this.authService.storeUserData(data.token, data.user);
            this.flashMessage.show('You are now logged in', { cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(['/dashboard']);
          } else {
            this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/login']);
          }
      
      
    });
  }

}
