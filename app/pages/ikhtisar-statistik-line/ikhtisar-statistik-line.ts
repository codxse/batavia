import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
declare let d3: any;

/*
Generated class for the IkhtisarStatistikPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/ikhtisar-statistik-line/ikhtisar-statistik-line.html'
})

export class IkhtisarStatistikLinePage{
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);
  @ViewChild(nvD3) nvD3: nvD3;
  url = "https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja/key=tahun&gd='2008'&ld='2014'";
  options;
  data;
  origData;
  arrObj;
  dateArr;
  dari: Date;
  sampai: Date;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {
    this.arrObj = [];
    this.dataService.load(this.url)
    .then(data => {
      function genKeys(key, arrObj) {
        let flags = [], cats = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (flags[arrObj[i][key]]) continue;
          flags[arrObj[i][key]] = true;
          cats.push(arrObj[i][key]);
        }
        return cats;
      }

      function genVals(keyCat, valCat, keyValue, arrObj, dateKey) {
        let values = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (arrObj[i][keyCat] == valCat) {
            values.push(
              {
                x: new Date(arrObj[i][dateKey]).getTime(),
                y: arrObj[i][keyValue]
              }
            )
          }
        }
        return values;
      }

      function genData(keyCat, keyValue, arrObj, dateKey) {
        let categories = genKeys(keyCat, arrObj)
        return categories.map(function(item) {
          return {
            key: item,
            values: genVals(keyCat, item, keyValue, arrObj, dateKey)
          }
        });
      }

      this.origData = data;
      this.data = genData('rincian', 'jumlah', data, 'tahun');
      this.dateArr = genKeys('tahun', data);
      console.log(this.origData);
    });
  }

  generateData(keyCat, keyValue, arrObj, dateKey, startDate, endDate) {
    let categories = this.generateKeys(keyCat, arrObj)
    let parent = this;
    return categories.map(function(item) {
      return {
        key: item,
        values: parent.generateVals(keyCat, item, keyValue, arrObj, dateKey, startDate, endDate)
      }
    });
  }

  generateKeys(key, arrObj) {
    let flags = [], cats = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][key]]) continue;
      flags[arrObj[i][key]] = true;
      cats.push(arrObj[i][key]);
    }
    return cats;
  }

  generateVals(keyCat, valCat, keyValue, arrObj, dateKey, startDate, endDate) {
    let values = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      let arrObjTime = new Date(arrObj[i][dateKey]).getTime();
      let startDateTime = new Date(startDate).getTime();
      let endDateTime = new Date(endDate).getTime();
      if ((arrObj[i][keyCat] == valCat) && (startDateTime <= arrObjTime) && (arrObjTime <= endDateTime)) {
        values.push(
          {
            x: arrObjTime,
            y: arrObj[i][keyValue]
          }
        )
      }
    }
    return values;
  }

  ngOnInit() {
    this.options = this.getOptions.loadOptionLine("Tahun", "Jiwa");
  }

  onChange() {
    this.data = this.generateData('rincian', 'jumlah', this.origData, 'tahun', this.dari, this.sampai);
    this.nvD3.chart.update();
  }

}
