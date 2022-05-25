import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private afs: AngularFirestore, 
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  saveChanges(uid:string, newName:string):void{
    let user = this.authService.userInfo;
    this.afs.collection("/users")
    .doc(uid)
    .update({displayName: newName})
  }
}
