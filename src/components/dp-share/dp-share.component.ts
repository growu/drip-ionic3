import {Component} from '@angular/core';
import {ModalController, NavParams, ViewController} from "ionic-angular";
import {SocialSharing} from '@ionic-native/social-sharing';
import {ToastProvider} from '../../providers/toast/toast';
import {DpShareOptions} from "./dp-share.options";
import {DpShareImageModal} from "./dp-share-image.modal";

declare var Wechat;
declare var QQSDK;
declare var WeiboSDK;

@Component({
    selector: 'dp-share',
    templateUrl: 'dp-share.html'
})

export class DpShareComponent {

    public _opts: DpShareOptions;

    constructor(private _viewCtrl: ViewController,
                params: NavParams,
                private socialSharing : SocialSharing,
                public modalCtrl: ModalController,
                private _toastProvider: ToastProvider) {
        this._opts = params.data;
    }

    doImageShare() {
        // this._toastProvider.show("此功能有bug，暂时关闭，具体开放时间另行公告","warnning");
        // return;
        this.dismiss('backdrop');
        let modal = this.modalCtrl.create(DpShareImageModal,this._opts);
        modal.present();
    }

    doWechatShare(type) {
        if (window.hasOwnProperty('cordova')) {
            let message;

            if(this._opts.data.type == 'image') {
                message = {
                    title: this._opts.data.title,
                    description: this._opts.data.description,
                    thumb: this._opts.data.thumb,
                    mediaTagName: "TEST-TAG-001",
                    messageExt: "",
                    messageAction: "<action>dotalist</action>",
                    media:{
                        type: Wechat.Type.IMAGE,
                        image:  this._opts.data.image
                    }
                }
            } else  if(this._opts.data.type == 'url') {
                message = {
                    title: this._opts.data.title,
                    description: this._opts.data.description,
                    thumb: this._opts.data.thumb || 'http://drip.growu.me/img/icon.png',
                    media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: this._opts.data.url
                    }
                };
            }

            Wechat.share({
                message: message,
                scene: type == 'TIMELINE' ? Wechat.Scene.TIMELINE : Wechat.Scene.SESSION   // share to Timeline
            }, () => {
                this._toastProvider.show("分享成功", 'success');
            }, (err) => {
                this._toastProvider.show(err, 'error');
            });
        }
    }

    doQQShare(type) {
        if (window.hasOwnProperty('cordova')) {

            let args = {
                client: QQSDK.ClientType.QQ,
                scene: type == 'QQ' ? QQSDK.Scene.QQ : QQSDK.Scene.QQZone,
                url: this._opts.data.url,
                title:  this._opts.data.title,
                image: this._opts.data.image ? this.formatBase64(this._opts.data.image): 'http://drip.growu.me/img/icon.png',
                description: this._opts.data.description
            };

            if(this._opts.data.type == 'image') {
                QQSDK.shareImage(() => {
                    this._toastProvider.show("分享成功", 'success');
                }, (err) => {
                    this._toastProvider.show(err, 'error');
                }, args);
            } else if(this._opts.data.type == 'url') {
                QQSDK.shareNews(() => {
                    this._toastProvider.show("分享成功", 'success');
                }, (err) => {
                    this._toastProvider.show(err, 'error');
                }, args);
            }
        }
    }

    doWeiboShare() {

        if (window.hasOwnProperty('cordova')) {
            var args = {
                url: this._opts.data.url,
                title: this._opts.data.title,
                description:this._opts.data.description,
                image: this._opts.data.image ? this.formatBase64(this._opts.data.image): 'http://drip.growu.me/img/icon.png'
            };


            if(this._opts.data.type == 'image') {

                WeiboSDK.shareImageToWeibo(() => {
                    this._toastProvider.show("分享成功", 'success');
                }, (err) => {
                    this._toastProvider.show(err, 'error');
                }, args);

            } else if(this._opts.data.type == 'url') {

                WeiboSDK.shareToWeibo(() => {
                    this._toastProvider.show("分享成功", 'success');
                }, (err) => {
                    this._toastProvider.show(err, 'error');
                }, args);
            }
        }
    }

    doMoreShare() {
        this.socialSharing.share(this._opts.data.title,
            this._opts.data.description,
            [this._opts.data.image],
            this._opts.data.url).then(() => {
            // Success!
        }).catch(() => {
            // Error!
        });
    }

    formatBase64(image:string) {
        return  image.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    bgClick() {
        this.dismiss('backdrop');
    }

    dismiss(role: string): Promise<any> {
        return this._viewCtrl.dismiss(null, role, {});
    }
}
