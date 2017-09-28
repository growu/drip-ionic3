import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name:'my',
  segment:'my'
})
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
  user:any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then((data)=>{
      this.user = data;
    });

  }

  goSettingPage() {
    this.navCtrl.push("setting");
  }

  goMessagePage() {
    this.navCtrl.push("message");
  }

  goUserHomePage() {
    this.navCtrl.push("user-home",{'id':this.user.id});
  }
}
