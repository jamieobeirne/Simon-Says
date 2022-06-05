import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/services/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit {
  displayedColumns: string[] = ['displayName','email', 'uid', 'active', 'roles', 'actions'];
  userList: User[] = [];


  constructor(private authService : AuthService, private afs: AngularFirestore) {}
  

  ngOnInit(): void {
  
    this.authService.getListOfUsers()
      .then(result=> {
        this.userList = result
  
      })
  }

  
  disableUser(uid:string):void{
    let newIndex = this.userList.findIndex(x => x.uid == uid);
    let user = this.userList[newIndex];

    this.afs.collection("/users")
    .doc(uid)
    .update({isDisabled: !user.isDisabled})

    .then(result =>{
      this.userList[newIndex].isDisabled = !user.isDisabled;
      
    })
  }


}
