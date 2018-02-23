import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user'

@IonicPage({
    name: 'message-fan',
    segment: 'message/fan'
})
@Component({
    selector: 'page-message-fan',
    templateUrl: 'message-fan.html',
})
export class MessageFanPage {

    public messages: any = [];
    private perPage: number = 20;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        this.events.publish('messages:update', {});
        this.getFanMessages(1);
    }

    goUserHomePage(user) {
        this.navCtrl.push("user-home", {'id': user.id});
    }

    getFanMessages(page) {
        this.userProvider.getFanMessages(page, this.perPage).then((data) => {
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

        this.getFanMessages(1);

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {

        var num = this.messages.length;

        if (num > 0 && num % this.perPage == 0) {
            var page = Math.floor(this.messages.length / 20) + 1;
            this.getFanMessages(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

}
