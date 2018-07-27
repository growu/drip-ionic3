    import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'my',
    segment: 'my'
})
@Component({
    selector: 'page-my',
    templateUrl: 'my.html',
})
export class MyPage {
    public user: any = {};
    public messageCount: number = 0;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                private userProvider: UserProvider,
                private storage: Storage) {

        events.subscribe('messages:update', () => {
            console.log("messages:update");
            this.getMessageCount();
        });
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {

        this.getMessageCount();

        this.userProvider.getUserInfo().then((data) => {
            this.user = data;
        }).catch(err => {

        });
    }

    getMessageCount() {
        this.storage.get('messages').then((data) => {
            if (data) {
                this.messageCount = data.total_count;
            }
        });
    }

    goSettingPage() {
        this.navCtrl.push("setting");
    }

    goMessagePage() {
        this.navCtrl.push("message");
    }

    goVipPage($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.navCtrl.push("vip");
    }

    goUserHomePage() {
        this.navCtrl.push("user-home", {'id': this.user.id,'rootNavCtrl':this.navCtrl});
    }

    goWalletPage() {
        this.navCtrl.push("wallet", {'user': this.user});
    }

    // 跳转到用户关注列表
    goUserFollowingPage() {
        this.navCtrl.push("user-following",{id:this.user.id,user:this.user});
    }

    // 跳转到用户粉丝列表
    goUserFollowerPage() {
        this.navCtrl.push("user-follower",{id:this.user.id,user:this.user});
    }
}
