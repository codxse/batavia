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
  templateUrl: 'build/pages/struktur-ekonomi-pie/struktur-ekonomi-pie.html',
})
export class StrukturEkonomiPiePage {
  @ViewChild(nvD3) nvD3: nvD3;
  url: String;
  data: Array<any>;
  yearArr: Array<Number>;
  options: any;
  tahun: any;

  constructor(private nav: NavController, private dataService: DataService, private loadOptions: Options) {

  }

  private ngOnInit(): void {
    this.getMaxYearOfApi();
    this.getDateArr("https://api.kawaljakarta.org/v1/struktur-ekonomi");
  }

  // year is in Full Year format
  private selectDataOfYear(year) {
    this.url = "https://api.kawaljakarta.org/v1/struktur-ekonomi/key=tahun&gd=%22"
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

  private trimString(string): String {
    if (string.length > 20) {
      return string.substring(0, 12) + '...';
    }
    return string
  }

  private handleData(datum): Array<any> {
    let dataArr = [];
    for (let data of datum) {
      dataArr.push({
        key: data.jenis_sektor + ' (' + data.keterangan + ')',
        y: data.persen_kontribusi
      });
    }
    return dataArr;
  }

  // get unique array of tahun
  private getDateArr(url): void {
    this.dataService.load(url)
      .then(data => {
        this.yearArr = this.selectDistinct('tahun', data);
        if (this.tahun != undefined) {
          if (this.yearArr[this.yearArr.length-1] != this.tahun) this.yearArr.push(this.tahun);
        }
        // console.log(this.tahun);
        // console.log(this.yearArr);
      });
  }


  private selectDistinct(distinct, arrObj): Array<any> {
    var flags = [], dataDistinct = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][distinct]]) continue;
      flags[arrObj[i][distinct]] = true;
      let tempYear = new Date(arrObj[i][distinct]).getFullYear();
      dataDistinct.push(tempYear);
    }
    return dataDistinct;
  }

  // get max tahun of api
  private getMaxYearOfApi(): void {
    console.log('on getMaxYearOfApi');
    this.dataService.load('https://api.kawaljakarta.org/v1/struktur-ekonomi/key=tahun&get=max')
      .then(data => {
        this.tahun = new Date(data['tahun']).getFullYear();
        this.selectDataOfYear(this.tahun);
      });
  }

  onChange() {
    this.selectDataOfYear(this.tahun);
  }
}
