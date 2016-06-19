import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MakroMenuPage} from '../makro-menu/makro-menu';
import {MikroMenuPage} from '../mikro-menu/mikro-menu';

/*
  Generated class for the MainPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/main/main.html',
})

export class MainPage {

  constructor(public nav: NavController) {
    this.nav = nav;
  }

  goToMakroMenuPage() {
    this.nav.push(MakroMenuPage);
  }

  goToMikroMenuPage() {
    this.nav.push(MikroMenuPage);
  }

}
