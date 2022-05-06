import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  userInfo: any = {}
  faTrashCan = faTrashCan; //font awesome
  faPencil = faPencil;

  constructor(private afs: AngularFirestore, public authService: AuthService) {
  }
  
  ngOnInit() {
    //this.userInfo = this.authService.getUser();
    //console.log("Dashboard userInfo: ", this.userInfo);
  }
  
  openVoiceTool() {
    this.authService.openVoiceTool();
  }

}
