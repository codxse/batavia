import {Component, OnInit} from '@angular/core';
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
  templateUrl: 'build/pages/nilai-impor-produk-histogram/nilai-impor-produk-histogram.html',
})
export class HargaPanganKonsumenHistogramPage {
  private url: String;
  private data: Array<any>;
  private yearArr: Array<Number>;
  private options: any;

  constructor(private nav: NavController, private dataService: DataService, private loadOptions: Options) {

  }

  private ngOnInit(): void {
    this.url = "https://api.kawaljakarta.org/v1/harga-pangan-tingkat-konsumen/histogram";
    this.loadData(this.url);
  }


  private loadData(url): void {
    this.dataService.load(this.url)
      .then(data => {
        this.data = this.handleData(data);
        console.log(this.data);
        this.options = this.loadOptions.loadOptionHistogram("frekuensi", 45, 40, 75);
      });
  }

  private handleData(datum): Array<any> {
    let dataArr = [];
    for (let data of datum) {
      dataArr.push({
        label: (function(d) {
                  if (d.length > 20) {
                    return d.substring(0, 20) + '...';
                  }
                    return d;
                })(data.kelas_interval),
        value: data.frekuensi
      });
    }
    return [{
      key: "Cumulative Return",
      values: dataArr
    }];
  }

}
