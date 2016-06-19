import {Component} from '@angular/core';
import {Alert, NavController} from 'ionic-angular';
import {ScientificFactsPage} from '../scientific-facts-page/scientific-facts-page';

@Component({
  templateUrl: 'build/pages/getting-started/getting-started.html'
})

export class GettingStartedPage {

  static get parameters() {
    return [NavController];
  }

  constructor(public nav: NavController) {
    this.nav = nav;
  }

  showAlert() {
    let alert = Alert.create({
      title: 'Hello',
      message: 'Hi there!',
      buttons: ['Ok']
    });

    this.nav.present(alert);
  }

  goToFactsPage() {
    this.nav.push(ScientificFactsPage);
  }
}
