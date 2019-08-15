import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserProvider} from "./../../providers/user/user";
import {SuperTabsController} from "ionic2-super-tabs/dist/index";
import {Content} from 'ionic-angular'


@IonicPage({
    priority: 'high',
    name: 'user-home',
    segment: 'user/:id/home'
})
@Component({
    selector: 'page-user-home',
    templateUrl: 'user-home.html',
})
export class UserHomePage {

    @ViewChild(Content) content: Content;

    public user: any;
    public mode: string = "more";
    public followStatus: boolean = false;
    public isLocalUser: boolean = false;

    page1: any = "user-home-events";
    page2: any = "user-home-goals";
    page3: any = "user-home-photos";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private superTabsCtrl: SuperTabsController,
                private ref: ChangeDetectorRef,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        this.userProvider.getUsersInfo(this.navParams.get('id')).then((data) => {
            if (data) {
                this.user = data;
            }
        });

        this.isLocalUser = this.userProvider.isLocalUser(this.navParams.get('id'));
    }

    doRefresh() {

    }

    /**
     * 关注
     *
     */
    doFollow() {
        this.userProvider.follow(this.user.id).then((data) => {
            if (data) {
                this.user.is_following = true;
            }
        }).catch(err=>{

        });
    }

    /**
     * 取消关注
     *
     */
    doUnFollow() {
        this.userProvider.unFollow(this.user.id).then((data) => {
            if (data) {
                this.user.is_following = false;
            }
        });
    }

    /**
     * 进入关注列表
     *
     */
    goUserFollowingPage() {
        this.navCtrl.push("user-following", {id: this.user.id, user: this.user});
    }

    /**
     * 进入粉丝列表
     *
     */
    goUserFanPage() {
        this.navCtrl.push("user-follower", {id: this.user.id, user: this.user});
    }

    /**
     * 进入私信页面
     *
     */
    goChatPage() {
        this.navCtrl.push("chat-detail", {user: this.user});
    }

    ngAfterViewInit() {
        this.content.ionScroll.subscribe((scroll) => {
            console.log('scrolling ', scroll);

            if (scroll.scrollTop > 100) {
                this.mode = "less";
            } else {
                this.mode = "more";
            }

            console.log(this.mode);

            this.ref.detectChanges();

        });
    }

}
