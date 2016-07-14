import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController, Platform} from 'ionic-angular';
// import {IkhtisarStatistikPage} from '../ikhtisar-statistik/ikhtisar-statistik';
import {IkhtisarStatistikLinePage} from '../ikhtisar-statistik-line/ikhtisar-statistik-line';
import {IkhtisarStatistikPiePage} from '../ikhtisar-statistik-pie/ikhtisar-statistik-pie';

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
      <ion-tab tabTitle="Pie" [root]="tabTwo"></ion-tab>
    </ion-tabs>
`})
export class IkhtisarStatistikTabPage {
  tabOne = IkhtisarStatistikLinePage;
  tabTwo = IkhtisarStatistikPiePage;
}
