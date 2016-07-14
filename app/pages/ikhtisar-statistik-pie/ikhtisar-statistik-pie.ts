import {Component, OnInit, OnChanges, Output, AfterViewInit, EventEmitter, ViewChild, NgZone} from '@angular/core';
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
  url = "https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja?kategori=" + "Lowongan";


  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options, private zone:NgZone) {
    console.log('on constructor main');
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

      console.log("PIE!!")


      this.tahunArr = selectDistinct("tahun", data).sort();
      this.dataArr = generateData("tahun", data, "tahun", "rincian", "jumlah");
      this.data = this.dataArr[0].values;
      console.log('on 200');
      console.log(this.dataArr);
      this.options = this.getOptions.loadOptionPie("");
    });

  }

  ngOninit() {
    console.log('onNg on Init');
  }

  ngAfterViewInit() {
    console.log('after view Init');
    console.log(this.dataArr);

  }

  onChange(newValue, ngModel) {
    console.log("onChange");
    if (ngModel == 'tahun') {
      console.log('this.dataArr[0].values');
      for (let element of this.dataArr) {
        if (element.tahun == newValue) {
          console.log(element.values);
          this.data = element.values;
          // this.nvD3.updateWithData(this.data);
          this.nvD3.chart.update();
          break;
        }
      }
      this.dataArr.indexOf(this.dataArr.newValue);

      this.tahun = new Date(newValue);
      console.log(this.tahun);
    }

    // if (ngModel == 'chart') {
    //   this.data = newValue;
    // }

    if (ngModel == 'kategori') {
      this.kategori = newValue;
      this.url = "https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja?kategori=" + this.kategori;
      console.log(this.kategori);
    }
  }

  doRefresh(refresher) {
    console.log('Begin refresher');

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
