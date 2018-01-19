import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name: 'vip',
    segment: 'vip'
})
@Component({
  selector: 'page-vip',
  templateUrl: 'vip.html',
})
export class VipPage {

    private user:any;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private storage: Storage,
              private toastProvider: ToastProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {

      this.storage.get('user').then((data) => {
          if(data) {
              this.user = data;
          }
      });
  }

  showBuyPage() {
      let alert = this.alertCtrl.create({
          title: '抱歉',
          subTitle: '此功能内测中，如需体验请联系微信：foxmee',
          buttons: ['好吧']
      });
      alert.present();
      // this.toastProvider.show("暂未开放，详情请咨询微信：foxmee",'warning');
  }

}
