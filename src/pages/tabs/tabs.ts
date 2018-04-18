import { Component } from '@angular/core';

import { IonicPage } from 'ionic-angular'

import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;

  constructor() {

  }
}
