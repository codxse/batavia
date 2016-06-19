import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EksporDanImporPage} from '../ekspor-dan-impor/ekspor-dan-impor';

@Component({
  templateUrl: 'build/pages/mikro-menu/mikro-menu.html',
})

export class MikroMenuPage {

  pages: Array<{title: string, component: any, category: string, data: Number, image: string}>

  constructor(public nav: NavController) {
    this.nav = nav;

    this.pages = [
      {
        title: 'Ekspor dan Impor Jakarta',
        component: EksporDanImporPage,
        category: 'Ekspor Impor',
        data: 6,
        image: 'home'
      },
      {
        title: 'Volume dan Nilai Ekspor',
        component: EksporDanImporPage,
        category: 'Ekspor Impor',
        data: 7,
        image: 'home'
      },
      {
        title: 'Nilai Impor Produk',
        component: EksporDanImporPage,
        category: 'Ekspor Impor',
        data: 8,
        image: 'home'
      },
      {
        title: 'Harga Pangan Konsumen',
        component: EksporDanImporPage,
        category: 'Komoditas',
        data: 10,
        image: 'home'
      },
      {
        title: 'Harga Grosir di Pasar Induk',
        component: EksporDanImporPage,
        category: 'Komoditas',
        data: 11,
        image: 'home'
      },
      {
        title: 'Realisasi APBD',
        component: EksporDanImporPage,
        category: 'APBD',
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
