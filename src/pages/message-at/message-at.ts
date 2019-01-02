import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name:'message-at',
  segment:'message/at'
})
@Component({
  selector: 'page-message-at',
  templateUrl: 'message-at.html',
})
export class MessageAtPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
