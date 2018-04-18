import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNuevoCarroPage } from './modal-nuevo-carro';

@NgModule({
  declarations: [
    ModalNuevoCarroPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNuevoCarroPage),
  ],
})
export class ModalNuevoCarroPageModule {}
