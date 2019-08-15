import {Component, ElementRef, ViewChild} from '@angular/core';
import {
    ActionSheetController, AlertController, App, IonicPage, NavController, NavParams,
    Platform
} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {DpShareController} from '../../components/dp-share/dp-share.controller'
import {ToastProvider} from "../../providers/toast/toast";
import {UserProvider} from "../../providers/user/user";

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
    public content:string;
    public replyComment:any;
    public user;
    public isLoading:boolean = false;

    @ViewChild('commentInput') commentInput ;
    @ViewChild('eventContent') eventContent ;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                public eventProvider: EventProvider,
                public userProvider: UserProvider,
                private toastProvider: ToastProvider,
                public actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                private myShareCtrl: DpShareController) {

        this.userProvider.getLocalUser().then(data=>{
            this.user = data;
        })


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
     *
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
     *
     * @returns {Promise<Response>}
     */
    goEventLikePage() {
        var id = this.navParams.get("id");
        this.navCtrl.push('page-event-like', {'id': id});
    }

    /**
     * 跳转到目标主页
     *
     * @returns {Promise<Response>}
     */
    goGoalHomePage(id) {
        this.navCtrl.push('goal-home', {'id':id,'rootNavCtrl':this.navCtrl});
    }

    /**
     * 跳转到用户主页页面
     *
     * @returns {Promise<Response>}
     */
    goUserHomePage(user) {
        this.navCtrl.push('user-home', {'id': user.id,'rootNavCtrl':this.navCtrl});
    }

    /**
     * 分享
     *
     */
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

    /**
     * 评论
     *
     * @param comment
     */
    doComment(comment) {
        this.eventProvider.comment(this.event.id,comment).then((data) => {
            this.toastProvider.show("评论成功",'success');
            //TODO refresh page
            this.comments.unshift(data);
            if(this.platform.is('cordova')) {
                Keyboard.close();
            }
            // this.keyboard.close();
        }).catch((err)=>{

        });
    }

    /**
     * 点赞
     *
     */
    doLike(){
        if (this.event.is_liked) {
            this.eventProvider.unLike(this.event.id).then((data) => {
                this.event.is_liked = false;
                this.event.like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.eventProvider.like(this.event.id).then((data) => {
                this.event.is_liked = true;
                this.event.like_count += 1;
            }).catch((err) => {

            });
        }
    }

    /**
     * 收藏动态
     *
     */
    doFavorite() {
        this.toastProvider.show("该功能正在开发中...","success");
    }

    /**
     * 监听回复评论
     *
     * @param comment
     */
    onReplyChange(comment) {
        this.replyComment = comment;
    }

    /**
     * 显示更多操作
     *
     */
    showMenu() {
        let buttons = [

        ];

        if(this.user.id == this.event.user_id) {
            buttons = [{
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
                }];
        } else {
            buttons = [{
                text: '举报',
                handler: () => {
                   this.setReport();
                }
            }];
        }

        buttons.push({
            text: '取消',
            role: 'cancel',
            handler: () => {

            }
        });

        let actionSheet = this.actionSheetCtrl.create({
            title: '更多操作',
            buttons: buttons
        });

        actionSheet.present();
    }

    /**
     * 举报
     *
     */
    setReport() {

        let alert = this.alertCtrl.create();
        alert.setTitle('请选择举报的原因！');

        alert.addInput({
            type: 'radio',
            label: '色情/低俗内容',
            value: '1',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: '广告推销',
            value: '2',
        });

        alert.addInput({
            type: 'radio',
            label: '反动/政治问题',
            value: '3',
        });

        alert.addInput({
            type: 'radio',
            label: '其他',
            value: '4',
        });


        alert.addButton('取消');
        alert.addButton({
            text: '确定',
            handler: data => {

                let body = {
                    reason: data
                };

                this.eventProvider.report(this.event.id, body).then((data) => {
                    this.toastProvider.show("操作成功", 'success');
                }).catch((err) => {
                });
            }
        });
        alert.present();
    }


}
