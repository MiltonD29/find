import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class FirebaseDbProvider {

  constructor(
    public afDB: AngularFireDatabase,
    public auth: AuthProvider) {
  }

  guardaCarro(carro){
    if(!carro.id){
      carro.id  = Date.now();
    }
    return this.afDB.database.ref('carros/'+this.auth.getUser()+'/'+carro.id).set(carro)
  }

  getCarros(){
    return this.afDB.list('carros/'+this.auth.getUser()).valueChanges();
  }

  public borrarCarro(id){
    this.afDB.database.ref('carros/'+this.auth.getUser()+'/'+id).remove();
  }

}
