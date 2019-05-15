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
    private perPage: number = 10;
    public isLoading:boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        // this.events.publish('messages:update', {});
        this.isLoading = true;
        this.getFanMessages().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    /**
     * 跳转到用户主页
     * @param user
     */
    goUserHomePage(user) {
        this.navCtrl.push("user-home", {'id': user.id});
    }

    /**
     *
     * @param page
     */
    getFanMessages(isRefresh=false) {

        let offset:number = 0;

        if(!isRefresh) {
            offset = this.messages.length;
        }

        return this.userProvider.getFanMessages(this.perPage,offset).then((data) => {
            if (data) {
                if (offset == 0) {
                    this.messages = data;
                } else {
                    this.messages = this.messages.concat(data);
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

        this.getFanMessages(true).then(data=>{
            refresher.complete();
        }).catch(err=>{
            refresher.complete();
        });
    }

    /**
     * 上拉加载
     * @param infiniteScroll
     */
    doInfinite(infiniteScroll) {

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getFanMessages().then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }

}
