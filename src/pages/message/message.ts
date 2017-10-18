import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';

@IonicPage({
    name: 'message',
    segment: 'message'
})
@Component({
    selector: 'page-message',
    templateUrl: 'message.html',
})
export class MessagePage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        // this.userProvider.getNewMessages().then((data)=>{
        //
        // }).catch((err)=>{
        //
        // });
    }

    goPage(page) {
        this.navCtrl.push(page, {});
    }

}
