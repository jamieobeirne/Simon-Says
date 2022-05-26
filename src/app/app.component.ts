import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn: boolean = false;
  isAdmin:boolean = false;
  isDisabled:boolean = false;
  
  constructor(public authService: AuthService, private router: Router) { 
    //this.isLoggedIn = false;
    this.authService.authBehaviorSubject.subscribe((data) => {
      this.isLoggedIn = data.isLoggedIn;
      this.isAdmin = data.isAdmin;
      this.isDisabled = data.isDisabled; 
    })    
  }

  ngOnInit(): void{
    //this.isLoggedIn = this.authService.isLoggedIn;
  }
  
  logout(): void {
    this.authService.logOut();
    //this.isLoggedIn = false;
    //this.isLoggedInBehaviorSubject.next(false);
    this.router.navigate(['home']);
  }

  goToUserPage():void{
    this.router.navigate(['dashboard']);
  }

  goToUserUsersManual():void{
    this.router.navigate(['users-manual']);
  }

}
