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
  dari = '2008-01-01T00:00:00.000Z';
  sampai = '2014-01-01T00:00:00.000Z';

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {
    this.arrObj = [];
    this.dataService.load(this.url)
    .then(data => {
      this.origData = data;
      let initStartYear = new Date(this.dari).getTime();
      let initEndYear = new Date(this.sampai).getTime();
      this.data = this.generateData('rincian', 'jumlah', data, 'tahun', initStartYear, initEndYear);
      this.dateArr = this.generateKeys('tahun', data);
    });
  }

  generateData(keyCat, keyValue, arrObj, dateKey, startTime, endTime) {
    let categories = this.generateKeys(keyCat, arrObj)
    let parent = this;
    return categories.map(function(item) {
      return {
        key: item,
        values: parent.generateVals(keyCat, item, keyValue, arrObj, dateKey, startTime, endTime)
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

  generateVals(keyCat, valCat, keyValue, arrObj, dateKey, startTime, endTime) {
    let values = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      let arrObjTime = new Date(arrObj[i][dateKey]).getTime();
      // let startDateTime = new Date(startDate).getTime();
      // let endDateTime = new Date(endDate).getTime();
      if ((arrObj[i][keyCat] == valCat) && (startTime <= arrObjTime) && (arrObjTime <= endTime)) {
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
    // console.log('ong ngOnInit');
    this.options = this.getOptions.loadOptionLine("", "Jiwa","%Y", null, -5, 55);
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
    this.data = this.generateData('rincian', 'jumlah', this.origData, 'tahun', startTime, endTime);
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
    this.data = this.generateData('rincian', 'jumlah', this.origData, 'tahun', startTime, endTime);
    this.nvD3.chart.update();
  }

}
