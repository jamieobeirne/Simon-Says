import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/services/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userList: User[] = [];

  constructor(private authService : AuthService) {
   
    console.log("From Component1", this.userList)
  }

  ngOnInit(): void {
    
    //this.userList = this.authService.getListOfUsers()

    this.authService.getListOfUsers()
      .then(result=> {
        this.userList = result
        console.log("From Component2", this.userList)
      })
    
  }


}
