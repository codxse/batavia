import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

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

  
}
