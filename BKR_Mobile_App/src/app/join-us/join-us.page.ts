import { Component, OnInit } from '@angular/core';
import { OauthService } from '../services/oauth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.page.html',
  styleUrls: ['./join-us.page.scss'],
})
export class JoinUsPage implements OnInit {
  user;
  displayName;
  constructor(private oauthService: OauthService, private router: Router, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;        
        return;
      }
      this.displayName = user.displayName;      
    });
  }

  ngOnInit() {
  }

  signInWithGoogle() {
    // this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    // .then(res => console.log(res))
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    .then(() => {
      return this.afAuth.getRedirectResult().then(result => {
        // let token = result.credential.
        this.user = result.user;
        console.log("Yeah!");
        console.log(this.user);        
      })
    }).catch((err) => {
      console.error(err);
    })
  }

  signOut() {
    this.afAuth.signOut();
  }
}
