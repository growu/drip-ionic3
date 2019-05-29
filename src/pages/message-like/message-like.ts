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
  private perPage:number = 10;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events:Events,
              private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
      this.events.publish('messages:update', {});
      this.getLikeMessages();
  }

  /**
   * 获取点赞消息
   * @param {boolean} isRefresh
   */
  getLikeMessages(isRefresh:boolean=false) {
    return this.userProvider.getLikeMessages(this.perPage,this.messages.length).then((data)=>{
      if(data) {
        if(isRefresh || this.messages.length == 0) {
          this.messages = data;
        } else {
          this.messages = this.messages.concat(data);
        }
      }
    });
  }

  doRefresh(refresher) {

    this.getLikeMessages().then(data=>{
        refresher.complete();
    }).catch(err=>{
        refresher.complete();
    });

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {

      this.getLikeMessages().then(data=>{
          infiniteScroll.complete();
      }).catch(err=>{
          infiniteScroll.complete();
      });

    setTimeout(() => {
      infiniteScroll.complete();
    }, 2000);
  }

  /**
   * 进入动态详情
   * @param id
   */
  goEventDetailPage(id) {
    this.navCtrl.push("event-detail",{'id':id});
  }

  /**
   * 进入动态详情
   * @param id
   */
  goUserHomePage(id) {
      this.navCtrl.push("user-home",{'id':id});
  }



}
