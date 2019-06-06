import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage, Events} from "ionic-angular";
import {UserProvider} from '../../providers/user/user'
import {CommentProvider} from '../../providers/comment/comment'

@IonicPage({
    name: "message-comment",
    segment: "message/comment"
})
@Component({
    selector: 'page-message-comment',
    templateUrl: 'message-comment.html',
})
export class MessageCommentPage {
    public messages: any = [];
    private perPage: number = 10;
    public isShowReply: boolean = false;
    public replyMessage = {
        'comment': {
            'id': 0
        },
    };
    public replyContent: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userProvider: UserProvider,
                private events: Events,
                private commentProvider: CommentProvider) {
    }

    ionViewDidLoad() {
        this.events.publish('messages:update', {});
        this.getCommentMessages(true).then(data=>{

        });
    }

    /**
     * 跳转到用户ID
     *
     * @param id
     */
    goUserHomePage(id) {
        this.navCtrl.push("user-home", {'id': id});
    }

    /**
     * 获取评论消息
     *
     * @param {boolean} isRefresh
     * @returns {Promise<Promise<Response>>}
     */
    getCommentMessages(isRefresh:boolean = false) {
        if(isRefresh) {
            this.messages = [];
        }

        return this.userProvider.getCommentMessages(this.perPage,this.messages.length).then((data) => {
            if (data) {
                if (this.messages.length == 0) {
                    this.messages = data;
                } else {
                    this.messages = this.messages.concat(data);
                }
            }
        });
    }

    /**
     * 刷新
     *
     * @param refresher
     */
    doRefresh(refresher) {

        setTimeout(() => {
            refresher.complete();
        }, 10000);

        this.getCommentMessages(true).then(data=>{
            refresher.complete();
        });
    }

    /**
     * 加载
     *
     * @param infiniteScroll
     */
    doInfinite(infiniteScroll) {

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getCommentMessages().then(data=>{
            infiniteScroll.complete();
        });

    }

    /**
     * 点击回复
     *
     * @param message
     * @param $event
     */
    doReply(message, $event) {
        $event.stopPropagation();
        this.isShowReply = true;
        this.replyMessage = message;
    }

    /**
     * 提价回复
     *
     */
    submitReply() {
        this.commentProvider.reply(this.replyMessage.comment.id, this.replyContent).then((data) => {
            this.isShowReply = false;
        });
    }

    goEventDetailPage(id) {
        this.navCtrl.push("event-detail", {'id': id});
    }


}
