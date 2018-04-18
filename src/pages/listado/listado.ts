import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { DbProvider } from '../../providers/db/db';

import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {

  carros: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db : DbProvider,
    public modalCtrl : ModalController,
    public alertCtrl : AlertController,
    public dbFirebase :FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoPage');
  }

  ionViewDidEnter(){
    this.dbFirebase.getCarros().subscribe(carros=>{
     this.carros = carros;
    })
   }

   muestraCarro(carro){
      let modalCarro= this.modalCtrl.create( 'ModalDetalleCarroPage', carro );
      modalCarro.present();
   }

   borrarCarro(id){
    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar este carro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Sí',
          handler: () => {
            // AquÍ borramos el sitio en firebase
            this.dbFirebase.borrarCarro(id);
           }
        }
      ]
    });

    alert.present();

 }

}
