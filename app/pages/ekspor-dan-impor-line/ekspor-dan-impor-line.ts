import {Component, OnInit} from '@angular/core';
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
  templateUrl: 'build/pages/ekspor-dan-impor-line/ekspor-dan-impor-line.html'
})

export class EksporDanImporLinePage {
  private url: String;
  private options: any;
  private data: Array<any>;
  private dateArr: Array<Date>;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {

  }

  private ngOnInit(): void {
    console.log('on ngOnInit')
    this.url = "https://api.kawaljakarta.org/v1/besar-ekspor-impor/key=tahun&gd='2006'&ld='2013'";
    this.loadData(this.url);
    this.options = this.getOptions.loadOptionLine("", "Juta USD", null, -5, 55);
  }

  private loadData(url): void {
    console.log('on loadData')
    this.dataService.load(url)
      .then(data => {
        this.data = this.generateData('atribut', 'juta_usd', data, 'tahun', new Date('2006-01-01').getTime(), new Date('2013-01-01').getTime());
        this.data[0].key = "Ekspor Melalui Jakarta";
        this.data[1].key = "Ekspor Produk Jakarta";
        this.data[2].key = "Impor Melalui Jakarta";
        this.dateArr = this.generateKeys('tahun', data);
        console.log(this.data);
      });
  }

  private generateData(keyCat, keyValue, arrObj, dateKey, startTime, endTime): Array<any> {
    let categories = this.generateKeys(keyCat, arrObj)
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
            y: arrObj[i][keyValue]
          }
        )
      }
    }
    return values;
  }

}
