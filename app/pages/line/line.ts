import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/*
  Generated class for the LinePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/line/line.html',
})
export class Line {
  constructor(public nav: NavController) {

  }

  genKeys(key, arrObj) {
    let flags = [], cats = [], l = arrObj.length, i;
    for (i=0; i<l; i++) {
      if (flags[arrObj[i][key]]) continue;
      flags[arrObj[i][key]] = true;
      cats.push(arrObj[i][key]);
    }
    return cats;
  }

  genVals(keyCat, valCat, keyValue, arrObj, dateKey) {
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

  genData(keyCat, keyValue, arrObj, dateKey) {
    let categories = this.genKeys(keyCat, arrObj)
    return categories.map(function(item) {
      return {
        key: item,
        values: this.genVals(keyCat, item, keyValue, arrObj, dateKey)
      }
    });
  }

}
