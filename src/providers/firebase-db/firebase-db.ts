import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class FirebaseDbProvider {

  constructor(
    public afDB: AngularFireDatabase,
    public auth: AuthProvider) {
  }

  guardaUsuario(carro){
     carro.id  = Date.now();
     return this.afDB.database.ref('carros/'+this.auth.getUser()+'/'+carro.id).set(carro)
  }

}
