import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IkhtisarStatistikTabPage} from '../ikhtisar-statistik-tab/ikhtisar-statistik-tab';
import {UpahMinimumProvinsiPage} from '../upah-minimum-provinsi/upah-minimum-provinsi';
import {PertumbuhanEkonomiPage} from '../pertumbuhan-ekonomi/pertumbuhan-ekonomi';
import {TingkatInflasiPage} from '../tingkat-inflasi/tingkat-inflasi';
import {KomponenInflasiPage} from '../komponen-inflasi/komponen-inflasi';
import {StrukturEkonomiPage} from '../struktur-ekonomi/struktur-ekonomi';
import {PendapatanPerkapitaPage} from '../pendapatan-perkapita/pendapatan-perkapita';

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
        component: UpahMinimumProvinsiPage,
        category: 'Ketenaga Kerjaan',
        data: 2,
        image: 'home'
      },
      {
        title: 'Pertumbuhan Ekonomi',
        component: PertumbuhanEkonomiPage,
        category: 'Perekonomian',
        data: 3,
        image: 'home'
      },
      {
        title: 'Tingkat Inflasi',
        component: TingkatInflasiPage,
        category: 'Perekonomian',
        data: 4,
        image: 'home'
      },
      {
        title: 'Komponen Inflasi',
        component: KomponenInflasiPage,
        category: 'Perekonomian',
        data: 5,
        image: 'home'
      },
      {
        title: 'Struktur Ekonomi',
        component: StrukturEkonomiPage,
        category: 'Perekonomian',
        data: 9,
        image: 'home'
      },
      {
        title: 'Pendapatan Perkapita',
        component: PendapatanPerkapitaPage,
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
