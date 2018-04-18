import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

declare var google: any;

/**
 * Generated class for the ModalNuevoCarroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-nuevo-carro',
  templateUrl: 'modal-nuevo-carro.html',
})
export class ModalNuevoCarroPage {

  coords : any = { lat: 0, lng: 0 }
  address: string;
  description: string = '';
  foto: any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl : ViewController,
    private camera: Camera ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNuevoCarroPage');
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');
    this.getAddress(this.coords).then(results=> {
        this.address = results[0]['formatted_address'];
      }, errStatus => {
          // Aquí iría el código para manejar el error
      });
  }

  getAddress(coords):any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode({'location': coords} , function (results, status) { // llamado asincronamente
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
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
        this.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

}
