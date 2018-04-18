import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { LoginPageModule } from '../pages/login/login.module';
import { ModalNuevoCarroPageModule } from '../pages/modal-nuevo-carro/modal-nuevo-carro.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';

export const firebaseConfig = {
  apiKey: "AIzaSyABqftd0soQtEvySMtk1tjnL47GMKt3_EU",
  authDomain: "login-89014.firebaseapp.com",
  databaseURL: "https://login-89014.firebaseio.com",
  projectId: "login-89014",
  storageBucket: "login-89014.appspot.com",
  messagingSenderId: "43384512077"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
    // LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule,
    ModalNuevoCarroPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseDbProvider,
    Geolocation,
    Camera
  ]
})
export class AppModule {}
