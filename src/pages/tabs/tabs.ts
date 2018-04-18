import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ListadoPage } from '../listado/listado';
import { PerfilPage } from '../perfil/perfil';
import { InfoPage } from '../info/info';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ListadoPage;
  tab3Root = PerfilPage;
  tab4Root = InfoPage;

  constructor() {

  }
}
