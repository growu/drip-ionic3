import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {ToastProvider} from "../../providers/toast/toast";
import {CommentProvider} from "../../providers/comment/comment";

declare var Keyboard;

@IonicPage({
    segment:'article/:id/detail',
    name:'article-detail'
})
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {

    public article;
    public comments = [];
    public isComment:boolean = false;
    public content:string;
    public reply_comment:any;

    constructor(public navCtrl: NavController,
              private httpProvider: HttpProvider,
              private toastProvider: ToastProvider,
              private commentProvider: CommentProvider,
              private platform: Platform,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get("id");

    this.httpProvider.httpGetWithAuth('/posts/'+id,null).then(
        (data)=>{
          this.article = data;
        }
    )
  }

  doLike() {

        let body = {
            content:this.content,
            reply_id:this.reply_comment?this.reply_comment.id:null
        };

        this.httpProvider.httpPostWithAuth('/article/'+this.article.id+'/like',body).then((data) => {
           this.article.like_count += 1;
           console.log( this.article.like_count);
        }).catch((err)=>{

        });
    }

    doLikeComment(comment,$event){
        $event.stopPropagation();

        let index = this.article.comments.indexOf(comment);

        if (comment.is_like) {
            this.commentProvider.unLike(comment.id).then((data) => {
                this.article.comments[index].is_like = false;
                this.article.comments[index].like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.commentProvider.like(comment.id).then((data) => {
                this.article.comments[index].is_like = true;
                this.article.comments[index].like_count += 1;
            }).catch((err) => {

            });
        }
    }



    doComment() {

        let body = {
            content:this.content,
            reply_id:this.reply_comment?this.reply_comment.id:null
        };

        this.httpProvider.httpPostWithAuth('/article/'+this.article.id+'/comment',body).then((data) => {
            this.toastProvider.show("评论成功",'success');
            this.article.comments.unshift(data);

            if(this.platform.is('cordova')) {
                Keyboard.close();
            }
            // this.keyboard.close();
        }).catch((err)=>{

        });
    }

  goPage() {

  }

}
