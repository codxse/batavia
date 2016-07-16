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
  private dateArr: Array<any>;
  private origData;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {

  }

  private ngOnInit(): void {
    this.url = "https://api.kawaljakarta.org/v1/perkembangan-harga-grosir/";
    this.loadData(this.url);
    this.options = this.getOptions.loadOptionLine("", "Rp", "%d %b %y", null, -12, 52);
  }

  private loadData(url): void {
    this.dataService.load(url)
    .then(data => {
      this.origData = data;

      // sort data dari api berdasarkan tanggal
      this.origData.sort(function(a,b) {
        let dateA = new Date(a.tanggal).getTime();
        let dateB = new Date(b.tanggal).getTime();
        return dateA-dateB;
      });
      this.dateArr = this.generateKeys('tanggal', this.origData);
      // this.yearArr = this.getYearArr(this.dateArr);
      // this.monthArr = this.getMonthArr(this.dateArr);
      // console.log(this.monthArr);
      // let dateArrLength = this.dateArr.length;
      // if (dateArrLength <= 5) {
      //   this.dari = this.dateArr[0];
      // } else {
      //   this.dari = this.dateArr[dateArrLength-6];
      // }
      // this.sampai = this.dateArr[dateArrLength-1];
      //
      this.startDate = this.dateArr[0];
      this.endDate = this.dateArr[this.dateArr.length-1];
      let startTime = new Date(this.startDate).getTime();
      let endTime = new Date(this.endDate).getTime();

      this.data = this.generateData('komoditas', 'harga', this.origData, 'tanggal', startTime, endTime);
      console.log(this.data);
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

  onChange(ngModel) {
    if (ngModel == 'start') {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.endDate = this.startDate;
      }
    } else {
      if (new Date(this.endDate) < new Date(this.startDate)) {
        this.startDate = this.endDate;
      }
    }

    let startTime = new Date(this.startDate).getTime();
    let endTime = new Date(this.endDate).getTime();

    this.data = this.generateData('komoditas', 'harga', this.origData, 'tanggal', startTime, endTime);
  }

}
