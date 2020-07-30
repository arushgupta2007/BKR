import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  ui: any;
  constructor() {

  }

  signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function () {
      return firebase.auth().getRedirectResult();
    }).then(function (result) {
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);      
    });
  }
}
