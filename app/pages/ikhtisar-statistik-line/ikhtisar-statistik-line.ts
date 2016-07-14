import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
declare let d3: any;

/*
Generated class for the IkhtisarStatistikPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/ikhtisar-statistik-line/ikhtisar-statistik-line.html'
})

export class IkhtisarStatistikLinePage{
  url = "https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja/key=tahun&gd='2008'&ld='2014'";
  options;
  data;
  arrObj;

  constructor(public nav: NavController, public dataService: DataService, public getOptions: Options) {
    console.log('on constructor main');
    this.arrObj = [];
    this.dataService.load(this.url)
    .then(data => {
      function genKeys(key, arrObj) {
        let flags = [], cats = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (flags[arrObj[i][key]]) continue;
          flags[arrObj[i][key]] = true;
          cats.push(arrObj[i][key]);
        }
        return cats;
      }

      function genVals(keyCat, valCat, keyValue, arrObj, dateKey) {
        let values = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (arrObj[i][keyCat] == valCat) {
            values.push(
              {
                x: new Date(arrObj[i][dateKey]).getTime(),
                y: arrObj[i][keyValue]
              }
            )
          }
        }
        return values;
      }

      function genData(keyCat, keyValue, arrObj, dateKey) {
        let categories = genKeys(keyCat, arrObj)
        return categories.map(function(item) {
          return {
            key: item,
            values: genVals(keyCat, item, keyValue, arrObj, dateKey)
          }
        });
      }

      this.data = genData('rincian', 'jumlah', data, 'tahun');
      console.log(this.data)
    });
  }

  ngOnInit() {
    console.log('ong ngOnInit');
    this.options = this.getOptions.loadOptionLine("Tahun", "Jiwa");
  }

}
