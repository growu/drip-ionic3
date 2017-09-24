import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage({
  name:'my',
  segment:'my'
})
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  goSettingPage() {
    this.navCtrl.push("setting");
  }

  goMessagePage() {
    this.navCtrl.push("message");
  }

  goUserHomePage() {
    this.navCtrl.push("page-user-home",{'id':8});
  }
}
