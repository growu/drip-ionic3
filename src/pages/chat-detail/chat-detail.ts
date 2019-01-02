import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {ToastProvider} from "../../providers/toast/toast";
import {Storage} from '@ionic/storage';

@IonicPage({
  name:'chat-detail',
  segment:'chat/detail'
})
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

  public messages:Array<any> = [];

  public toUser:any;
  public user:any;
  public content:any;

  perPage:number = 20;

  constructor(public navCtrl: NavController,
    private userProvider: UserProvider,
    private storage:Storage,
    private toastProvider:ToastProvider,
     public navParams: NavParams) {
    this.toUser = this.navParams.get("user");
    console.log(this.toUser);
  }

  ionViewDidLoad() {
    this.getUser();
  }

  getUser() {
  //   this.userProvider.getUser(this.toUser.id).then((data) => {
  //     this.toUser = data;
  // });

    this.storage.get('user').then((user)=>{
      this.user = user;
      this.getMessages(1);
    })
  }

  getMessages(page) {
    this.userProvider.getPrivateMessageDetail(this.toUser.id,page, this.perPage).then((data) => {
        if (data) {
            if (this.messages.length == 0) {
                this.messages = data;
            } else {
                this.messages = this.messages.concat(data);
            }
        }
    });
}

doComment() {

  let body = {
      user_id:this.toUser.id,
      content:this.content
  };

  this.userProvider.sendPrivateMessage(body).then((data) => {
    this.toastProvider.show("发送成功","success")
    this.messages.unshift(data);
  }).catch((err)=>{

  });
}


}
