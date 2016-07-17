import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/data-service/data-service';

/*
  Generated class for the VolumeNilaiEksporScatterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  providers: [DataService],
  templateUrl: 'build/pages/volume-nilai-ekspor-data/volume-nilai-ekspor-data.html',
})
export class VolumeNilaiEksporDataPage {
  private url: string;
  private data: Array<any>;
  private origData: Array<any>;

  constructor(public nav: NavController, public dataService: DataService) {
    console.log('on constructor');
    this.initializeItems();
  }

  private ngOnInit(): void {
    console.log('on ngOnInit');
    this.url = "https://api.kawaljakarta.org/v1/volume-dan-nilai-ekspor";
    this.loadData(this.url);
  }

  private loadData(url): void {
    this.dataService.load(url).then(data => {
      this.origData = this.generateData(data);
      this.data = this.origData;
      // console.log(this.data);
    });
  }

  private generateData(datum): any {
    let objects = []
    for (let object of datum) {
      objects.push({
        cluster: (
          function(name) {
            if (name == 'cluster k1') { return 'c1' }
            if (name == 'cluster k2') { return 'c2' }
            if (name == 'cluster k3') { return 'c3' }
            return 'Mr. Picolo';
          }
        )(object.grup),
        name: object.komoditas
      });
    }
    return objects;
  }

  // Fungsi ini dipake oleh getItems untuk mereset this.data ke data semula yang dari api untuk kemudian di filter
  // Oleh karena itu, fungsi ini akan dipanggil setiap kali user ngetik karakter
  // Jadi lebih baik data dari api disimpan ke variable this.origData
  // this.data nanti tinggal di-reset dengan cara di-assign dengan isi dari this.origData
  // Sehingga ga perlu panggil api tiap user ngetik karakter
  initializeItems() {
    // this.loadData(this.url);
    this.data = this.origData;
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    // var val = ev.target.value;
    // setelah di console.log(ev) value dari ev ada di ev.value, bukan di ev.target.value
    // ga tau apakah dokumentasi ionicnya belum update atau salah setting
    var val = ev.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.data = this.data.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
      this.data = this.data.filter((item) => {
        // Kalo di contohnya, item dari this.data adalah string
        // Sedangkan di sini, item dari this.data adalah object
        // sehingga this.data perlu difilter terhadap item.cluster dan item.name
        return (item.cluster.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
  }

}
