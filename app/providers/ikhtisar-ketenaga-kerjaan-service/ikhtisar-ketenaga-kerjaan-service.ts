import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IkhtisarKetenagaKerjaanService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IkhtisarKetenagaKerjaanService {
  arrObj;
  data;

  constructor(public http: Http) {
    console.log('on constructor service');
    console.log(this.data);
    return this.data;
  }

  loadData() {
    this.arrObj = [];
    return this.load()
      .then(data => {
        console.log('on loadData Service');
        for (let key in data) {
          let obj = {};
          //console.log(data[key]);
          obj['label'] = data[key].kelas_interval;
          obj['value'] = data[key].frekuensi;
          this.arrObj.push(obj);
        }
        // console.log(this.arrObj);
        this.data = [
          {
            key: "Cumulative Return",
            values: this.arrObj
          }
        ]
        // console.log(this.data);
      });
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get("https://api.kawaljakarta.org/v1/ikhtisar-statistik-antar-kerja/key=tahun&gd='2008'&ld='2014'")
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
