import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage, Events} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: "message-notice",
    segment: "message/notice"
})
@Component({
    selector: 'page-message-notice',
    templateUrl: 'message-notice.html',
})
export class MessageNoticePage {

    public messages: any = [];
    private perPage: number = 10;
    public isLoading:boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        // this.events.publish('messages:update', {});
        this.isLoading = true;
        this.getNoticeMessages().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    /**
     * 获取通知
     * @param {boolean} isRefresh
     * @returns {Promise<Promise<Response>>}
     */
    getNoticeMessages(isRefresh=false) {
        let offset:number = 0;

        if(isRefresh) {
            offset = this.messages.length;
        }

        return this.userProvider.getNoticeMessages(this.perPage,offset).then((data) => {
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

        this.getNoticeMessages(true).then(data=>{
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

        this.getNoticeMessages().then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }

    /**
     * 跳转到消息详情
     * @param message
     */
    goMessageDetail(message) {
        this.navCtrl.push('message-detail', {id: message.id});
    }


}
