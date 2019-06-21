import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {Storage} from '@ionic/storage';
import {PostProvider} from "../../providers/post/post";

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

    public posts = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public postProvider: PostProvider,
                public userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        this.getPosts();
    }

    ionViewDidEnter() {
        // 读取消息
        this.storage.get('messages').then((data) => {
            if(data) {
                this.messages = data;
            }
        });
    }

    /**
     * 获取文章列表
     */
    protected getPosts() {
        this.postProvider.getAll().then(data=>{
            this.posts = data;
        });
    }

    /**
     * 跳转页面
     * @param page
     * @param {any} params
     */
    goPage(page,params=null) {
        this.navCtrl.push(page, params);
    }
}
