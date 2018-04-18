import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetalleCarroPage } from './modal-detalle-carro';

@NgModule({
  declarations: [
    ModalDetalleCarroPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetalleCarroPage),
  ],
})
export class ModalDetalleCarroPageModule {}
