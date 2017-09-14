import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';

@IonicPage({
  name:"setting"
})
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private appRate: AppRate
      ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  goPage(name:string) {
    this.navCtrl.push(name);
  }

  goAppRate() {
    // or, override the whole preferences object
    this.appRate.preferences = {
      usesUntilPrompt: 3,
      storeAppURL: {
        ios: '<app_id>',
        android: 'market://details?id=<package_name>',
        windows: 'ms-windows-store://review/?ProductId=<store_id>'
      }
    };

    this.appRate.promptForRating(false);
  }

}
