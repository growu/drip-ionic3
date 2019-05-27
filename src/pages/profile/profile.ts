import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import * as citise from '../../assets/chinese-cities.json';
import {UserProvider} from "../../providers/user/user";
import {ToolProvider} from "../../providers/tool/tool";
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name: 'profile',
    segment: 'profile'
})
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    public profile = {
        avatar_url: '',
        birthday: null,
        sex: "",
        nickname: "",
        signature: ""
    };

    cityColumns: any[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private userProvider: UserProvider,
                private toolProvider: ToolProvider,
                private toastProvider: ToastProvider,) {

        this.cityColumns = <any>citise;
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.profile.avatar_url = data.avatar_url;
            this.profile.birthday = data.birthday;
            this.profile.sex = data.sex;
            this.profile.nickname = data.nickname;
            this.profile.signature = data.signature;
        });
    }

    onClearBirthday() {
        this.profile.birthday = null;
    }

    onChangeAvatar($event) {
        this.toolProvider.choosePic($event).then((ret) => {
            this.profile.avatar_url = ret.url;
        }).catch((err) => {

        });
    }

    saveProfile() {
        this.userProvider.updateUserInfo(this.profile).then((data) => {
            this.storage.set("user", data);
            this.toastProvider.show("更新成功", "success");
        }).catch((err) => {
        });
    }

    // updateUser(key, value) {
    //
    //     let param = {};
    //     param[key] = value;
    //
    //     let body = JSON.stringify(param);
    //
    //     this.userProvider.updateUser(this.user.id, body).then((data) => {
    //         this.user = data;
    //         this.storage.set("user", data);
    //
    //     }).catch((err) => {
    //
    //     });
    // }


}
