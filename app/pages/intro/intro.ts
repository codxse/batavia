import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MainPage} from '../main/main';

@Component({
    templateUrl: './build/pages/intro/intro.html'
})

export class IntroPage {

  slides = [
    {
      title: "Terimakasih dari Batavia!",
      description: "Nama <b>Batavia</b> berasal dari kependekan <em>Batavia Visualization App</em>.",
      image: "img/ica-slidebox-img-1.png"
    },
    {
      title: "Apa itu Batavia?",
      description: "<b>Batavia</b> adalah aplikasi visualisasi data terbuka DKI Jakarta, khususnya untuk topik ekonomi dan keuangan daerah.",
      image: "img/ica-slidebox-img-2.png"
    },
    {
      title: "Kenapa Batavia?",
      description: "Aplikasi <b>Batavia</b> mendukung <em>multiplatform</em>, selain itu bebas digunakan. Misi Batavia adalah memudahkan penggunanya melihat data secara visual.",
      image: "img/ica-slidebox-img-3.png"
    }
  ];

  constructor(public nav: NavController) {
    this.nav = nav;
  }

  goMainPage() {
    this.nav.setRoot(MainPage);
  }

}
