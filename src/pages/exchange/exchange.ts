import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MallProvider} from "../../providers/mall/mall";

@IonicPage({
    name:'exchange',
    segment:'exchange'
})
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {
  
  public logs = [];

  constructor(public navCtrl: NavController,
              private mallProvider: MallProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getExchanges();
  }

    getExchanges() {
    this.mallProvider.getExchanges().then(data=>{
          this.logs = data;
    })
  }

}
