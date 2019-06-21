import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {DpShareOptions} from "./dp-share.options";
import {DpShareController} from "./dp-share.controller";
import {ToastProvider} from "../../providers/toast/toast"
import * as html2canvas from 'html2canvas';
import { PhotoLibrary } from '@ionic-native/photo-library';
import {EventProvider} from "../../providers/event/event";
import swal from "sweetalert2";

@Component({
    selector: 'dp-share-image',
    templateUrl: 'dp-share-image.html'
})

export class DpShareImageModal {
    public shareData: DpShareOptions;
    public shareImage;

    public data = {
        user: null,
        checkin: null,
        goal: null,
        event:null
    };

    public year;
    public month;
    public day;
    public date;

    constructor(public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController,
                private photoLibrary: PhotoLibrary,
                private eventProvider: EventProvider,
                private toastProvider: ToastProvider,
                public DpShareCtrl: DpShareController,) {

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

    ionViewDidLoad() {
        this.loadImage();
    }

    loadImage() {
        const loading = this.loadingCtrl.create({
            content: '图片生成中，请稍候...'
        });

        loading.present();

        this.eventProvider.share(this.shareData.extra.id,null).then((data)=>{
            loading.dismiss();

            this.shareImage = data.url;

        }).catch((err)=>{

            loading.dismiss();

            swal({
                title: '生成失败',
                text: '分享图生成失败，请重试',
                type: 'warning',
                showConfirmButton: true,
                confirmButtonText:'重试',
                // width: '80%',
                padding: 0
            }).then((result) => {
                if(result.value) {
                    this.loadImage();
                }
            }, dismiss => {
            });
        })

        // const source = document.getElementById("share-content");
        //
        // var w = source.scrollWidth;
        // var h = source.scrollHeight;
        //
        // const options = {
        //     background: "white",
        //     //canvas: canvasDom,
        //     // height: w,
        //     // width: h,
        //     logging: true,
        //     //useCORS:true,
        //     proxy: 'http://drip.growu.me/uploads/images/html2canvasproxy.php',
        // };
        //
        // setTimeout(() => {
        //     loading.dismiss();
        // }, 5000);
        //
        // html2canvas(source, options).then((canvas) => {
        //     var img = new Image();
        //     img.crossOrigin = 'anonymous';
        //     img.src = canvas.toDataURL("image/png");
        //     this.shareImage = canvas.toDataURL("image/png");
        //     console.log(canvas);
        //     loading.dismiss();
        //     img.onload = () => {
        //         img.onload = null;
        //         img.style.width = w + "px";
        //         img.style.height = h + "px";
        //         document.getElementById('share-image').appendChild(img);
        //     };
        //     img.onerror = (err) => {
        //         this.toastProvider.show("图片生成错误:" + err, 'error');
        //         img.onerror = null;
        //     };
        // }, (err) => {
        //     loading.dismiss();
        //     this.toastProvider.show("图片生成错误", 'error');
        //     console.log(err);
        // });
    }

    doSave() {
        this.photoLibrary.requestAuthorization( {
            read: true,
            write: true
        }).then(() => {
            this.photoLibrary.saveImage(this.shareImage+'&ext=.jpg','水滴打卡',{}).then(()=>{
                this.toastProvider.show("保存成功","success");
            }).catch((err) => {
                console.log(err);
                this.toastProvider.show("保存失败，请重试","error");
            });
        }).catch((err) => {
            this.toastProvider.show("请求相册权限失败","error");
        });
    }



    // doShare() {
    //
    //     if(this.shareImage) {
    //         let DpShare = this.DpShareCtrl.create({
    //                 data: {
    //                     type: 'image',
    //                     title: this.shareData.data.title,
    //                     description: this.shareData.data.description,
    //                     image: this.shareImage,
    //                     thumb: this.shareImage,
    //                     url: "http://drip.growu.me"
    //                 },
    //                 extra:event
    //             })
    //         ;
    //         DpShare.present();
    //     } else {
    //         const loading = this.loadingCtrl.create({
    //             content: '图片生成中，请稍候...'
    //         });
    //
    //         loading.present();
    //
    //         setTimeout(() => {
    //             loading.dismiss();
    //         }, 5000);
    //
    //         const source = document.getElementById("share-content");
    //
    //         var w = source.scrollWidth;
    //         var h = source.scrollHeight;
    //
    //         // var canvasDom = document.createElement("canvas");
    //         // canvasDom.width = w * 2;
    //         // canvasDom.height = h * 2;
    //         // canvasDom.style.width = w + "px";
    //         // canvasDom.style.height = h + "px";
    //         // var context = canvasDom.getContext("2d");
    //         // // 然后将画布缩放，将图像放大两倍画到画布上
    //         // context.scale(2, 2);
    //
    //         const options = {
    //             background: "white",
    //             //canvas: canvasDom,
    //             // height: w,
    //             // width: h,
    //             logging: true,
    //             //useCORS:true,
    //             proxy: 'http://drip.growu.me/uploads/images/html2canvasproxy.php',
    //         };
    //
    //         html2canvas(source, options).then((canvas) => {
    //             var img = new Image();
    //             img.crossOrigin = 'anonymous';
    //             img.src = canvas.toDataURL("image/png");
    //             this.shareImage = canvas.toDataURL("image/png");
    //             console.log(canvas);
    //             img.onload = () => {
    //                 img.onload = null;
    //                 img.style.width = w + "px";
    //                 img.style.height = h + "px";
    //                 document.getElementById('share-image').appendChild(img);
    //
    //                 let DpShare = this.DpShareCtrl.create({
    //                         data: {
    //                             type: 'image',
    //                             title: this.shareData.data.title,
    //                             description: this.shareData.data.description,
    //                             image: this.shareImage,
    //                             thumb: this.shareImage,
    //                             url: "http://drip.growu.me"
    //                         },
    //                         extra:event
    //                     })
    //                 ;
    //                 DpShare.present();
    //
    //             };
    //             img.onerror = (err) => {
    //                 this.toastProvider.show("图片生成错误:"+err,'error');                    img.onerror = null;
    //             };
    //
    //         }, (err) => {
    //             this.toastProvider.show("图片生成错误",'error');
    //             console.log(err);
    //         });
    //     }
    //
    //
    // }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
