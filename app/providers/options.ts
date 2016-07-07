import {Injectable} from '@angular/core';
declare let d3: any;

@Injectable()
export class Options{
  optionLine;

  constructor() {}

  loadOptionLine() {
    return {
      chart: {
        type: 'lineChart',
        height: 600,
        margin : {
          top: 30,
          right: 20,
          bottom: 300,
          left: 55
        },
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
