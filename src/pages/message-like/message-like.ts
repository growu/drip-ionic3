import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage, Events} from "ionic-angular";
import { UserProvider } from '../../providers/user/user'

@IonicPage({
  name:"message-like",
  segment:"message/like"
})
@Component({
  selector: 'page-message-like',
  templateUrl: 'message-like.html',
})
export class MessageLikePage {

  public messages:any = [];
  private perPage:number = 20;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events:Events,
              private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
      this.events.publish('messages:update', {});
      this.getLikeMessages(1);
  }

  getLikeMessages(page) {
    this.userProvider.getLikeMessages(page,this.perPage).then((data)=>{
      if(data) {
        if(this.messages.length ==0){
          this.messages = data;
        } else {
          this.messages = this.messages.concat(data);
        }
      }
    });
  }

  doRefresh(refresher) {

    this.getLikeMessages(1);

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {

    var num = this.messages.length;

    if (num > 0 && num % this.perPage == 0) {
      var page = Math.floor(this.messages.length/20)+1;
      this.getLikeMessages(page);
    }

    setTimeout(() => {
      infiniteScroll.complete();
    }, 2000);
  }

  goEventDetailPage(id) {
    this.navCtrl.push("event-detail",{'id':id});
  }

    goUserHomePage(user) {
        this.navCtrl.push("user-home",{'id':user.id});
    }c



}
