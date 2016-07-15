import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController, Platform} from 'ionic-angular';
import {PendapatanPerkapitaLinePage} from '../pendapatan-perkapita-line/pendapatan-perkapita-line';
import {PendapatanPerkapitaScatterPage} from '../pendapatan-perkapita-scatter/pendapatan-perkapita-scatter';

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
      <ion-tab tabTitle="Line" [root]="tabOne"></ion-tab>
      <ion-tab tabTitle="Scatter" [root]="tabTwo"></ion-tab>
    </ion-tabs>
`})
export class PendapatanPerkapitaTabPage {
  tabOne = PendapatanPerkapitaLinePage;
  tabTwo = PendapatanPerkapitaScatterPage;
}
