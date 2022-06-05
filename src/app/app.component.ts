import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';


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
  faBars = faBars;
  
  constructor(public authService: AuthService, private router: Router) { 
    this.authService.authBehaviorSubject.subscribe((data) => {
      this.isLoggedIn = data.isLoggedIn;
      this.isAdmin = data.isAdmin;
      this.isDisabled = data.isDisabled; 
    })    
  }

  ngOnInit(): void{
    
  }
  
  logout(): void {
    this.authService.logOut();
    this.router.navigate(['home']);
  }

  goToSignIn():void{
    this.router.navigate(['login'])
  }

  goToListUsers():void{
    this.router.navigate(['list'])
  }

}
