import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActionSheetController, App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {MyShareController} from '../../components/my-share/my-share.controller'
import {ToastProvider} from "../../providers/toast/toast";
import {CommentProvider} from "../../providers/comment/comment";
import {Storage} from '@ionic/storage';

declare var Keyboard;

@IonicPage({
    name: 'event-detail',
    segment: 'event/:id/detail',
    defaultHistory:['event']
})
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
})
export class EventDetailPage {
    private event: any;
    private likes: any[] = [];
    private comments: any[] = [];
    public isComment:boolean = false;
    public content:string;
    public reply_comment:any;
    public user;
    public isLoading:boolean = false;

    @ViewChild('commentInput') commentInput ;
    @ViewChild('eventContent') eventContent ;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private storage: Storage,
                public eventProvider: EventProvider,
                private toastProvider: ToastProvider,
                private commentProvider: CommentProvider,
                public actionSheetCtrl: ActionSheetController,
                private myShareCtrl: MyShareController) {

        // this.keyboard.onKeyboardHide().subscribe(() =>{
        //     this.content = null;
        //     this.reply_comment = null;
        //     this.isComment = false;
        // });

        window.addEventListener('keyboardDidHide', () => {
            this.content = null;
            this.reply_comment = null;
            this.isComment = false;
        });

        this.storage.get('user').then(data=>{
           this.user = data;
        });

    }

    ionViewDidLoad() {
        this.getEventDetail().then(data=>{
            this.eventProvider.getEventLikes(this.navParams.get("id"),6,0).then(data => {
                this.likes = data;
            });

            this.isLoading = true;
            this.eventProvider.getEventComments(this.navParams.get("id"),6,0).then(data => {
                this.comments = data;
                this.isLoading = false;
            }).catch(err=>{
                this.isLoading = false;
            });
        });
    }

    /**
     * 获取动态详情
     * @returns {Promise<Response>}
     */
    getEventDetail() {
        var id = this.navParams.get("id");
        return this.eventProvider.getEventDetail(id).then((data) => {
            this.event = data;
        });
    }

    /**
     * 跳转到动态点赞页面
     * @returns {Promise<Response>}
     */
    goEventLikePage() {
        var id = this.navParams.get("id");
        this.navCtrl.push('page-event-like', {'id': id});
    }

    /**
     * 跳转到目标主页
     * @returns {Promise<Response>}
     */
    goGoalHomePage(id) {
        this.navCtrl.push('goal-home', {'id':id,'rootNavCtrl':this.navCtrl});
    }

    /**
     * 跳转到用户主页页面
     * @returns {Promise<Response>}
     */
    goUserHomePage(user) {
        this.navCtrl.push('user-home', {'id': user.id});
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
                    description: this.event.content || "第"+this.event.checkin.total_days+'天',
                    image: image,
                    thumb: image,
                    url: "http://drip.growu.me/event/"+this.event.event_id,
                },
                extra:this.event
            })
        ;
        myShare.present();
    }



    showComment(){
        this.isComment = true;

        // if(this.platform.is('cordova')) {
        //     Keyboard.show();
        // }

        setTimeout(() => {
            this.commentInput.setFocus();
        },1000);
    }

    doComment() {

        let body = {
            content:this.content,
            reply_id:this.reply_comment?this.reply_comment.id:null
        };

        this.eventProvider.comment(this.event.id,body).then((data) => {
            this.toastProvider.show("评论成功",'success');
            this.comments.unshift(data);

            if(this.platform.is('cordova')) {
                Keyboard.close();
            }
            // this.keyboard.close();
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

        let index = this.comments.indexOf(comment);

        if (comment.is_like) {
            this.commentProvider.unLike(comment.id).then((data) => {
                this.comments[index].is_like = false;
                this.comments[index].like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.commentProvider.like(comment.id).then((data) => {
                this.comments[index].is_like = true;
                this.comments[index].like_count += 1;
            }).catch((err) => {

            });
        }
    }

    doFavorite() {
        this.toastProvider.show("该功能正在开发中...","success");
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

        // if(this.platform.is('cordova')) {
        //     Keyboard.show();
        // }

        setTimeout(() => {
            this.commentInput.setFocus();
        },1000);

    }

    hideComment(){
        this.isComment = false;
        this.reply_comment = null;
        this.content = null;
    }

    // 显示菜单
    showMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '我的动态',
            buttons: [
                {
                    text: '转为私密',
                    handler: () => {
                       this.eventProvider.updateEvent(this.event,{'is_public':0}).then(data=>{
                            if(data) {
                                this.toastProvider.show("操作成功","success");
                            }
                       }).catch(err=>{});
                    }
                },
                {
                    text: '删除',
                    role: 'destructive',
                    handler: () => {
                        this.eventProvider.deleteEvent(this.event).then(data=>{
                            if(data) {
                                this.toastProvider.show("删除成功","success");
                                this.navCtrl.pop();
                            }
                        }).catch(err=>{})
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }


}
