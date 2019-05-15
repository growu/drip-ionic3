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
    private perPage: number = 10;
    private isLoading: boolean = false;

    constructor(public navCtrl: NavController,
                private userProvider: UserProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.isLoading = true;
        this.getCoins().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    /**
     * 获取明细
     * @param {boolean} isRefresh
     * @returns {Promise<Promise<Response>>}
     */
    getCoins(isRefresh=false) {
        let offset:number = 0;

        if(!isRefresh) {
            offset = this.logs.length;
        }

        return this.userProvider.getCoins(this.perPage,offset).then((data) => {
            if (data) {
                if (offset == 0) {
                    this.logs = data;
                } else {
                    this.logs = this.logs.concat(data);
                }
            }
        });
    }

    /**
     * 下拉刷新
     * @param refresher
     */
    doRefresh(refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 10000);

        this.getCoins(true).then(data=>{
            refresher.complete();
        }).catch(err=>{
            refresher.complete();
        });
    }

    /**
     * 上拉加载
     * @param refresher
     */
    doInfinite(infiniteScroll) {
        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getCoins().then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }

}
