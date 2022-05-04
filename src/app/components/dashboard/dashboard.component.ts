import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  //postRef : any;
  //post$ : any;
 
  constructor(private afs: AngularFirestore, public authService: AuthService) { 
  }

  ngOnInit() {
    //this.postRef = this.afs.doc('posts/myTestPost')
    //this.post$ = this.postRef.valueChanges()
  }
  
  openVoiceTool() {
    this.authService.openVoiceTool();
  }
  
  /*
  editPost() {
    this.postRef.update({ title: 'Edited Title!'})
  }

  deletePost() {
    this.postRef.delete()
  }
  */
  
  

}
