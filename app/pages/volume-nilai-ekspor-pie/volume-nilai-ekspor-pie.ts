import {Component, OnInit, OnChanges, Output, AfterViewInit, EventEmitter, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
declare let d3: any;

@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/volume-nilai-ekspor-pie/volume-nilai-ekspor-pie.html',
})
export class VolumeNilaiEksporPiePage {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);
  @ViewChild(nvD3) nvD3: nvD3;
  private options: any;
  private data: any;
  private clusters: any;
  private grup: string;
  private tahunArr: Array<any>;
  private url: string;
  private nilaiObj: any;
  private volumeObj: any;
  private kategori;
  private tahun;
  private origData;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {

  }

  private ngOnInit(): void {
    this.url = "https://api.kawaljakarta.org/v1/volume-dan-nilai-ekspor/";
    this.loadData(this.url);
  }

  private loadData(url): void {
    this.dataService.load(url)
    .then(data => {
      // lihat aja jsonnya (generateDataArr(data)), gw udah formating semudah mungkin buat gak akses api
      this.origData = this.generateDataArr(data);
      this.kategori = 0; //Default kategori = Nilai
      this.tahun = this.tahunArr[this.tahunArr.length-1];
      this.data = this.selectDataOfYear(this.origData[this.kategori], this.tahun);
      this.options = this.getOptions.loadOptionPie("");

    });
  }

  private selectDataOfYear(data, year) {
    let fullYear = new Date(year).getFullYear();
    console.log(data);
    for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].tahun == fullYear) {
          return data.items[i].values;
        }
    }
  }

  onChange() {
    this.data = this.selectDataOfYear(this.origData[this.kategori], this.tahun);
    this.nvD3.chart.update();
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

  private generateValues(data, key, cluster, pushItem, dateKey, dateVal): any {
    let values = [], l = data.length, i;
    for (i=0; i<l; i++) {
      if (data[i][key] == cluster) {
        if (data[i][dateKey] == dateVal) {
            values.push(data[i][pushItem])
        }
      }
    }
    // return sum of Array
    // http://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers?answertab=votes#tab-top
    return {
      key: cluster,
      y: values.reduce((a, b) => a + b, 0)
    }
  }

  // for (let key in this.clusters) {
  //     objects.push(this.generateValues(data, key, val, push, dateKey, item));
  // }
  // generateValues(data, 'grup', 'cluster k1', 'nilai', 'tahun', '2011-01-01T00:00:00.000Z');

  private generateData(distinct, data, key, pushItem): any {
    this.tahunArr = this.selectDistinct('tahun', data);
    let clusters = this.selectDistinct('grup', data);
    let objects = [], objArr = [], parent = this;
    this.tahunArr.map(function(item) {
      objects.push(
        {
          tahun: new Date(item).getFullYear(),
          values: (function(item) {
            let objArr = [];
            for (let cluster of clusters) {
              objArr.push(parent.generateValues(data, key, cluster, pushItem, distinct, item));
            }
            return objArr;
          })(item)
        }
      );
    });
    return objects;
  }

  private generateDataArr(data): Array<any> {
    let parent = this;
    return [
      { type:'nilai', items: parent.generateData('tahun', data, 'grup', 'nilai') },
      { type:'volume', items: parent.generateData('tahun', data, 'grup', 'volume') }
    ]
  }

}
