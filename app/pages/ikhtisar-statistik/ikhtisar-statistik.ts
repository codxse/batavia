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
  templateUrl: 'build/pages/ikhtisar-statistik/ikhtisar-statistik.html',
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
      let temp = [];
      for (let key in data) {
        let obj = {};
        let values = [];
        temp.push(data[key]);
      }



      function genKeys(key, arrObj) {
        let flags = [], cats = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (flags[arrObj[i][key]]) continue;
          flags[arrObj[i][key]] = true;
          cats.push(arrObj[i][key]);
        }
        return cats;
      }

      function genVals(keyCat, valCat, value, arrObj, dateKey) {
        let values = [], l = arrObj.length, i;
        for (i=0; i<l; i++) {
          if (arrObj[i][keyCat] == valCat) {
            values.push(
              {
                x: new Date(arrObj[i][dateKey]).getTime(),
                y: arrObj[i][value]
              }
            )
          }
        }
        return values;
      }

      function genData(arrObj) {
        let categories = genKeys('rincian', arrObj)
        return categories.map(function(data) {
          return {
            key: data,
            values: genVals('rincian', data, 'jumlah', arrObj, 'tahun')
          }
        });
      }
      console.log(genData(temp))
      this.data = genData(temp);
    });
  }

  // loadData() {
  //   this.arrObj = [];
  //   this.dataService.load()
  //     .then(data => {
  //       console.log('on loadData');
  //       for (let key in data) {
  //         let obj = {};
  //         console.log(data[key]);
  //         obj['label'] = data[key].kelas_interval;
  //         obj['value'] = data[key].frekuensi;
  //         this.arrObj.push(obj);
  //       }
  //       console.log(this.arrObj);
  //       this.data = [
  //         {
  //           key: "Cumulative Return",
  //           values: this.arrObj
  //         }
  //       ]
  //       console.log(this.data);
  //     });
  // }

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
          }
        },
        yAxis: {
          axisLabel: 'Jiwa',
          axisLabelDistance: -5,
          tickFormat: function(d) {
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
          }
        },
        callback: function(chart){
          console.log("!!! lineChart callback !!!");
        }
      }
      // title: {
      //   enable: true,
      //   text: 'Title for Line Chart'
      // },
      // subtitle: {
      //   enable: true,
      //   text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
      //   css: {
      //     'text-align': 'center',
      //     'margin': '10px 13px 0px 7px'
      //   }
      // },
      // caption: {
      //   enable: true,
      //   html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
      //   css: {
      //     'text-align': 'justify',
      //     'margin': '10px 13px 0px 7px'
      //   }
      // }
    }
  }

}
