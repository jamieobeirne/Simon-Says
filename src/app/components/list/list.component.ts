import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/services/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'email', 'verified', 'active', 'roles', 'actions'];
  userList: User[] = [];

  constructor(private authService : AuthService) {
   
  }

  ngOnInit(): void {
  
    //this.userList = this.authService.getListOfUsers()
    this.authService.getListOfUsers()
      .then(result=> {
        this.userList = result
        
        this.userList[0].roles = { user: false,
          professional: false,
          admin: true} 

        this.userList[1].roles = { user: true,
          professional: false,
          admin:false} 
          
        console.log("From List Component, value of roles: ", this.userList)
      })
  }

  disableUser(uid:string):void{
    getAuth().
      
  }


}
