import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ToastProvider} from "../../providers/toast/toast";
import {Storage} from '@ionic/storage';

@IonicPage({
    name: 'goal-create-remind'
})
@Component({
    selector: 'page-goal-create-remind',
    templateUrl: 'goal-create-remind.html',
})
export class GoalCreateRemindPage {

    public reminds = [];
    public remind_time = null;
    public sound = {
        "name": "无",
        "value": ""
    };
    public user: any = {};

    public vibration = false;

    public sounds = [
        {
            "id": "sound1",
            "name": "无",
            "value": "",
            "is_vip": false
        },
        {
            "id": "sound2",
            "name": "系统默认",
            "value": "default",
            "is_vip": false
        },
        {
            "id": "sound3",
            "name": "水滴",
            "value": "drip",
            "is_vip": false
        },
        {
            "id": "sound4",
            "name": "闹钟",
            "value": "clock",
            "is_vip": false
        },
        {
            "id": "sound5",
            "name": "公鸡",
            "value": "cock",
            "is_vip": false
        },
        {
            "id": "sound6",
            "name": "星座",
            "value": "onstellation",
            "is_vip": true
        },
        {
            "id": "sound7",
            "name": "放射",
            "value": "radiation",
            "is_vip": true
        },
        {
            "id": "sound8",
            "name": "机器人",
            "value": "robot",
            "is_vip": true
        },
    ];

    public color = 'primary';

    @ViewChild('datePicker') datePicker

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                private toastProvider: ToastProvider,
                private storage: Storage,
                private modalCtrl: ModalController,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {

        this.storage.get('user').then((data) => {
            this.user = data;
        });

        if (this.navParams.get("remind_time")) {
            this.reminds = this.navParams.get("remind_time").split(',');
        }

        if (this.navParams.get("remind_sound")) {
            this.sounds.forEach((item, index) => {
                if (item.value == this.navParams.get("remind_sound")) {
                    this.sound = item;
                }
            });
        }

        if (this.navParams.get("color")) {
            this.color = this.navParams.get("color");
        }

        this.vibration = this.navParams.get("remind_vibration") > 0 ? true : false;
    }


    openSoundPage() {
        let modal = this.modalCtrl.create("goal-edit-sound", {sound: this.sound});
        modal.present();

        modal.onDidDismiss((data) => {
            console.log(data);
            if (data) {
                this.sound = data;
            }
        })
    }

    onTimeSet() {
        if (!this.remind_time) {
            return;
        }

        let max_remind_count = 1;

        if (this.user.is_vip) {
            max_remind_count = 12;
        }

        if (this.reminds.length >= max_remind_count) {
            this.toastProvider.show("超过提醒数量上限", "error");
            return;
        }

        // 判断是否添加了相同的提醒时间
        if(this.reminds.indexOf(this.remind_time) > 0) {
            this.toastProvider.show("该时间已经添加过", "error");
            return;
        }

        this.reminds.push(this.remind_time);
        this.remind_time = '';
    }

    deleteRemind(remind) {
        let index = this.reminds.indexOf(remind);
        this.reminds.splice(index, 1);
    }


    save() {
        console.log(this.vibration);
        let data = {
            'remind_time': this.reminds.toString(),
            'remind_sound': this.sound.value,
            'remind_vibration': this.vibration ? 1 : 0
        };
        this.viewCtrl.dismiss(data);
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
