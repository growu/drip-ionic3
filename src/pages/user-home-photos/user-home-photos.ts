import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name:'user-home-photos',
    segment:'photos'
})
@Component({
  selector: 'page-user-home-photos',
  templateUrl: 'user-home-photos.html',
})
export class UserHomePhotosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
