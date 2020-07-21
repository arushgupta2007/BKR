import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  joinWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    this.afAuth.signInWithPopup(provider).then((cred) => {
      if (cred.additionalUserInfo?.isNewUser) {
        console.log(cred.user?.uid);
        // do something if new user
      } else {
        // do something if old user
        console.log(cred.user?.uid);
      }
    }).then(() => {
      this.router.navigate(["/"]);
    });
  }

  returnAuthState() {
    return this.afAuth.authState;
  }
}
