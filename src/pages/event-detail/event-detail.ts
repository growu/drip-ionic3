import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {MyShareController} from '../../components/my-share/my-share.controller'
import {ToastProvider} from "../../providers/toast/toast";
import {Keyboard} from "@ionic-native/keyboard";
import {CommentProvider} from "../../providers/comment/comment";

@IonicPage({
    name: 'event-detail',
    segment: 'event/:id/detail'
})
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
})
export class EventDetailPage {
    private event: any;
    public isComment:boolean = false;
    public content:string;
    public reply_comment:any;
    @ViewChild('commentInput') commentInput ;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public eventProvider: EventProvider,
                private toastProvider: ToastProvider,
                private keyboard:Keyboard,
                private commentProvider: CommentProvider,
                public actionSheetCtrl: ActionSheetController,
                private myShareCtrl: MyShareController) {

        this.keyboard.onKeyboardHide().subscribe(() =>{
            this.content = null;
            this.reply_comment = null;
            this.isComment = false;
        });

    }

    ionViewDidLoad() {
        this.getEventDetail();
    }

    getEventDetail() {
        var id = this.navParams.get("id");
        this.eventProvider.getEventDetail(id).then((data) => {
            this.event = data;
        });
    }

    goEventLikePage() {
        var id = this.navParams.get("id");
        this.navCtrl.push('page-event-like', {'id': id});
    }

    doShare(){
        let image = null;
        if (this.event.attachs.length > 0) {
            let attach = this.event.attachs[0];
            if (attach.url) {
                image = attach.url;
            }
        }

        let myShare = this.myShareCtrl.create({
                data: {
                    type: 'url',
                    title: this.event.user.nickname + " 的打卡动态",
                    description: this.event.content,
                    image: image,
                    thumb: image,
                    url: "http://drip.growu.me",
                },
                extra:this.event
            })
        ;
        myShare.present();
    }

    goUserHomePage(user) {
        this.navCtrl.push('user-home', {'id': user.id});
    }

    showComment(){
        this.isComment = true;

        setTimeout(() => {
            this.commentInput.setFocus();
        },150);
    }

    doComment() {

        let body = {
            content:this.content,
            reply_id:this.reply_comment?this.reply_comment.id:null
        };

        this.eventProvider.comment(this.event.id,body).then((data) => {
            this.toastProvider.show("评论成功",'success');
            this.event.comments.unshift(data);
            this.keyboard.close();
        }).catch((err)=>{

        });
    }


    doLikeEvent(){
        if (this.event.is_like) {
            this.eventProvider.unLike(this.event.id).then((data) => {
                this.event.is_like = false;
                this.event.like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.eventProvider.like(this.event.id).then((data) => {
                this.event.is_like = true;
                this.event.like_count += 1;
            }).catch((err) => {

            });
        }
    }

    doLikeComment(comment,$event){
        $event.stopPropagation();

        let index = this.event.comments.indexOf(comment);

        if (comment.is_like) {
            this.commentProvider.unLike(comment.id).then((data) => {
                this.event.comments[index].is_like = false;
                this.event.comments[index].like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.commentProvider.like(comment.id).then((data) => {
                this.event.comments[index].is_like = true;
                this.event.comments[index].like_count += 1;
            }).catch((err) => {

            });
        }
    }

    doFavorite() {
        this.toastProvider.show("程序小哥正在加紧开发中...","success");
    }

    showCommentMenu(comment) {
        let actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '回复',
                    role: 'destructive',
                    handler: () => {
                        this.showReplyComment(comment,null);
                    }
                },{
                    text: '举报',
                    handler: () => {
                        this.toastProvider.show("程序小哥正在加紧开发中...","success");
                    }
                },{
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    showReplyComment(comment,$event) {

        if($event) {
            $event.stopPropagation();
        }

        this.isComment = true;
        this.reply_comment = comment;

        setTimeout(() => {
            this.commentInput.setFocus();
        },1000);

    }

    hideComment(){
        this.isComment = false;
        this.reply_comment = null;
    }

}
