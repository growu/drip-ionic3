import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage, Events} from "ionic-angular";
import {CommentProvider} from "../../providers/comment/comment";
import {UserProvider} from "../../providers/user/user";

@IonicPage({
  name:"message-notice",
  segment:"message/notice"
})
@Component({
  selector: 'page-message-notice',
  templateUrl: 'message-notice.html',
})
export class MessageNoticePage {

    public messages: any = [];
    private perPage: number = 20;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: Events,
              private userProvider: UserProvider
             ) {
  }

  ionViewDidLoad() {
      this.events.publish('messages:update', {});
      this.getNoticeMessages(1);
  }

    getNoticeMessages(page) {
        this.userProvider.getNoticeMessages(page, this.perPage).then((data) => {
            if (data) {
                if (this.messages.length == 0) {
                    this.messages = data;
                } else {
                    this.messages = this.messages.concat(data);
                }
            }
        });
    }

    doRefresh(refresher) {

        this.getNoticeMessages(1);

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {

        var num = this.messages.length;

        if (num > 0 && num % this.perPage == 0) {
            var page = Math.floor(this.messages.length / 20) + 1;
            this.getNoticeMessages(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

    goMessageDetail(message) {
      this.navCtrl.push('message-detail',{id:message.id});
    }


}
