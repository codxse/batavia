import {Injectable} from '@angular/core';
declare let d3: any;

@Injectable()
export class Options{
  optionLine;

  constructor() {}

  loadOptionLine(xAxisLabel, yAxisLabel) {
    return {
      chart: {
        type: 'lineChart',
        height: 350,
        margin : {
          top: 10,
          right: 35,
          bottom: 20,
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
          axisLabel: xAxisLabel,
          tickFormat: function(d) {
            return d3.time.format('%Y')(new Date(d));
          },
          showMaxMin: false
        },
        yAxis: {
          axisLabel: yAxisLabel,
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

  loadOptionPie(title) {
    return {
      chart: {
        title: title,
        type: 'pieChart',
        height: 350,
        showLegend: false,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        donut: false,
        duration: 100,
        labelThreshold: 0.01,
        labelType: "percent",
        labelSunbeamLayout: true,
        margin: {
          left: -10,
          top: -8
        },
        legend: {
          margin: {
            top: -250,
            right: 50,
            bottom: 5,
            left: 0
          }
        }
      }
    }
  }
}
