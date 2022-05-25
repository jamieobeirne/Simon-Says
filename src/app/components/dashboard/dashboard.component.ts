import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  userInfo: any = {}
  faPencil = faPencil;
  

  constructor(
    private afs: AngularFirestore, 
    public authService: AuthService,
    private router: Router,) {
  }
  
  ngOnInit() {
  }
  
  openVoiceTool() {
    this.authService.openVoiceTool();
  }

  disableConfirmation(uid:string){
    if (window.confirm("Do you want to disable your Simon Says account?")) {
      this.disableUser(uid);
    }
  }
 
  disableUser(uid:string):void{
    this.afs.collection("/users")
    .doc(uid)
    .update({isDisabled: true})
    .then(result =>{
      this.authService.logOut()
      this.router.navigate(['disabled']);
      
    })
  }
  
  goToEdit(){
    this.router.navigate(['edit']);
  }
   
  
}
