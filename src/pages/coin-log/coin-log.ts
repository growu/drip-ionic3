import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'coin-log'
})
@Component({
    selector: 'page-coin-log',
    templateUrl: 'coin-log.html',
})
export class CoinLogPage {

    public logs: any = [];
    private perPage: number = 20;

    constructor(public navCtrl: NavController,
                private userProvider: UserProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.getCoinLogs(1);
    }

    getCoinLogs(page) {
        this.userProvider.getCoinLogs(page, this.perPage).then((data) => {
            if (data) {
                if (this.logs.length == 0) {
                    this.logs = data;
                } else {
                    this.logs = this.logs.concat(data);
                }
            }
        });
    }

    doRefresh(refresher) {

        this.getCoinLogs(1);

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {

        var num = this.logs.length;

        if (num > 0 && num % this.perPage == 0) {
            var page = Math.floor(this.logs.length / 20) + 1;
            this.getCoinLogs(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

}
