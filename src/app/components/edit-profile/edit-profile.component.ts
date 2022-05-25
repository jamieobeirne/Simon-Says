import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getAuth, updateEmail } from 'firebase/auth';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private afs: AngularFirestore, 
    public authService: AuthService,
    _auth = getAuth()
  ) { }

  ngOnInit(): void {
  }

  saveChanges(_auth: { user: User; }, uid:string, newName:string, newEmail:string):void{
    let user = this.authService.userInfo;
    this.afs.collection("/users")
    .doc(uid)
    .update({displayName: newName, email: newEmail})
    .then(() =>{
      updateEmail(_auth.user, newEmail!);
    })  
  }
}
