import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
import {Http} from '@angular/http';
declare let d3: any;

/*
  Generated class for the PertumbuhanEkonomiLinePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/pertumbuhan-ekonomi-line/pertumbuhan-ekonomi-line.html',
})
export class PertumbuhanEkonomiLinePage {
  @ViewChild(nvD3) nvD3: nvD3;
  url = "https://api.kawaljakarta.org/v1/pertumbuhan-ekonomi/data&sortBy=tahun&order=asc";
  data;
  options;
  origData;
  dateArr;
  dari;
  keys;
  sampai;

  constructor(public http: Http, public nav: NavController, public dataService: DataService, public getOptions: Options) {
    console.log("on Constructor");
  }

  ngOnInit() {
    this.dataService.load(this.url)
      .then(data => {
        this.origData = data;
        this.keys = ['persen_tumbuh_jakarta','persen_tumbuh_nasional'];
        this.dateArr = this.genKeys('tahun', data);
        this.dari = this.dateArr[0];
        this.sampai = this.dateArr[this.dateArr.length-1];
        let startTime = new Date(this.dari).getTime();
        let endTime = new Date(this.sampai).getTime();
        this.data = this.genData(data, 'tahun', this.keys, this.genObject, startTime, endTime);
        this.data[0].key = "Jakarta";
        this.data[1].key = "Nasional";
        this.options = this.getOptions.loadOptionLine("","%",null,-22, 40);
        console.log(data);
        console.log(this.data);
      });
    }

    genObject(data, key, dateKey, startTime, endTime) {
      let values = [], l = data.length, i;
      for (i=0; i<l; i++) {
        let objTime = new Date(data[i][dateKey]).getTime();
        if (data[i][key] && startTime <= objTime && objTime <= endTime) {
          values.push({
            x: objTime,
            y: data[i][key]
          })
        }
      }
      return {
        key: key,
        values: values
      }
    }

    genData(data, dateKey, arrKey, genObject, startTime, endTime) {
      let arrObj = [];
      for (let key of arrKey) {
        arrObj.push(genObject(data, key, 'tahun', startTime, endTime))
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
      this.data = this.genData(this.origData, 'tahun', this.keys, this.genObject, startTime, endTime);
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
      this.data = this.genData(this.origData, 'tahun', this.keys, this.genObject, startTime, endTime);
      this.nvD3.chart.update();
    }

}
