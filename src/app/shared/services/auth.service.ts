import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { User } from '../services/user';
import { switchMap} from "rxjs/operators"
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import {AppComponent} from "../../app.component"
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth } from 'firebase/auth';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  userData: Observable<User | undefined | null>; 
  userInfo: any = {};
  authBehaviorSubject = new BehaviorSubject({isLoggedIn:false,isAdmin:false, isUser:false, isDisabled:false});

  //private dbPath: string = "/users";

    constructor(
      private afAuth: AngularFireAuth, 
      private afs: AngularFirestore,
      private router: Router,
      private db: AngularFireDatabase,
      //private db: AngularFirestore,
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
          this.authBehaviorSubject.next({isLoggedIn:true, 
            isAdmin:this.userInfo.roles.admin, isUser:this.userInfo.roles.user, isDisabled:this.userInfo.isDisabled});});
          this.router.navigate(['dashboard']);
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
      emailVerified: true,
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
        
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
          //this.SendVerificationMail();
  
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

  canView(): boolean{
    const allowed = ['admin'] 
    let user = this.getUser();
    return this.checkAuthorization(user, allowed)
  }

  getUser(): User{
    let data = localStorage.getItem("user") || "";
    let dataObject = JSON.parse(data);
    return dataObject;
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (let role of allowedRoles) {
      if (role in user.roles) {
        return true
      }
    }
    return false
  }

  
  openVoiceTool() {
    this.router.navigate(['voice-tool']);
  }

   // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
    /*
    return user !== null && user.emailVerified !== false ? true : false;
    */
  }
    
  SendVerificationMail() {
    /*return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });*/
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





 