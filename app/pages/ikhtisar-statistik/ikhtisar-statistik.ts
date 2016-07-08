import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
//import {DataService} from '../../providers/data-service/data-service';
import {IkhtisarKetenagaKerjaanService} from '../../providers/ikhtisar-ketenaga-kerjaan-service/ikhtisar-ketenaga-kerjaan-service';
import {nvD3} from '../../ng2-nvd3';
declare let d3: any;

/*
Generated class for the IkhtisarStatistikPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  //providers: [DataService],
  providers: [IkhtisarKetenagaKerjaanService],
  templateUrl: 'build/pages/ikhtisar-statistik/ikhtisar-statistik.html'
})

export class IkhtisarStatistikPage {
  options;
  data;
  arrObj;

  constructor(public nav: NavController, public ikhtisarKetenagaKerjaanService: IkhtisarKetenagaKerjaanService) {
    console.log('on constructor main');
    this.arrObj = [];
    this.ikhtisarKetenagaKerjaanService.load()
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
    });
  }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'lineChart',
        height: 600,
        margin : {
          top: 30,
          right: 55,
          bottom: 300,
          left: 55
        },
        showLegend: false,
        legendPosition: "bottom",
        x: function(d) {
          return new Date(d.x);
        },
        xScale: d3.time.scale(),
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function(e){ console.log("stateChange"); },
          changeState: function(e){ console.log("changeState"); },
          tooltipShow: function(e){ console.log("tooltipShow"); },
          tooltipHide: function(e){ console.log("tooltipHide"); }
        },
        xAxis: {
          axisLabel: 'Tahun',
          tickFormat: function(d) {
            return d3.time.format('%Y')(new Date(d));
          },
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Jiwa',
          axisLabelDistance: -5,
          tickFormat: function(d) {
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
          },
          showMaxMin: false
        },
        callback: function(chart){
          console.log("!!! lineChart callback !!!");
        }
      }
    }
  }

}
