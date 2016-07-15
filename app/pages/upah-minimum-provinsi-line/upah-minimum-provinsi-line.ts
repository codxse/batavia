import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
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
  @ViewChild(nvD3) nvD3: nvD3;
  url = "https://api.kawaljakarta.org/v1/ump-inflasi/data&sortBy=tahun&order=asc";
  data;
  options;
  origData;
  dateArr;
  dari;
  sampai;
  keys;

  constructor(public http: Http, public nav: NavController, public dataService: DataService, public getOptions: Options) {
    console.log("on Constructor");
  }

  ngOnInit() {
    this.dataService.load(this.url)
      .then(data => {
        this.origData = data;
        this.keys = ['kenaikan_ump','inflasi','ump'];

        this.dateArr = this.genKeys('tahun', data);
        let last = this.dateArr.length-1;
        this.dari = this.dateArr[last-10];
        this.sampai = this.dateArr[last];

        let startTime = new Date(this.dari).getTime();
        let endTime = new Date(this.sampai).getTime();
        this.data = this.genData(data, this.keys, startTime, endTime);
        this.options = this.getOptions.loadOptionLinePlus();
      });
  }

  genData(data, arrKey, startTime, endTime) {
    let arrObj = [];
    for (let key of arrKey) {
      arrObj.push(this.genObject(data, key, startTime, endTime))
    }
    return arrObj;
  }

  genObject(data, key, startTime, endTime) {
    let values = [], l = data.length, i;
    for (i=0; i<l; i++) {
      let dataTime = new Date(data[i]['tahun']).getTime();
      if (data[i][key] && startTime <= dataTime && dataTime <=endTime )  {
        values.push({
          x: dataTime,
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

  genKeys(key, arrObj) {
    let flags = [], cats = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][key]]) continue;
      flags[arrObj[i][key]] = true;
      cats.push(arrObj[i][key]);
    }
    return cats;
  }

  onChangeStartYear() {
    let startDate = new Date(this.dari);
    let endDate = new Date(this.sampai);
    if (startDate > endDate) {
      let startYear = startDate.getFullYear();
      endDate.setFullYear(startYear);
      this.sampai = endDate.toISOString();
    }
    let startTime = startDate.getTime();
    let endTime = endDate.getTime();
    this.data = this.genData(this.origData, this.keys, startTime, endTime);
    this.nvD3.chart.update();
  }

  onChangeEndYear() {
    let startDate = new Date(this.dari);
    let endDate = new Date(this.sampai);
    if (endDate < startDate) {
      let endYear = endDate.getFullYear();
      startDate.setFullYear(endYear);
      this.dari = startDate.toISOString();
    }
    let startTime = startDate.getTime();
    let endTime = endDate.getTime();
    this.data = this.genData(this.origData, this.keys, startTime, endTime);
    this.nvD3.chart.update();
  }

}
