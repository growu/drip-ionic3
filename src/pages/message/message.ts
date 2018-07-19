import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {Storage} from '@ionic/storage';
import {HttpProvider} from "../../providers/http/http";

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
        comment_count:0,
        notice_count:0
    };

    public articles = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public httpProvider: HttpProvider,
                public userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        this.storage.get('messages').then((data) => {
            if(data) {
                this.messages = data;
            }
        });


        this.httpProvider.httpGetWithAuth('/article/top',null).then(
            (data)=>{
                this.articles = data;
            }
        )
    }

    goPage(page) {
        this.navCtrl.push(page, {});
    }


    goArticleDetail(article) {
        this.navCtrl.push('article-detail', {"id":article.id});
    }

}
