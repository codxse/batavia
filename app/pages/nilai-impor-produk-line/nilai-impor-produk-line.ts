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
  templateUrl: 'build/pages/nilai-impor-produk-line/nilai-impor-produk-line.html'
})

export class NilaiImporProdukLinePage {
  @ViewChild(nvD3) nvD3: nvD3;
  private url: String;
  private options: any;
  private data: Array<any>;
  private dateArr: Array<string>;
  private yearArr: Array<any>;
  private monthArr: Array<any>;
  private monthNames: Array<string>
  private startMonth;
  private startYear;
  private endMonth;
  private endYear;
  private origData;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {

  }

  private ngOnInit(): void {
    this.url = "https://api.kawaljakarta.org/v1/nilai-impor-produk-menurut-golongan";
    this.monthArr = [0,1,2,3,4,5,6,7,8,9,10,11];
    this.monthNames = ["Januari", "Februari", "Maret", "April",
                      "Mei", "Juni", "Juli", "Agustus", "September",
                      "Oktober", "November", "Desember"];
    this.loadData(this.url);
    this.options = this.getOptions.loadOptionLine("", "Juta USD", "%b %Y", null, -5, 55);
  }

  private loadData(url): void {
    console.log('on loadData')
    this.dataService.load(url)
    .then(data => {
      this.origData = data;

      this.dateArr = this.generateKeys('bulan', data);
      this.yearArr = this.getYearArr(this.dateArr);

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

      this.data = this.generateData('golongan', 'nilai_fob', data, 'bulan', startTime, endTime);
      console.log(this.data);
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
    let url = 'https://api.kawaljakarta.org/v1/nilai-impor-produk-menurut-golongan/key=bulan&get=min';
    this.dataService.load(url)
    .then(data => {
      console.log(data);
    });
  }

  private getMaxDateApi(): void {
    let url = 'https://api.kawaljakarta.org/v1/nilai-impor-produk-menurut-golongan/key=bulan&get=max';
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

  onChange(ngModel) {
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

    switch (ngModel) {
      case 'startMonth' :
        break;
      case 'endMonth' :
        break;
      case 'startYear' :
        break;
      case 'endYear' :
        break;
    }

    let startTime = startDate.getTime();
    let endTime = endDate.getTime();

    this.data = this.generateData('golongan', 'nilai_fob', this.origData, 'bulan', startTime, endTime);
    console.log(this.data);
  }

  // onChangeStartYear() {
  //   let startDate = new Date(this.dari);
  //   let endDate = new Date(this.sampai);
  //   if (startDate > endDate) {
  //     let startYear = startDate.getFullYear();
  //     endDate.setFullYear(startYear);
  //     this.sampai = endDate.toISOString();
  //   }
  //   let startTime = startDate.getTime();
  //   let endTime = endDate.getTime();
  //   this.data = this.generateData('atribut', 'juta_usd', this.origData, 'tahun', startTime, endTime);
  //   this.data[0].key = "Ekspor Melalui Jakarta";
  //   this.data[1].key = "Ekspor Produk Jakarta";
  //   this.data[2].key = "Impor Melalui Jakarta";
  //   this.nvD3.chart.update();
  // }
  //
  // onChangeEndYear() {
  //   let startDate = new Date(this.dari);
  //   let endDate = new Date(this.sampai);
  //   if (endDate < startDate) {
  //     let endYear = endDate.getFullYear();
  //     startDate.setFullYear(endYear);
  //     this.dari = startDate.toISOString();
  //   }
  //   let startTime = startDate.getTime();
  //   let endTime = endDate.getTime();
  //   this.data = this.generateData('atribut', 'juta_usd', this.origData, 'tahun', startTime, endTime);
  //   this.data[0].key = "Ekspor Melalui Jakarta";
  //   this.data[1].key = "Ekspor Produk Jakarta";
  //   this.data[2].key = "Impor Melalui Jakarta";
  //   this.nvD3.chart.update();
  // }

}
