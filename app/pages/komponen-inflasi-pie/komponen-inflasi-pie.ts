import {Component, OnInit, OnChanges, Output, AfterViewInit, EventEmitter, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';

/*
  Generated class for the KomponenInflasiPiePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/komponen-inflasi-pie/komponen-inflasi-pie.html',
})
export class KomponenInflasiPiePage {
  @ViewChild(nvD3) nvD3: nvD3;
  url: String;
  data: Array<any>;
  yearArr: Array<Number>;
  options: any;
  tahun: any;

  constructor(private nav: NavController, private dataService: DataService, private loadOptions: Options) {

  }

  private ngOnInit(): void {
    this.tahun = new Date().getFullYear();
    this.selectDataOfYear(this.tahun);
    this.yearArr = this.generateYears(this.tahun);
    console.log(this.yearArr);
  }

  // year is in Full Year format
  private selectDataOfYear(year) {
    this.url = "https://api.kawaljakarta.org/v1/komponen-inflasi/key=tahun&gd=%22"
                +(year - 1).toString()+"%22&ld=%22"+year.toString()+"%22";
    this.loadData(this.url);

    if (this.nvD3.chart != null) this.nvD3.chart.update();
  }

  private loadData(url): void {
    this.dataService.load(this.url)
      .then(data => {
        this.data = this.handleData(data);
        this.options = this.loadOptions.loadOptionPie("");
      });
  }

  private handleData(datum): Array<any> {
    let dataArr = [];
    for (let data of datum) {
      dataArr.push({
        key: data.komponen,
        y: data.persen_inflasi
      });
    }
    return dataArr;
  }

  private generateYears(latestYear) {
    let arr = [];
    let tempYear = latestYear;
    for (let i = 9; i >= 0; i--) {
        arr[i] = tempYear;
        tempYear--;
    }
    return arr;
  }

  // get unique array of tahun
  // private selectDistinct(distinct, arrObj): Array<any> {
  //   var flags = [], dataDistinct = [], l = arrObj.length, i;
  //   for (i=0; i<l; i++) {
  //     if (flags[arrObj[i][distinct]]) continue;
  //     flags[arrObj[i][distinct]] = true;
  //     dataDistinct.push(arrObj[i][distinct]);
  //   }
  //   return dataDistinct;
  // }

  onChange() {
    this.selectDataOfYear(this.tahun);
  }

}
