import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import * as moment from 'moment'
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import {MyShareController} from "../../components/my-share/my-share.controller";
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'welcome',
    segment:'welcome'
})
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {

    // public days: any = ['0', '0', '0', '0'];
    public days: any =0;
    public today = moment(new Date()).format("YYYY-MM-DD");
    public week:any;
    public time:any = 'morning';
    public timer:any;
    public second:number = 5;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private myShareCtrl:MyShareController,
                private userProvider:UserProvider,
                private nativePageTransitions: NativePageTransitions,
                private storage: Storage) {
        let weeks = ['一', '二', '三', '四', '五', '六', '日'];
        this.week  = '星期'+ weeks[moment(new Date()).day()];

        var currentHour = parseFloat(moment().format("HH"));
        
        if(currentHour >= 18) {
            this.time = "evening";
        } else {
            this.time = "morning";
        }
    }

    ionViewWillEnter() {
        this.storage.get('user').then((data) => {
            if (data) {
                if (data.created_at) {
                    var now = moment(new Date());
                    var end = moment(data.created_at);
                    var duration = moment.duration(now.diff(end));
                    this.days = Math.ceil(duration.asDays());
                    // this.days = this.pad(Math.ceil(duration.asDays()), 4).split('');
                }

                // setTimeout(() => {
                //     if(this.navCtrl.length() == 1){
                //         this.navCtrl.push('main');
                //     }
                // }, 1000);

            } else {
                // this.navCtrl.push('login');
            }
        });

        setInterval(()=>{
            this.second--;
        },1000);

        // 5s 后进入首页
        this.timer = setTimeout(()=>{
            this.navCtrl.setRoot('main');
        },5000);
    }

    /**
     * 跳转到主页
     *
     */
    goHomePage() {
        this.clean();

        let options: NativeTransitionOptions = {
            direction: 'up',
            duration: 500,
            slowdownfactor: 3,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 150,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 60
           };
        
         this.nativePageTransitions.fade(options);

        this.navCtrl.setRoot('main');
    }

    doShare() {
        let params = {
            days:this.days
        };

        this.userProvider.share(params).then((res)=>{
            let myShare = this.myShareCtrl.create({
                data: {
                    type: 'image',
                    title: "水滴打卡",
                    description: "绳锯木断，水滴石穿",
                    image: res.url,
                },
                extra: {}
                });
            myShare.present();
        });
       
        
    }

    ionViewDidLeave() {
       this.clean();
    }

    protected clean() {
        if(this.timer) {
            this.timer = null;
            clearTimeout(this.timer);
        }
    }

    pad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    swipeEvent($event) {
        if($event.direction == Hammer.DIRECTION_UP) {
            this.goHomePage();
        }
    }

}
