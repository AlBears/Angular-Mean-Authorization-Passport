import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User('', '', '', '');
  public name: String;
  public username: String;
  public email: String;
  public password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(): void | Boolean {
    var { name, username, email, password } = this;

    this.user.name = name;
    this.user.username = username;
    this.user.email = email;
    this.user.password = password;

    if (!this.validateService.validateRegister(this.user)) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validateService.validateEmail(this.user.email)) {
      this.flashMessagesService.show('Please use valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(this.user)
        .subscribe(data => {
          if(data.success) {
            this.flashMessagesService.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(['/login']);
        } else {
            this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/register']);
          }
        });
  }



}
