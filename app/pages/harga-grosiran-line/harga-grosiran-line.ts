import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';

/*
Generated class for the IkhtisarStatistikPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/harga-grosiran-line/harga-grosiran-line.html'
})

export class HargaGrosiranLinePage {
  @ViewChild(nvD3) nvD3: nvD3;
  private url: string;
  private options: any;
  private data: Array<any>;
  private startDate: string;
  private endDate: string;
  private dari;
  private sampai;
  private origData;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {

  }

  private ngOnInit(): void {
    this.startDate = '2015-03-01';
    this.endDate = '2015-11-18';
    this.getMinDateApi();
    this.getMinDateApi();
    this.url = "https://api.kawaljakarta.org/v1/perkembangan-harga-grosir/key=tanggal&gd=" + this.startDate + "&ld=" + this.endDate;
    this.loadData(this.url);
    this.options = this.getOptions.loadOptionLine("", "Rp", "%d %b %y", null, -12, 52);
  }

  private loadData(url): void {
    console.log('on loadData')
    this.dataService.load(url)
    .then(data => {
      // this.origData = data;
      // this.dateArr = this.generateKeys('tanggal', data);
      // this.yearArr = this.getYearArr(this.dateArr);
      // this.monthArr = this.getMonthArr(this.dateArr);
      // console.log(this.yearArr);
      // console.log(this.monthArr);
      // let dateArrLength = this.dateArr.length;
      // if (dateArrLength <= 5) {
      //   this.dari = this.dateArr[0];
      // } else {
      //   this.dari = this.dateArr[dateArrLength-6];
      // }
      // this.sampai = this.dateArr[dateArrLength-1];
      //
      let startTime = new Date(this.startDate).getTime();
      let endTime = new Date(this.endDate).getTime();

      this.data = this.generateData('komoditas', 'harga', data, 'tanggal', startTime, endTime);
      console.log(this.data);
      // this.data[0].key = "Ekspor Melalui Jakarta";
      // this.data[1].key = "Ekspor Produk Jakarta";
      // this.data[2].key = "Impor Melalui Jakarta";
    });
  }

  // private getYearArr(data): Array<any> {
  //   let temp = [];
  //   data.map(function(item) {
  //     temp.push(new Date(item).getFullYear());
  //   })
  //   return this.selectDistinct(temp);
  // }
  //
  // private getMonthArr(data): Array<any> {
  //   let temp = [];
  //   data.map(function(item) {
  //     temp.push(new Date(item).getMonth());
  //   })
  //   return this.selectDistinct(temp);
  // }

  // private getMonthName(monthNumber) {
  //   return this.monthNames[monthNumber];
  // }

  private selectDistinct(array): Array<any> {
    let flags = [], output = [], l = array.length, i;
    for( i=0; i<l; i++) {
      if (flags[array[i]]) continue;
      flags[array[i]] = true;
      output.push(array[i]);
    }
    return output.sort();
  }

  private getMinDateApi(): void {
    let url = 'https://api.kawaljakarta.org/v1/perkembangan-harga-grosir/key=tanggal&get=min';
    this.dataService.load(url)
    .then(data => {
      this.startDate = data['tanggal'];
      console.log(this.startDate);
    });
  }

  private getMaxDateApi(): void {
    let url = 'https://api.kawaljakarta.org/v1/perkembangan-harga-grosir/key=tanggal&get=max';
    this.dataService.load(url)
    .then(data => {
      this.endDate = data['tanggal'];
      console.log(this.endDate);
    });
  }

  private generateData(keyCat, keyValue, arrObj, dateKey, startTime, endTime): Array<any> {
    let categories = this.generateKeys(keyCat, arrObj);
    let parent = this;
    return categories.map(function(item) {
      return {
        key: item,
        values: parent.generateVals(keyCat, item, keyValue, arrObj, dateKey, startTime, endTime)
      }
    });
  }

  private generateKeys(key, arrObj): Array<any> {
    let flags = [], cats = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][key]]) continue;
      flags[arrObj[i][key]] = true;
      cats.push(arrObj[i][key]);
    }
    return cats;
  }

  private generateVals(keyCat, valCat, keyValue, arrObj, dateKey, startTime, endTime): Array<any> {
    let values = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      let arrObjTime = new Date(arrObj[i][dateKey]).getTime();
      // let startDateTime = new Date(startDate).getTime();
      // let endDateTime = new Date(endDate).getTime();
      if ((arrObj[i][keyCat] == valCat) && (startTime <= arrObjTime) && (arrObjTime <= endTime)) {
        values.push(
          {
            x: arrObjTime,
            y: Math.round(arrObj[i][keyValue])
          }
        )
      }
    }
    return values;
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
    this.data = this.generateData('atribut', 'juta_usd', this.origData, 'tahun', startTime, endTime);
    this.data[0].key = "Ekspor Melalui Jakarta";
    this.data[1].key = "Ekspor Produk Jakarta";
    this.data[2].key = "Impor Melalui Jakarta";
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
    this.data = this.generateData('atribut', 'juta_usd', this.origData, 'tahun', startTime, endTime);
    this.data[0].key = "Ekspor Melalui Jakarta";
    this.data[1].key = "Ekspor Produk Jakarta";
    this.data[2].key = "Impor Melalui Jakarta";
    this.nvD3.chart.update();
  }

}
