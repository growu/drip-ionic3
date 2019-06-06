import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ToastProvider} from "../../providers/toast/toast";
import {Keyboard} from "@ionic-native/keyboard";
import {Platform} from "ionic-angular";

@Component({
    selector: 'dp-comment-toolbar',
    templateUrl: 'dp-comment-toolbar.html'
})
export class DpCommentToolbarComponent {
    @ViewChild('commentInput') commentInput;

    public isComment: boolean = false;
    public content: string;
    public _replyComment: any;
    public _source: any;

    @Output() like = new EventEmitter<any>();
    @Output() comment = new EventEmitter<any>();
    @Output() favorite = new EventEmitter<any>();

    constructor(private toastProvider: ToastProvider,
                private platform: Platform,
                ) {
        window.addEventListener('keyboardDidHide', () => {
            this.content = null;
            this._replyComment = null;
            this.isComment = false;
        });
    }

    @Input()
    set source(source) {
        this._source = source;
    }

    @Input()
    set replyComment(comment) {
        if(!comment || (typeof comment == "undefined")) return;
        this._replyComment = comment;
        this.showComment();
    }

    /**
     * 收藏
     */
    doFavorite() {
        this.toastProvider.show("收藏成功", "success");
    }

    /**
     * 显示评论
     */
    showComment() {
        this.isComment = true;

        // if(this.platform.is('cordova')) {
        //     Keyboard.show();
        // }

        setTimeout(() => {
            this.commentInput.setFocus();
        }, 1000);
    }

    /**
     * 评论
     */
    doComment() {

        let body = {
            content: this.content,
            reply_id: this._replyComment ? this._replyComment.id : null
        };

        console.log(body);

        this.comment.emit(body);
        this.isComment = false;
        // if (this.platform.is('cordova')) {
        //     Keyboard.close();
        // }
    }

    /**
     * 评论
     */
    doLike() {
        if(this._source.is_liked) {
            this.like.emit('delete');
        } else {
            this.like.emit('add');
        }
    }
}
