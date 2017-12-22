import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

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
                private storage: Storage) {
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            if(data) {
                this.user = data;
            }
        });

        this.storage.get('messages').then((data) => {
            if(data) {
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
        this.navCtrl.push("user-home", {'id': this.user.id});
    }

    goWalletPage() {
        this.navCtrl.push("wallet", {'user': this.user});
    }
}
