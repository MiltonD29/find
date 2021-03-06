import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


import { AuthProvider } from '../providers/auth/auth';
import { DbProvider } from '../providers/db/db';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AuthProvider,
    public db: DbProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.auth.Session.subscribe(session=>{
        if(session){
            this.rootPage = TabsPage;
        }
          else{
            this.rootPage = LoginPage;
          }
      });
      statusBar.styleDefault();
      splashScreen.hide();
      this.db.openDb()
       .then(() => this.db.createTableCarros())
    });
  }
}
