import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
declare let d3: any;

/*
  Generated class for the IkhtisarStatistikPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService],
  templateUrl: 'build/pages/ikhtisar-statistik/ikhtisar-statistik.html',
})

export class IkhtisarStatistikPage {
  options;
  data;
  arrObj;

  constructor(public nav: NavController, public dataService: DataService) {
    console.log('on constructor');
    this.loadData();
  }

  loadData() {
    this.arrObj = [];
    this.dataService.load()
      .then(data => {
        console.log('on loadData');
        for (let key in data) {
          let obj = {};
          console.log(data[key]);
          obj['label'] = data[key].kelas_interval;
          obj['value'] = data[key].frekuensi;
          this.arrObj.push(obj);
        }
        console.log(this.arrObj);
        this.data = [
          {
            key: "Cumulative Return",
            values: this.arrObj
          }
        ]
        console.log(this.data);
      });
  }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    }
    console.log("on ngOnInit");
    console.log(this.arrObj);
    // this.data = [
    //   {
    //     key: "Cumulative Return",
    //     values: this.arrObj
    //   }
    // ];
  }

}
