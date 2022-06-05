import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../services/user';
import { switchMap} from "rxjs/operators"
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import {AppComponent} from "../../app.component"
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';




@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  userData: Observable<User | undefined | null>; 
  userInfo: any = {};
  authBehaviorSubject = new BehaviorSubject({isLoggedIn:false,isAdmin:false, isUser:false, isDisabled:false});


  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private router: Router,
    private db: AngularFireDatabase,
    ) {  
    

    this.userData = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
            return of(null);
        }  
      })
    )

    this.userData.subscribe(data => {
      if (data) {
          localStorage.setItem('user', JSON.stringify(data));
      } else {
          localStorage.setItem('user', 'null');
      } 
    })
  }


  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
        .then( (result) => {
          this.userData.subscribe(data => {
          this.userInfo = data;

          if (this.userInfo.isDisabled){
  
            this.router.navigate(['disabled']);
            return;
          } 
          this.authBehaviorSubject.next({
            isLoggedIn:true, 
            isAdmin:this.userInfo.roles.admin, 
            isUser:this.userInfo.roles.user, 
            isDisabled:this.userInfo.isDisabled});
            this.router.navigate(['dashboard']);
          });
          
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  SetUserData(user: any, displayName: string) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      roles:  {        
        user: true,
        },
      isDisabled: false
    
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  

  register(email: string, password: string, displayName:string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user, displayName);
          this.router.navigate(['login']);
        })
        
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }
  

  logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.authBehaviorSubject.next({
        isLoggedIn:false,
        isAdmin:false,
        isUser:false, 
        isDisabled:false});
    });
  }


  getUser(): User{
    let data = localStorage.getItem("user") || "";
    let dataObject = JSON.parse(data);
    return dataObject;
  }
   

  openVoiceTool() {
    this.router.navigate(['voice-tool']);
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  //to display users for the admin list page
  async getListOfUsers():Promise<User[]>{
    let info = await this.afs.collection("/users").get().toPromise()
      .then(result=>{
        return result.docs.map(item=>item.data() as User)
      });
    return info;
  }

  openLoginPage(){
    this.router.navigate(['register']);
  }

} 





 