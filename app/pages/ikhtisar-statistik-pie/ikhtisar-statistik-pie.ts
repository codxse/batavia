import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
declare let d3: any;

/*
  Generated class for the IkhtisarStatistikPiePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/ikhtisar-statistik-pie/ikhtisar-statistik-pie.html',
})
export class IkhtisarStatistikPiePage {
  url = "https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja/key=tahun&gd='2008'&ld='2014'";
  options;
  data;
  arrObj;
  
  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {

  }

  ngOninit(): void {

  }
}
