import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IkhtisarStatistikPage} from '../ikhtisar-statistik/ikhtisar-statistik';

/*
  Generated class for the MakroMenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/makro-menu/makro-menu.html',
})

export class MakroMenuPage {

  pages: Array<{title: string, component: any, category: string, data: Number, image: string}>

  constructor(public nav: NavController) {
    this.nav = nav;

    this.pages = [
      {
        title: 'Ikhtisar Statistik',
        component: IkhtisarStatistikPage,
        category: 'Ketenaga Kerjaan',
        data: 1,
        image: 'home'
      },
      {
        title: 'Upah Minimum Provinsi',
        component: IkhtisarStatistikPage,
        category: 'Ketenaga Kerjaan',
        data: 2,
        image: 'home'
      },
      {
        title: 'Pertumbuhan Ekonomi',
        component: IkhtisarStatistikPage,
        category: 'Perekonomian',
        data: 3,
        image: 'home'
      },
      {
        title: 'Tingkat Inflasi',
        component: IkhtisarStatistikPage,
        category: 'Perekonomian',
        data: 4,
        image: 'home'
      },
      {
        title: 'Komponen Inflasi',
        component: IkhtisarStatistikPage,
        category: 'Perekonomian',
        data: 5,
        image: 'home'
      },
      {
        title: 'Struktur Ekonomi',
        component: IkhtisarStatistikPage,
        category: 'Perekonomian',
        data: 9,
        image: 'home'
      },
      {
        title: 'Pendapatan Perkapita',
        component: IkhtisarStatistikPage,
        category: 'Pendapatan Perkapita',
        data: 13,
        image: 'home'
      }
    ];
    // console.log(this.pages);
  }

  selectPage(page) {
    this.nav.push(page);
  }

}
