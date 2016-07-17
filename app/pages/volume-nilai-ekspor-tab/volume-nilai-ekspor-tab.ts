import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController, Platform} from 'ionic-angular';
import {VolumeNilaiEksporPiePage} from '../volume-nilai-ekspor-pie/volume-nilai-ekspor-pie';
import {VolumeNilaiEksporScatterPage} from '../volume-nilai-ekspor-scatter/volume-nilai-ekspor-scatter';
import {VolumeNilaiEksporDataPage} from '../volume-nilai-ekspor-data/volume-nilai-ekspor-data';

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
      <ion-tab tabTitle="Scatter" [root]="tabTwo"></ion-tab>
      <ion-tab tabTitle="Data" [root]="tabThree"></ion-tab>
    </ion-tabs>
`})
export class VolumeNilaiEksporTabPage {
  tabOne = VolumeNilaiEksporPiePage;
  tabTwo = VolumeNilaiEksporScatterPage;
  tabThree = VolumeNilaiEksporDataPage;
}
