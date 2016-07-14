import {Injectable} from '@angular/core';
declare let d3: any;

@Injectable()
export class Options{
  optionLine;

  constructor() {}

  loadOptionLine(xAxisLabel, yAxisLabel, forceY, yAxisLabelDistance, marginLeft) {
    if (typeof forceY === "undefined") { forceY = null; }
    return {
      chart: {
        type: 'lineChart',
        height: 350,
        margin : {
          top: 10,
          right: 45,
          bottom: 25,
          left: marginLeft
        },
        showLegend: false,
        legendPosition: "bottom",
        forceY: forceY,
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
          axisLabelDistance: yAxisLabelDistance,
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

  loadOptionScatter(xAxisLabel, yAxisLabel) {
    return {
      chart: {
        type: 'scatterChart',
        height: 340,
        margin: {
          top: 5,
          right: 55,
          bottom: 50,
          left: 65
        },
        showLegend: false,
        color: d3.scale.category10().range(),
        scatter: {
          onlyCircles: false
        },
        showDistX: true,
        showDistY: true,
        duration: 350,
        xAxis: {
          axisLabel: xAxisLabel,
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: 0,
          shiwMaxMin: false
        },
        yAxis: {
          axisLabel: yAxisLabel,
          axisLabelDistance: 0,
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          showMaxMin: false
        },
        zoom: {
          //NOTE: All attributes below are optional
          enabled: false,
          scaleExtent: [1, 10],
          useFixedDomain: true,
          useNiceScale: true,
          horizontalOff: true,
          verticalOff: false,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    }
  }

  loadOptionLinePlus() {
    return {
      chart: {
        type: 'linePlusBarChart',
        height: 400,
        margin: {
          top: 5,
          right: 70,
          bottom: 15,
          left: 50
        },
        showLabels: true,
        showLegend: false,
        bars: {
          forceY: [0]
        },
        legendLeftAxisHint: " (Kiri: Rp)",
        legendRightAxisHint: " (Kanan: %)",
        bars2: {
          forceY: [0]
        },
        x: function(d) {
          return new Date(d.x);
        },
        xAxis: {
          axisLabel: '',
          tickFormat: function(d) {
            // var dx = this.data[0].values[d] && this.data[0].values[d].x || 0;
            // if (dx > 0) {
            return d3.time.format('%Y')(new Date(d));
            // }
            // return null;
          },
          showMaxMin: false
        },
        x2Axis: {
          tickFormat: function(d) {
            // var dx = this.data[0].values[d] && this.data[0].values[d].x || 0;
            // return d3.time.format('%Y')(new Date(d));
            return "";
          },
          showMaxMin: false
        },
        y1Axis: {
          axisLabel: 'Rp',
          tickFormat: function(d) {
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
          },
          axisLabelDistance: -10,
          showMaxMin: false
        },
        y2Axis: {
          axisLabel: '%',
          tickFormat: function(d) {
            var prefix = d3.formatPrefix(d);
            return prefix.scale(d) + prefix.symbol;
          },
          showMaxMin: false,
          axisLabelDistance: -38
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
