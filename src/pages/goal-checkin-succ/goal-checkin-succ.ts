import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import * as html2canvas from 'html2canvas';
import {ToastProvider} from "../../providers/toast/toast";
import {DpShareController} from "../../components/dp-share/dp-share.controller";
import {EventProvider} from "../../providers/event/event";
import swal from "sweetalert2";
import { PhotoLibrary } from '@ionic-native/photo-library';

@IonicPage({
    name: 'goal-checkin-succ'
})
@Component({
    selector: 'page-goal-checkin-succ',
    templateUrl: 'goal-checkin-succ.html',
})
export class GoalCheckinSuccPage {
    public shareImage;
    public data = {
        user: null,
        checkin: null,
        goal: null,
        event:null
    };

    public year;
    public date;
    public month;
    public day;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                private viewCtrl: ViewController,
                private myShareCtrl: DpShareController,
                private photoLibrary: PhotoLibrary,
                private toastProvider: ToastProvider,
                private eventProvider: EventProvider,
                public navParams: NavParams) {

        this.data = this.navParams.get('data');
        console.log(this.data.checkin);

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

        this.eventProvider.share(this.data.event.event_id,null).then((data)=>{
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

    // 调用分享
    doShare() {

        let myShare = this.myShareCtrl.create({
                data: {
                    type: 'image',
                    title: this.data.user.nickname + "坚持#"+this.data.goal.name+'#第'+this.data.checkin.total_days+'天',
                    description: this.data.checkin.content || '打卡动态',
                    image: this.shareImage,
                    thumb: this.shareImage,
                    url: "http://drip.growu.me/event/"+this.data.event.event_id
                },
                extra:event
            })
        ;
        myShare.present();
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

    // 关闭界面
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
