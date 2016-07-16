import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IkhtisarStatistikTabPage} from '../ikhtisar-statistik-tab/ikhtisar-statistik-tab';
import {UpahMinimumProvinsiTabPage} from '../upah-minimum-provinsi-tab/upah-minimum-provinsi-tab';
import {PertumbuhanEkonomiTabPage} from '../pertumbuhan-ekonomi-tab/pertumbuhan-ekonomi-tab';
import {TingkatInflasiTabPage} from '../tingkat-inflasi-tab/tingkat-inflasi-tab';
import {KomponenInflasiTabPage} from '../komponen-inflasi-tab/komponen-inflasi-tab';
import {StrukturEkonomiPiePage} from '../struktur-ekonomi-pie/struktur-ekonomi-pie';
import {PendapatanPerkapitaTabPage} from '../pendapatan-perkapita-tab/pendapatan-perkapita-tab';

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
        component: IkhtisarStatistikTabPage,
        category: 'Ketenaga Kerjaan',
        data: 1,
        image: 'home'
      },
      {
        title: 'Upah Minimum Provinsi',
        component: UpahMinimumProvinsiTabPage,
        category: 'Ketenaga Kerjaan',
        data: 2,
        image: 'home'
      },
      {
        title: 'Pertumbuhan Ekonomi',
        component: PertumbuhanEkonomiTabPage,
        category: 'Perekonomian',
        data: 3,
        image: 'home'
      },
      {
        title: 'Tingkat Inflasi',
        component: TingkatInflasiTabPage,
        category: 'Perekonomian',
        data: 4,
        image: 'home'
      },
      {
        title: 'Komponen Inflasi',
        component: KomponenInflasiTabPage,
        category: 'Perekonomian',
        data: 5,
        image: 'home'
      },
      {
        title: 'Struktur Ekonomi',
        component: StrukturEkonomiPiePage,
        category: 'Perekonomian',
        data: 9,
        image: 'home'
      },
      {
        title: 'Pendapatan Perkapita',
        component: PendapatanPerkapitaTabPage,
        category: 'Pendapatan Perkapita',
        data: 12,
        image: 'home'
      }
    ];
    // console.log(this.pages);
  }

  selectPage(page) {
    this.nav.push(page);
  }

}
