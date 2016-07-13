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
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        donut: false,
        duration: 500,
        labelThreshold: 0.01,
        labelType: "percent",
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    }
  }
}
