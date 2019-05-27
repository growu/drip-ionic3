import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";
import {VersionProvider} from "../../providers/version/version";

@IonicPage({
    name: 'my',
    segment: 'my'
})
@Component({
    selector: 'page-my',
    templateUrl: 'my.html',
})
export class MyPage {
    public user: any;
    public isAudit:boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                public versionProvider: VersionProvider,
                private userProvider: UserProvider,
                private storage: Storage) {

        events.subscribe('messages:update', () => {
            console.log("messages:update");
        });
    }

    ionViewDidLoad() {
        this.isAudit = this.versionProvider.getAudit();
    }

    ionViewDidEnter() {
        this.userProvider.getUserInfo().then(data=>{
            this.user = data;
            this.userProvider.setLocalUser(data);
        });
    }

    /**
     * 跳转页面
     * @param url
     */
    goPage(url) {
        this.navCtrl.push(url);
    }

    goUserHomePage() {
        this.navCtrl.push("user-home", {'id': this.user.id, 'rootNavCtrl': this.navCtrl});
    }

    goWalletPage() {
        this.navCtrl.push("wallet", {'user': this.user});
    }

    // 跳转到用户关注列表
    goUserFollowingPage() {
        this.navCtrl.push("user-following", {id: this.user.id, user: this.user});
    }

    // 跳转到用户粉丝列表
    goUserFollowerPage() {
        this.navCtrl.push("user-follower", {id: this.user.id, user: this.user});
    }
}
