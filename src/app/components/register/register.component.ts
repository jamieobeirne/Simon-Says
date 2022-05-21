import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  register(email: string, password: string, displayName:string): void {
    this.authService.register(email, password, displayName);
  }
}
