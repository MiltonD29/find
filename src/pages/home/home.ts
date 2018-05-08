import { NavController, Platform, ModalController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';

import { AuthProvider } from '../../providers/auth/auth';

import { Geolocation } from '@ionic-native/geolocation';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;


  map: any; // Manejador del mapa.
  coords : any = { lat: 0, lng: 0 }
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;

  constructor(
    public navCtrl: NavController,
    public auth : AuthProvider,
    public  platform: Platform,
    private geolocation: Geolocation,
    public modalCtrl : ModalController) {

      platform.ready().then(() => {
        // La plataforma esta lista y ya tenemos acceso a los plugins.
        // this.obtenerPosicion();
        this.initMap();
      });

  }

  // loadMap(){
  //  let mapContainer = document.getElementById('map');
  //   this.map = new google.maps.Map(mapContainer, {
  //     center: this.coords,
  //     zoom: 17
  //   });
  //
  //   // Colocamos el marcador
  //     let miMarker = new google.maps.Marker({
  //               icon : 'assets/imgs/car.png',
  //               map: this.map,
  //               position: this.coords
  //           });
  // }

  initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      this.coords.lat = data.coords.latitude;
      this.coords.lng = data.coords.longitude;
      let image = 'assets/imgs/car.png';
      this.addMarker(updatelocation,image);
    });
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
  }



  // obtenerPosicion():any{
  //   this.geolocation.getCurrentPosition().then(res => {
  //     // this.coords.lat = res.coords.latitude;
  //     // this.coords.lng = res.coords.longitude;
  //     let mylocation = new google.maps.LatLng(res.coords.latitude,res.coords.longitude);
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //       zoom: 15,
  //       center: mylocation
  //     });
  //
  //     this.loadMap();
  //   })
  //   .catch(
  //     (error)=>{
  //       console.log(error);
  //     }
  //   );
  //
  // }

  nuevoCarro(){
   // aquí vamos a abrir el modal para añadir nuestro sitio.
   let mimodal = this.modalCtrl.create( 'ModalNuevoCarroPage',this.coords );
   mimodal.present();
  }



}
