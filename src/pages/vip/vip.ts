import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name: 'vip',
    segment: 'vip'
})
@Component({
  selector: 'page-vip',
  templateUrl: 'vip.html',
})
export class VipPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
