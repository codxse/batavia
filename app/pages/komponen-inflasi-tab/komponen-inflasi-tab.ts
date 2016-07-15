import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController, Platform} from 'ionic-angular';
import {KomponenInflasiPiePage} from '../komponen-inflasi-pie/komponen-inflasi-pie';
import {KomponenInflasiBarPage} from '../komponen-inflasi-bar/komponen-inflasi-bar';

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Tabs</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
    </ion-content>
`})
class TabTextPage {
  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
}

@Component({
  template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Pie" [root]="tabOne"></ion-tab>
      <ion-tab tabTitle="Bar" [root]="tabTwo"></ion-tab>
    </ion-tabs>
`})
export class KomponenInflasiTabPage {
  tabOne = KomponenInflasiPiePage;
  tabTwo = KomponenInflasiBarPage;
}
