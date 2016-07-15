import {Component, OnInit, Injectable} from '@angular/core';
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
  url = "https://api.kawaljakarta.org/v1/pertumbuhan-ekonomi/data&sortBy=tahun&order=asc";
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
        let keys = ['persen_tumbuh_jakarta','persen_tumbuh_nasional'];
        this.data = this.genData(data, 'tahun', keys, this.genObject);
        this.data[0].key = "Jakarta";
        this.data[1].key = "Nasional";
        this.options = this.getOptions.loadOptionLine("","%",null,-22, 40);
        this.dateArr = this.genKeys('tahun', data);
        console.log(this.data);
        // console.log(this.dateArr);
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
