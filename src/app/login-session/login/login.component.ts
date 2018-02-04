import { Component, OnInit, Input } from '@angular/core';
//import {User} from '../user';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoginService} from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    //@Input() user: User;

  constructor(
        private loginService: LoginService,
        private location: Location) { }

  ngOnInit() {
  }
  
  login(user: string,password: string): void {
        this.loginService.login(user, password)
            .subscribe(() => this.goBack());
    }
    
    goBack(): void {
        this.location.back();
    }
}
