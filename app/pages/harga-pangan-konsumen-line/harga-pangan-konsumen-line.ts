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
  templateUrl: 'build/pages/harga-pangan-konsumen-line/harga-pangan-konsumen-line.html'
})

export class HargaPanganKonsumenLinePage {
  @ViewChild(nvD3) nvD3: nvD3;
  private options: any;
  private data: Array<any>;
  private dateArr: Array<string>;
  private yearArr: Array<Number>;
  private monthArr: Array<Number>;
  private monthNames: Array<string>;
  private wilayahArr: Array<string>;
  private startMonth;
  private startYear;
  private endMonth;
  private endYear;
  private region;
  private origData;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {

  }

  private ngOnInit(): void {
    this.wilayahArr = ["Jakarta Utara", "Jakarta Barat", "Jakarta Pusat", "Jakarta Timur", "Jakarta Selatan"];
    this.monthArr = [0,1,2,3,4,5,6,7,8,9,10,11];
    this.monthNames = ["Januari", "Februari", "Maret", "April",
                      "Mei", "Juni", "Juli", "Agustus", "September",
                      "Oktober", "November", "Desember"];
    this.region = this.wilayahArr[0];
    this.loadData(this.region);
    this.options = this.getOptions.loadOptionLine("", "Rp", "%b %Y", null, -12, 52);
  }

  private loadData(region): void {
    let url = "https://api.kawaljakarta.org/v1/harga-pangan-tingkat-konsumen/?wilayah=" + region;
    this.dataService.load(url)
    .then(data => {
      this.origData = data;
      this.dateArr = this.generateKeys('tanggal', data);
      this.yearArr = this.getYearArr(this.dateArr);

      // Jika data yang tersedia hanya satu tahun, pilihan bulan yang tersedia sesuai dengan jumlah bulan yang ada pada data
      if (this.yearArr.length == 1) this.monthArr = this.getMonthArr(this.dateArr);

      let dateArrLastIndex = this.dateArr.length-1;
      let endLatestDate = new Date(this.dateArr[dateArrLastIndex]);

      if (endLatestDate.getMonth() < 5) this.startMonth = endLatestDate.getMonth()+7;
      else this.startMonth = endLatestDate.getMonth()-5;
      this.startYear = endLatestDate.getFullYear();
      this.endMonth = endLatestDate.getMonth();
      this.endYear = endLatestDate.getFullYear();

      let startLatestDate = new Date(this.startYear,this.startMonth);

      let startTime = startLatestDate.getTime();
      let endTime = endLatestDate.getTime();

      this.data = this.generateData('komoditi', 'harga', data, 'tanggal', startTime, endTime);
    });
  }

  private getYearArr(data): Array<any> {
    let temp = [];
    data.map(function(item) {
      temp.push(new Date(item).getFullYear());
    })
    return this.selectDistinct(temp);
  }

  private getMonthArr(data): Array<any> {
    let temp = [];
    data.map(function(item) {
      temp.push(new Date(item).getMonth());
    })
    return this.selectDistinct(temp);
  }

  private getMonthName(monthNumber) {
    return this.monthNames[monthNumber];
  }

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
    let url = 'https://api.kawaljakarta.org/v1/harga-pangan-tingkat-konsumen/key=tanggal&get=min';
    this.dataService.load(url)
    .then(data => {
      console.log(data);
    });
  }

  private getMaxDateApi(): void {
    let url = 'https://api.kawaljakarta.org/v1/harga-pangan-tingkat-konsumen/key=tanggal&get=max';
    this.dataService.load(url)
    .then(data => {
      console.log(data);
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

  onChangeDate(ngModel) {
    let startDate = new Date(this.startYear, this.startMonth);
    let endDate = new Date(this.endYear, this.endMonth);

    if (ngModel == 'start') {
      if (startDate > endDate) {
        endDate = startDate;
        this.endMonth = this.startMonth;
        this.endYear = this.startYear;
      }
    } else {
      if (endDate < startDate) {
        startDate = endDate;
        this.startMonth = this.endMonth;
        this.startYear = this.endYear;
      }
    }

    let startTime = startDate.getTime();
    let endTime = endDate.getTime();

    this.data = this.generateData('komoditi', 'harga', this.origData, 'tanggal', startTime, endTime);
  }

  onChangeRegion() {
    this.loadData(this.region);
  }

}
