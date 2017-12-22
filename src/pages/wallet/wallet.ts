import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name:'wallet'
})
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  private user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
  }

  goCoinLogPage() {
    this.navCtrl.push('coin-log',{});
  }

    goCheckinPage() {
        this.navCtrl.push('home',{});
    }

    goSharePage() {
        this.navCtrl.push('event',{});
    }

    goFeedbackPage() {
        this.navCtrl.push('feedback',{});
    }

}
