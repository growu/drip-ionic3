import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {Storage} from '@ionic/storage';

@IonicPage({
    name: 'message',
    segment: 'message'
})
@Component({
    selector: 'page-message',
    templateUrl: 'message.html',
})
export class MessagePage {

    public messages: any = {
        like_count:0,
        fan_count:0,
        comment_count:0
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        this.storage.get('messages').then((data) => {
            if(data) {
                this.messages = data;
            }
        });
    }

    goPage(page) {
        this.navCtrl.push(page, {});
    }

}
