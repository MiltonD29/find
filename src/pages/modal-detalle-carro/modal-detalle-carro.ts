import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { DbProvider } from '../../providers/db/db';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';


@IonicPage()
@Component({
  selector: 'page-modal-detalle-carro',
  templateUrl: 'modal-detalle-carro.html',
})
export class ModalDetalleCarroPage {

  carro: any;
  edit : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl : ViewController,
    private launchNavigator : LaunchNavigator,
    private camera: Camera,
    private dbFirebase :FirebaseDbProvider) {

      this.carro = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleCarroPage');
  }

  comoLlegar(){
    let destino = this.carro.lat+', '+this.carro.lng;
    this.launchNavigator.navigate(destino)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  editar(){
   this.edit = true;
  }

  sacarFoto(){
    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
    }


    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.carro.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  guardarCambios(){

     let carro = {
      id : this.carro.id,
      lat: this.carro.lat,
      lng: this.carro.lng ,
      address: this.carro.address,
      description: this.carro.description,
      foto: this.carro.foto
    }

    this.dbFirebase.guardaCarro(carro).then(res=>{
        console.log('Carro modificado en firebase');
        this.cerrarModal();
    })
   }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

}
