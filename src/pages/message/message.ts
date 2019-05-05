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
        // TODO make as provider
        // 获取文章列表
        this.httpProvider.httpGetWithAuth('/posts',null).then(
            (data)=>{
                this.articles = data;
            }
        )
    }

    ionViewDidEnter() {
        // 读取消息
        this.storage.get('messages').then((data) => {
            if(data) {
                this.messages = data;
            }
        });
    }

    // 跳转页面
    goPage(page,params=null) {
        this.navCtrl.push(page, params);
    }

}
