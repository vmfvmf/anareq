import { Component, OnInit } from '@angular/core';
import {User} from '../user';

import {Router} from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
    public user: User;
  constructor(
        private loginService: LoginService,
        private router: Router) { }

  ngOnInit() {
      this.usuarioLogado();
  }
  
  
  usuarioLogado(): void {
        this.loginService.usuarioLogado()
            .subscribe((s: User) => this.prossegue(s));
    }
    
    prossegue(s: User): void {
        this.user = s; 
        if (s.username == '') 
         this.router.navigate(['/login']);
    }
    
    deslogar():void{
        this.loginService.deslogar();
        this.router.navigate(['/']);
    }

}
