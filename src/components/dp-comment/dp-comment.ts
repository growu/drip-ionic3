import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ActionSheetController, ModalController, NavController} from "ionic-angular";
import {CommentProvider} from "../../providers/comment/comment";

@Component({
    selector: 'dp-comment',
    templateUrl: 'dp-comment.html'
})
export class DpCommentComponent {

    public _comments: any = [];
    public replyComment: any = [];
    @Output() reply = new EventEmitter<any>();

    constructor(protected navCtrl: NavController,
                public actionSheetCtrl: ActionSheetController,
                public commentProvider: CommentProvider,
                protected modalCtrl: ModalController) {
    }

    @Input()
    set comments(value: any) {
        console.log(value);
        this._comments = value;
    }

    /**
     * 显示菜单
     * @param comment
     */
    showMenu(comment) {
        let actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '回复',
                    role: 'destructive',
                    handler: () => {
                        this.doReply(comment, null);
                    }
                }, {
                    text: '举报',
                    handler: () => {
                        // this.toastProvider.show("程序小哥正在加紧开发中...","success");
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    /**
     * 回复评论
     * @param comment
     * @param $event
     */
    doReply(comment, $event) {
        if ($event) {
            $event.stopPropagation();
        }

        console.log(comment);

        this.reply.emit(comment);
    }


    /**
     * 评论
     */
    // doComment() {
    //     let modal = this.modalCtrl.create('comment-create', {});
    //
    //     modal.onDidDismiss(data => {
    //         if (data) {
    //             this._comments.push(data);
    //         }
    //     });
    // }

    /**
     * 点赞
     * @param comment
     * @param $event
     */
    doLike(comment, $event) {
        $event.stopPropagation();

        let index = this._comments.indexOf(comment);

        if (comment.is_liked) {
            this.commentProvider.unLike(comment.id).then((data) => {
                this._comments[index].is_liked = false;
                this._comments[index].like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.commentProvider.like(comment.id).then((data) => {
                this._comments[index].is_liked = true;
                this._comments[index].like_count += 1;
            }).catch((err) => {

            });
        }
    }

}
