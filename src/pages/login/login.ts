import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

import { HomePage } from '../../pages/home/home';
import { RegisterPage } from "../../pages/register/register";

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    email : '',
    password : ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth : AuthProvider,
    public alertCtrl : AlertController,
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform) {
  }

  signInWithFacebook() {

    if (this.platform.is('cordova')) {
      //celular
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then( user => {

          console.log(user);

          this.auth.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL + "?type=large",
            user.uid,
            'facebook'
          );

          this.navCtrl.setRoot(HomePage);

        }).catch(e => console.log("Error con el login" + JSON.stringify(e)));
      })

    } else {
      //escritorio
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {

          let user = res.user;

          this.auth.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL + "?type=large",
            user.uid,
            'facebook'
          );

          this.navCtrl.setRoot(HomePage);
        });
    }
  }

  signin(){
    this.auth.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })

  }

  login(){
    this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
      }
    )
     .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }

  navRegister(){
    this.navCtrl.setRoot(RegisterPage);
  }

}
