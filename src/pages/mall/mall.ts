import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MallProvider} from "../../providers/mall/mall";


@IonicPage({
     name:'mall',
    segment:'mall'
})
@Component({
  selector: 'page-mall',
  templateUrl: 'mall.html',
})
export class MallPage {

  public goods = [];

  constructor(public navCtrl: NavController,
              private mallProvider: MallProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getMallGoods();
  }

  getMallGoods() {
    this.mallProvider.getGoods().then((data)=>{
      this.goods = data;
    }).catch((err)=>{});
  }

  goGoodDetailPage(good) {
    this.navCtrl.push('good-detail',{id:good.id});
  }

    goExchangePage() {
        this.navCtrl.push('exchange',{});
    }

}
