import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {ToastProvider} from "../../providers/toast/toast";
import {CommentProvider} from "../../providers/comment/comment";
import {PostProvider} from "../../providers/post/post";
import {InAppBrowser} from '@ionic-native/in-app-browser';

declare var Keyboard;

@IonicPage({
    segment: 'post/:id',
    name: 'post-detail'
})
@Component({
    selector: 'page-post-detail',
    templateUrl: 'post-detail.html',
})
export class PostDetailPage {

    public post;
    public comments = [];
    public isComment: boolean = false;
    public content: string;
    public replyComment: any;
    private perPage = 10;
    public isLoading:boolean = false;

    constructor(public navCtrl: NavController,
                private postProvider: PostProvider,
                private toastProvider: ToastProvider,
                private iab: InAppBrowser,
                private platform: Platform,
                public navParams: NavParams) {
        if(!this.navParams.get('id')) {
            this.navCtrl.pop();
        }
    }

    ionViewDidLoad() {
        this.getPost();
    }

    /**
     *获取文章
     */
    getPost() {
        this.postProvider.getOne(this.navParams.get('id')).then(data => {
            this.post = data;
            this.getPostComments();
        });
    }

    /**
     * 获取评论
     */
    getPostComments() {
        let offset  = this.comments.length;
        return this.postProvider.getComments(this.navParams.get('id'),this.perPage,offset).then(data => {
            if(offset == 0) {
                this.comments = data;
            } else {
                this.comments = this.comments.concat(data);
            }
        });
    }

    /**
     * 加载评论
     * @param infiniteScroll
     */
    doInfinite(infiniteScroll) {

        // if(this.isLoading) {
        //     infiniteScroll.complete();
        //     return;
        // }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getPostComments().then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }


    /**
     * 点赞
     */
    doLike(action) {
        if(action == 'add') {
            this.postProvider.like(this.post.id).then((data) => {
                this.post.is_liked = true;
                this.post.like_count ++;
            });
        } else if(action == 'delete') {
            this.postProvider.unLike(this.post.id).then((data) => {
                this.post.is_liked = false;
                this.post.like_count --;
            });
        }
    }

    /**
     * 评论
     *
     * @param id
     */
    doComment(comment) {
        this.postProvider.comment(this.post.id, comment).then((data) => {
            this.toastProvider.show("评论成功", 'success');
            this.post.comments.unshift(data);
            // this.keyboard.close();
        }).catch((err) => {

        });
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
     * 跳转到外部页面
     */
    goPage() {
        this.iab.create("https://drip.growu.me/post/"+this.post.id, '_blank', 'toolbar=yes');
    }

}
