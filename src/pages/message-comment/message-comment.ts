import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";
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
    private perPage: number = 20;
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
                private commentProvider: CommentProvider) {
    }

    ionViewDidLoad() {
        this.getCommentMessages(1);
    }

    goUserHomePage(user) {
        this.navCtrl.push("user-home", {'id': user.id});
    }

    getCommentMessages(page) {
        this.userProvider.getCommentMessages(page, this.perPage).then((data) => {
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

        this.getCommentMessages(1);

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {

        var num = this.messages.length;

        if (num > 0 && num % this.perPage == 0) {
            var page = Math.floor(this.messages.length / 20) + 1;
            this.getCommentMessages(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

    doReply(message, $event) {
        $event.stopPropagation();
        this.isShowReply = true;
        this.replyMessage = message;
    }

    submitReply() {
        this.commentProvider.reply(this.replyMessage.comment.id, this.replyContent).then((data) => {
            this.isShowReply = false;
        });
    }

    goEventDetailPage(id) {
        this.navCtrl.push("event-detail", {'id': id});
    }


}
