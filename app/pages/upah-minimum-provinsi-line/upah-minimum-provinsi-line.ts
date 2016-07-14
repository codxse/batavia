import {Component, OnInit, Injectable} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
import {Http} from '@angular/http';
declare let d3: any;

/*
  Generated class for the UpahMinimumProvinsiLinePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/upah-minimum-provinsi-line/upah-minimum-provinsi-line.html',
})
export class UpahMinimumProvinsiLinePage {
  url = "https://api.kawaljakarta.org/v1/ump-inflasi/data&sortBy=tahun&order=asc";
  data;
  options;
  dateArr;

  constructor(public http: Http, public nav: NavController, public dataService: DataService, public getOptions: Options) {
    console.log("on Constructor");
  }

  ngOnInit() {
    console.log("onInit");
    this.dataService.load(this.url)
      .then(data => {
        let keys = ['kenaikan_ump','inflasi','ump'];
        this.data = this.genData(data, 'tahun', keys, this.genObject);
        this.options = this.getOptions.loadOptionLinePlus();
        this.dateArr = this.genKeys('tahun', data);
        console.log(this.data);
      });
  }

  genObject(data, key, dateKey) {
    let values = [], l = data.length, i;
    for (i=0; i<l; i++) {
      if (data[i][key]) {
        values.push({
          x: new Date(data[i][dateKey]).getTime(),
          y: data[i][key]
        })
      }
    }
    return {
      key: key,
      bar: function() {
        if (key == 'ump') {
          return true;
        }
        return false
      }(),
      values: values
    }
  }

  genData(data, dateKey, arrKey, genObject) {
    let arrObj = [];
    for (let key of arrKey) {
      arrObj.push(genObject(data, key, 'tahun'))
    }
    return arrObj;
  }

  genKeys(key, arrObj) {
    let flags = [], cats = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][key]]) continue;
      flags[arrObj[i][key]] = true;
      cats.push(arrObj[i][key]);
    }
    return cats;
  }

}
