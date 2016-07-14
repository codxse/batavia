import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
// import {GettingStartedPage} from './pages/getting-started/getting-started';
// import {ListPage} from './pages/list/list';
import {IntroPage} from './pages/intro/intro';
import {MainPage} from './pages/main/main';
import {CreditPage} from './pages/credit/credit';
import {MakroMenuPage} from './pages/makro-menu/makro-menu';
import {MikroMenuPage} from './pages/mikro-menu/mikro-menu';


@Component({
  templateUrl: 'build/app.html'
})

class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;
  pages: Array<{title: string, component: any, icon: string}>

  constructor(private platform: Platform) {
    this.initializeApp();
    this.platform = platform;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Beranda', component: MainPage, icon: 'home' },
      { title: 'Topik Ekonomi Makro', component: MakroMenuPage, icon: 'globe' },
      { title: 'Topik Ekonomi Mikro', component: MikroMenuPage, icon: 'pizza' },
      { title: 'Kredit', component: CreditPage, icon: 'paper' },
      { title: 'Perkenalan', component: IntroPage, icon: 'megaphone' },
      // { title: 'Getting Started', component: GettingStartedPage, icon: 'home' },
      // { title: 'List', component: ListPage, icon: 'home' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
