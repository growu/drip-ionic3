import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
  segment:'message/private',
  name:"message-private"
})
@Component({
  selector: 'page-message-private',
  templateUrl: 'message-private.html',
})
export class MessagePrivatePage {

  perPage:number = 20;
  messages:Array<any> = [];

  constructor(public navCtrl: NavController, 
    private userProvider: UserProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getMessages(1);    
  }

  getMessages(page) {
    this.userProvider.getPrivateMessages(page, this.perPage).then((data) => {
      if (data) {
          if (this.messages.length == 0) {
              this.messages = data;
          } else {
              this.messages = this.messages.concat(data);
          }
      }
  });
  }

  goChatDetailPage(user) {
    this.navCtrl.push("chat-detail",{userID:6,user:user});
  }

}
