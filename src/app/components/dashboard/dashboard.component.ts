import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { User } from '../../shared/services/user';
import { AuthService } from '../../shared/services/auth.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  userInfo: any = {}
  faTrashCan = faTrashCan; //font awesome
  faPencil = faPencil;
  

  constructor(
    private afs: AngularFirestore, 
    public authService: AuthService,
    private router: Router,) {
  }
  
  ngOnInit() {
    //this.userInfo = this.authService.getUser();
    //console.log("Dashboard userInfo: ", this.userInfo);
  }
  
  openVoiceTool() {
    this.authService.openVoiceTool();
  }


  disableUser(uid:string):void{
    //let user = this.authService.userInfo;
    this.afs.collection("/users")
    .doc(uid)
    .update({isDisabled: true})
    .then(result =>{
      this.authService.logOut()
      this.router.navigate(['disabled']);
      
    })
  }

  editName(uid:string, newName:string):void{
    let user = this.authService.userInfo;

    this.afs.collection("/users")
    .doc(uid)
    .update({displayName: newName})
  }

}
