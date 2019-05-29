import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {ToastProvider} from "../../providers/toast/toast";
import {Storage} from '@ionic/storage';

@IonicPage({
    name: 'chat-detail',
    segment: 'chat/detail'
})
@Component({
    selector: 'page-chat-detail',
    templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

    public messages: Array<any> = [];

    public toUser: any;
    public user: any;
    public content: any;

    perPage: number = 20;

    constructor(public navCtrl: NavController,
                private userProvider: UserProvider,
                private storage: Storage,
                private toastProvider: ToastProvider,
                public navParams: NavParams) {
        this.toUser = this.navParams.get("user");
        console.log(this.toUser);
    }

    ionViewDidLoad() {
        this.getUser();
    }

    async getUser() {
        this.user = await this.storage.get('user');
        this.getMessages();
    }

    /**
     * 获取消息
     * @param {boolean} isRefresh
     * @returns {Promise<Promise<Response>>}
     */
    getMessages(isRefresh=false) {
        let offset:number = 0;
        if(!isRefresh) {
            offset = this.messages.length;
        }

        return this.userProvider.getPrivateMessageWithUser(this.toUser['id'], this.perPage, offset).then((data) => {
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

        this.getMessages(true).then(data=>{
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

        this.getMessages().then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }

    doComment() {

        let body = {
            user_id: this.toUser['id'],
            content: this.content
        };

        this.userProvider.sendPrivateMessage(body).then((data) => {
            this.toastProvider.show("发送成功", "success")
            this.messages.unshift(data);
            this.content = null;
        }).catch((err) => {

        });
    }


}
