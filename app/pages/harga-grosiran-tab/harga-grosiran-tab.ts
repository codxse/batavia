import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController, Platform} from 'ionic-angular';
import {HargaGrosiranLinePage} from '../harga-grosiran-line/harga-grosiran-line';
import {HargaGrosiranHistogramPage} from '../harga-grosiran-histogram/harga-grosiran-histogram';

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
      <ion-tab tabTitle="Histogram" [root]="tabTwo"></ion-tab>
    </ion-tabs>
`})
export class HargaGrosiranTabPage {
  tabOne = HargaGrosiranLinePage;
  tabTwo = HargaGrosiranHistogramPage;
}
