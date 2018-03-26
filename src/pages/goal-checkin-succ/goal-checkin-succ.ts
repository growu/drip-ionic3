import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import * as html2canvas from 'html2canvas';
import {ToastProvider} from "../../providers/toast/toast";
import {MyShareController} from "../../components/my-share/my-share.controller";

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
        goal: null
    };

    public year;
    public date;
    public month;
    public day;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                private viewCtrl: ViewController,
                private myShareCtrl: MyShareController,
                private toastProvider: ToastProvider,
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

        const source = document.getElementById("share-content");

        var w = source.scrollWidth;
        var h = source.scrollHeight;

        const options = {
            background: "white",
            //canvas: canvasDom,
            // height: w,
            // width: h,
            logging: true,
            //useCORS:true,
            proxy: 'http://drip.growu.me/uploads/images/html2canvasproxy.php',
        };

        setTimeout(() => {
            loading.dismiss();
        }, 5000);

        html2canvas(source, options).then((canvas) => {
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = canvas.toDataURL("image/png");
            this.shareImage = canvas.toDataURL("image/png");
            console.log(canvas);
            loading.dismiss();
            img.onload = () => {
                img.onload = null;
                img.style.width = w + "px";
                img.style.height = h + "px";
                document.getElementById('share-image').appendChild(img);
            };
            img.onerror = (err) => {
                this.toastProvider.show("图片生成错误:" + err, 'error');
                img.onerror = null;
            };
        }, (err) => {
            loading.dismiss();
            this.toastProvider.show("图片生成错误", 'error');
            console.log(err);
        });
    }

    // 调用分享
    doShare() {
        let myShare = this.myShareCtrl.create({
                data: {
                    type: 'image',
                    title: this.data.user.nickname + "坚持#"+this.data.goal.name+'#第'+this.data.checkin.total_days+'天',
                    description: this.data.checkin.content,
                    image: this.shareImage,
                    thumb: this.shareImage,
                    url: "http://drip.growu.me"
                },
                extra:event
            })
        ;
        myShare.present();
    }

    // 关闭界面
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
