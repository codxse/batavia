import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {IntroPage} from './pages/intro/intro';
import {MainPage} from './pages/main/main';


@Component({
  templateUrl: 'build/app.html'
})

class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;
  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform) {
    this.initializeApp();
    this.platform = platform;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Beranda', component: MainPage },
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ListPage },
      { title: 'Perkenalan', component: IntroPage }
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
