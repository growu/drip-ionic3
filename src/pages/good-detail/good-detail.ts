import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MallProvider} from "../../providers/mall/mall";
import {ToastProvider} from "../../providers/toast/toast";
import {Storage} from '@ionic/storage';

@IonicPage({
    name: 'good-detail',
    segment:'good/:id'
})
@Component({
  selector: 'page-good-detail',
  templateUrl: 'good-detail.html',
})
export class GoodDetailPage {

  public good;

  constructor(public navCtrl: NavController,
              private mallProvider: MallProvider,
              private storage: Storage,
              private toastProvider: ToastProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getGoodDetail(this.navParams.get('id'));
  }

  getGoodDetail(id) {
    this.mallProvider.getGoodDetail(id).then(data=>{
      this.good = data;
    }).catch(err=>{});
  }

  doExchange() {
      this.mallProvider.doExchangeGood(this.good.id).then(data=>{
          if(data) {
            this.toastProvider.show("兑换成功","success");
            this.storage.set('user',data);
          } else {
              this.toastProvider.show("兑换失败","error");
          }
      }).catch(err=>{});
  }

}
