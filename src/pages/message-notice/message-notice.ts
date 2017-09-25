import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from "ionic-angular";

@IonicPage({
  name:"message-notice",
  segment:"message/notice"
})
@Component({
  selector: 'page-message-notice',
  templateUrl: 'message-notice.html',
})
export class MessageNoticePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageNoticePage');
  }

}
