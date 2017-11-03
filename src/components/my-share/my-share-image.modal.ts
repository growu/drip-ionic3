import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {MyShareOptions} from "./my-share.options";
import {MyShareController} from "./my-share.controller";
import {ToastProvider} from "../../providers/toast/toast"

import * as html2canvas from 'html2canvas';

@Component({
    selector: 'my-share-image',
    templateUrl: 'my-share-image.html'
})

export class MyShareImageModal {
    public shareData: MyShareOptions;
    public shareImage;

    public year;
    public month;
    public day;
    public date;

    constructor(public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController,
                private toastProvider: ToastProvider,
                public myShareCtrl: MyShareController,) {

        this.shareData = this.params.data;

        var d = new Date();

        this.year = d.getFullYear();

        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        this.month = monthNames[d.getMonth()];

        var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

        this.day = days[d.getDay()];

        this.date = d.getDate()<10?'0'+d.getDate():d.getDate();
    }

    doShare() {

        if(this.shareImage) {
            let myShare = this.myShareCtrl.create({
                    data: {
                        type: 'image',
                        title: this.shareData.data.title,
                        description: this.shareData.data.description,
                        image: this.shareImage,
                        thumb: this.shareImage,
                        url: "http://drip.growu.me"
                    },
                    extra:event
                })
            ;
            myShare.present();
        } else {
            const loading = this.loadingCtrl.create({
                content: '图片生成中，请稍候...'
            });

            loading.present();

            setTimeout(() => {
                loading.dismiss();
            }, 5000);

            const source = document.getElementById("share-content");

            var w = source.scrollWidth;
            var h = source.scrollHeight;

            var canvasDom = document.createElement("canvas");
            canvasDom.width = w * 2;
            canvasDom.height = h * 2;
            canvasDom.style.width = w + "px";
            canvasDom.style.height = h + "px";
            var context = canvasDom.getContext("2d");
            // 然后将画布缩放，将图像放大两倍画到画布上
            context.scale(2, 2);

            const options = {
                background: "white",
                canvas: canvasDom,
                height: w,
                width: h,
                logging: true,
                //useCORS:true,
                proxy: 'http://drip.growu.me/uploads/images/html2canvasproxy.php',
            };

            html2canvas(source, options).then((canvas) => {
                var img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = canvas.toDataURL("image/png");
                this.shareImage = canvas.toDataURL("image/png");
                img.onload = () => {
                    img.onload = null;
                    img.style.width = w + "px";
                    img.style.height = h + "px";
                    document.getElementById('share-image').appendChild(img);

                    let myShare = this.myShareCtrl.create({
                            data: {
                                type: 'image',
                                title: this.shareData.data.title,
                                description: this.shareData.data.description,
                                image: this.shareImage,
                                thumb: this.shareImage,
                                url: "http://drip.growu.me"
                            },
                            extra:event
                        })
                    ;
                    myShare.present();

                };
                img.onerror = (err) => {
                    img.onerror = null;
                };

            }, (err) => {
                this.toastProvider.show("图片生成错误",'error');
                console.log(err);
            });
        }


    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
