import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  usuario : Credenciales = { };

  constructor(  private afAuth :  AngularFireAuth  ) {
    console.log('Hello AuthProvider Provider');
  }

  cargarUsuario(nombre:string,
                email:string,
                imagen:string,
                uid:string,
                provider:string){

    this.usuario.nombre = nombre;
    this.usuario.email = email;
    this.usuario.imagen = imagen;
    this.usuario.uid = uid;
    this.usuario.provider = provider;

  }

  // Registro de usuario
  registerUser(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password )
    .then((res)=>{
     // El usuario se ha creado correctamente.
    })
    .catch(err=>Promise.reject(err))
 }

 // Login de usuario
loginUser(email:string, password:string){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))
}

// Logout de usuario
logout(){
  this.afAuth.auth.signOut().then(()=>{
    // hemos salido
  })
}

// Devuelve la sesion
 get Session(){
  return this.afAuth.authState;
 }

 // Obtenemos el id de usuario.
 getUser(){
    return this.afAuth.auth.currentUser.uid;
 }

}

export interface Credenciales {
  nombre?:string;
  email?:string;
  imagen?:string;
  uid?:string;
  provider?:string;
}
