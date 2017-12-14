import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name:'message-detail',
    segment:'message/:id/detail'
})
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {
  private message;

  constructor(public navCtrl: NavController,
              private userProvider: UserProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');

      this.userProvider.getMessageDetail(id).then((data) => {
        this.message = data;

      }).catch((err)=>{

      });
  }

}
