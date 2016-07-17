import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';

/*
  Generated class for the VolumeNilaiEksporScatterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/volume-nilai-ekspor-scatter/volume-nilai-ekspor-scatter.html',
})
export class VolumeNilaiEksporScatterPage {
  private url: string;
  private data: Array<any>;
  private options: any;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {
    console.log('on constructor');
  }

  private ngOnInit(): void {
    console.log('on ngOnInit');
    this.url = "https://api.kawaljakarta.org/v1/volume-dan-nilai-ekspor";
    this.loadData(this.url);
  }

  private loadData(url): void {
    this.dataService.load(url).then(data => {
      this.data = this.generateData(data);
      this.options = this.getOptions.loadOptionCluster('Volume (Ton)', 'USD');
      console.log(this.data);
    });
  }

  private generateData(datum): any {
    let objects = [];
    let clusters = this.selectDistinct('grup', datum);
    let parent = this;
    clusters.map(function(item) {
      objects.push(parent.generateValue(item, datum));
    });
    return objects;
  }

  private generateValue(cluster, datum): any {
    return {
      key: cluster,
      values: (
        function(datum) {
          let values = [];
          for (let data of datum) {
            if (data.grup == cluster) {
              values.push({
                x: data.volume,
                y: data.nilai,
                name: data.komoditas
              })
            }
          }
          return values;
        }
      )(datum)
    }
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
