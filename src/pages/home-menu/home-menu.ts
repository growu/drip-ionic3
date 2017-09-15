import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { SettingModel } from '../../models/setting.model'

@IonicPage({
  name:'home-menu',
})
@Component({
  selector: 'page-home-menu',
  templateUrl: 'home-menu.html',
})
export class HomeMenuPage {

  public setting:SettingModel;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController
              ) {
    if(this.navParams.data) {
      delete this.navParams.data.opts;
      this.setting = this.navParams.data;
    }
  }

  ionViewDidLoad() {

  }

  onChangeViewMode() {
    this.viewCtrl.dismiss(this.setting);
  }

  onChangeCalendarMode() {
    this.viewCtrl.dismiss(this.setting);
  }

}
