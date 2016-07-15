import {Component, OnInit, OnChanges, Output, AfterViewInit, EventEmitter, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
declare let d3: any;

/*
  Generated class for the IkhtisarStatistikPiePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/ikhtisar-statistik-pie/ikhtisar-statistik-pie.html',
})
export class IkhtisarStatistikPiePage {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);
  @ViewChild(nvD3) nvD3: nvD3;
  options;
  dataArr;
  data;
  arrObj;
  kategori: String;
  tahun: Date;
  tahunArr: Array<Date>;
  // url = "https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja?kategori=" + "Lowongan";
  url;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {
    this.kategori = "Lowongan";
    this.loadData(this.kategori);
  }

  ngOninit() {
    console.log('onNg on Init');
  }

  loadData(type) {
    this.url = "https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja?kategori=" + type;

    this.arrObj = [];
    this.dataService.load(this.url)
    .then(data => {

      function selectDistinct(distinct, arrObj) {
        var flags = [], dataDistinct = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (flags[arrObj[i][distinct]]) continue;
          flags[arrObj[i][distinct]] = true;
          dataDistinct.push(arrObj[i][distinct]);
        }
        return dataDistinct;
      }

      function generateValues(arrObj, dateKey, dateVal, keyCat, keyVal) {
        var values = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (arrObj[i][dateKey] == dateVal) {
            values.push(
              {
                key: arrObj[i][keyCat],
                y: arrObj[i][keyVal]
              }
            )
          }
        }
        return values;
      }

      function generateData(distinct, arrObj, dateKey, keyCat, keyVal) {
        let tahun = selectDistinct(distinct, arrObj);
        return tahun.map(function(item) {
          return {
            tahun: item,
            values: generateValues(arrObj, dateKey, item, keyCat, keyVal)
          }
        })
      }

      this.tahunArr = selectDistinct("tahun", data).sort();
      this.dataArr = generateData("tahun", data, "tahun", "rincian", "jumlah");
      this.tahun = this.tahunArr[0];
      this.selectPieOfYear(this.tahun);
      this.options = this.getOptions.loadOptionPie("");
    });
  }

  onChange(ngModel) {
    if (ngModel == 'tahun') {
      this.selectPieOfYear(this.tahun);
    }

    if (ngModel == 'kategori') {
      this.loadData(this.kategori);
    }
  }

  doRefresh(refresher) {
    console.log('Begin refresher');

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  selectPieOfYear(year) {
    let i = 0;
    do {
      if (this.dataArr[i].tahun == year) {
        this.data = this.dataArr[i].values;
        i = i + this.dataArr.length;
      }
      i++;
    } while (i < this.dataArr.length);
    if (this.nvD3.chart != null) this.nvD3.chart.update();
  }

}
