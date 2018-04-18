import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

import { Geolocation } from '@ionic-native/geolocation';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any; // Manejador del mapa.
  coords : any = { lat: 0, lng: 0 }

  constructor(
    public navCtrl: NavController,
    public auth : AuthProvider,
    public  platform: Platform,
    private geolocation: Geolocation,
    public modalCtrl : ModalController) {

      platform.ready().then(() => {
        // La plataforma esta lista y ya tenemos acceso a los plugins.
        this.obtenerPosicion();
      });

  }

  loadMap(){
   let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 17
    });

    // Colocamos el marcador
      let miMarker = new google.maps.Marker({
                icon : 'assets/imgs/car.png',
                map: this.map,
                position: this.coords
            });
  }



  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;

      this.loadMap();
    })
    .catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  nuevoCarro(){
   // aquí vamos a abrir el modal para añadir nuestro sitio.
   let mimodal = this.modalCtrl.create( 'ModalNuevoCarroPage',this.coords );
   mimodal.present();
  }

  cerrarSesion(){
      this.auth.logout();
  }

}
