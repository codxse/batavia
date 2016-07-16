import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EksporDanImporLinePage} from '../ekspor-dan-impor-line/ekspor-dan-impor-line';
import {VolumeDanNilaiEksporPage} from '../volume-dan-nilai-ekspor/volume-dan-nilai-ekspor';
import {NilaiImporProdukTabPage} from '../nilai-impor-produk-tab/nilai-impor-produk-tab';
import {HargaPanganKonsumenTabPage} from '../harga-pangan-konsumen-tab/harga-pangan-konsumen-tab';
import {HargaGrosirDiPasarIndukPage} from '../harga-grosir-di-pasar-induk/harga-grosir-di-pasar-induk';

@Component({
  templateUrl: 'build/pages/mikro-menu/mikro-menu.html',
})
export class MikroMenuPage {

  pages: Array<{title: string, component: any, category: string, data: Number, image: string}>

  constructor(public nav: NavController) {
    this.nav = nav;

    this.pages = [
      {
        title: 'Ekspor dan Impor',
        component: EksporDanImporLinePage,
        category: 'Ekspor Impor',
        data: 6,
        image: 'home'
      },
      {
        title: 'Volume & Nilai Ekspor',
        component: VolumeDanNilaiEksporPage,
        category: 'Ekspor Impor',
        data: 7,
        image: 'home'
      },
      {
        title: 'Nilai Impor Produk',
        component: NilaiImporProdukTabPage,
        category: 'Ekspor Impor',
        data: 8,
        image: 'home'
      },
      {
        title: 'Pangan Konsumen',
        component: HargaPanganKonsumenTabPage,
        category: 'Komoditas',
        data: 10,
        image: 'home'
      },
      {
        title: 'Harga Grosiran',
        component: HargaGrosirDiPasarIndukPage,
        category: 'Komoditas',
        data: 11,
        image: 'home'
      }
    ];
    // console.log(this.pages);
  }

  selectPage(page) {
    this.nav.push(page);
  }

}
