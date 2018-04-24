import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider, Credenciales } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  user: Credenciales = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth : AuthProvider,) {

    console.log( this.auth.usuario );

    this.user = this.auth.usuario;
  }

  cerrarSesion(){
    this.auth.logout();
  }

}
