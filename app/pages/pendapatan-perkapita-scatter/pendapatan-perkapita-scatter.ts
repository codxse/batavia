import {Component, OnInit, Injectable} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';
import {nvD3} from '../../ng2-nvd3';
import {Options} from '../../providers/options';
import {Http} from '@angular/http';
declare let d3: any;

/*
  Generated class for the UpahMinimumProvinsiScatterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [nvD3],
  providers: [DataService, Options],
  templateUrl: 'build/pages/pendapatan-perkapita-scatter/pendapatan-perkapita-scatter.html',
})
export class PendapatanPerkapitaScatterPage {
  urlData = "https://api.kawaljakarta.org/v1/pendapatan-perkapita/data?keterangan=Bukan%20Outlier";
  urlModel = "https://api.kawaljakarta.org/v1/pendapatan-perkapita";
  data;
  model;
  modelObj;
  options;

  constructor(public http: Http, public nav: NavController, public dataService: DataService, public getOptions: Options) {
    console.log("on Constructor");
  }

  ngOnInit() {
    console.log("onInit");
    this.dataService.load(this.urlModel)
      .then(data => {
        this.model = this.genModel(data[0], this.genScatter);
        console.log('@urlModel');
        console.log(this.model);

        this.dataService.load(this.urlData)
          .then(data => {
            console.log('@urlData');
            this.model[0].values = this.genScatter(data, "perkapita_jakarta", "perkapita_nasional");
            this.data = this.model;
            this.modelObj = this.model[0];
            console.log(this.modelObj);
            this.options = this.getOptions.loadOptionScatter('Juta Rupiah', 'Juta Rupiah', -3, 58);
            console.log(this.data);
          });

      });
  }

  genScatter(data, val1, val2) {
    let values = [], i;
    for (i=0; i<data.length; i++) {
      values.push({
        series: 0,
        x: data[i][val1],
        y: data[i][val2]
      })
    }
    return values;
  }

  genModel(data, genScatter) {
    let values = [], obj = { intercept: '', slope: '', correlation_coefficient: '', values: '' };
    obj.intercept = data.model.coefficient;
    obj.slope = data.model.slope;
    obj.correlation_coefficient = data.model.correlation_coefficient;
    values.push(obj);
    return values;
  }

}
