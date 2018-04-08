import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NativeAudio} from '@ionic-native/native-audio';
import {ToastProvider} from '../../providers/toast/toast';
import {Storage} from '@ionic/storage';

@IonicPage({
    'name': 'goal-edit-sound'
})
@Component({
    selector: 'page-goal-edit-sound',
    templateUrl: 'goal-edit-sound.html',
})
export class GoalEditSoundPage {

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
    private user;

    private sound;

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                private storage: Storage,
                private toastProvider: ToastProvider,
                private nativeAudio: NativeAudio,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    //铃声切换监听
    playSound(sound) {

        console.log(sound);

        if (sound.value == "" || sound.value == "default") {
            return;
        }

        this.nativeAudio.preloadSimple(sound.id, 'assets/audio/'+sound.value+'.mp3').then(() => {
            console.log("audio load succ");
        }, (err) => {
            console.log("audio load err");
            console.log(err);
        });

        this.nativeAudio.play(sound.id).then(() => {
            console.log("audio play succ");
        }, (err) => {
            console.log("audio play err");
            console.log(err);
        });
    }

    save() {
        console.log(this.sound);
        this.sounds.forEach((item, index) => {
            if (item.value == this.sound) {

                if (!this.user.is_vip && item.is_vip) {
                    this.toastProvider.show("此铃声仅限PRO会员使用", "error");
                } else {
                    this.viewCtrl.dismiss(item);
                }

                return;
            }
        });
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
