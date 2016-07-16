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
  url: String;
  data: Array<any>;
  dateArr: Array<Date>;
  options: any;
  tahun: any;

  constructor(private nav: NavController, private dataService: DataService, private loadOptions: Options) {

  }

  private ngOnInit(): void {
    console.log('on ngOnInit');
    this.tahun = 2012;
    this.url = "https://api.kawaljakarta.org/v1/struktur-ekonomi/key=tahun&gd=%22"
                +(this.tahun - 1).toString()+"%22&ld=%22"+this.tahun.toString()+"%22";
    this.loadData(this.url);
  }

  private loadData(url): void {
    console.log('on loadData(): void');
    this.dataService.load(this.url)
      .then(data => {
        this.data = this.handleData(data);
        this.options = this.loadOptions.loadOptionPie("");
        this.getDateArr("https://api.kawaljakarta.org/v1/struktur-ekonomi");
        console.log(this.dateArr);
        console.log(this.data);
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
        this.dateArr = this.selectDistinct('tahun', data);
        console.log(this.dateArr);
      });
  }


  private selectDistinct(distinct, arrObj): Array<any> {
    var flags = [], dataDistinct = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][distinct]]) continue;
      flags[arrObj[i][distinct]] = true;
      dataDistinct.push(arrObj[i][distinct]);
    }
    return dataDistinct;
  }
}
