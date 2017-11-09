import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import * as citise from '../../assets/chinese-cities.json';
import {UserProvider} from "../../providers/user/user";
import {ToolProvider} from "../../providers/tool/tool";

@IonicPage({
    name: 'profile',
    segment: 'profile'
})
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    public user = {
        id: 0,
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
                ) {

        this.cityColumns = <any>citise;
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            console.log(data);
            this.user = data;
        });
    }

    onClearBirthday() {
        this.user.birthday = null;
    }

    onChangeAvatar($event) {
        this.toolProvider.choosePic($event).then((ret)=>{
            this.updateUser('user_avatar', ret.url);
        }).catch((err)=>{

        });
    }

    updateUser(key, value) {

        let param = {};
        param[key] = value;

        let body = JSON.stringify(param);

        this.userProvider.updateUser(this.user.id, body).then((data) => {
            this.user = data;
            this.storage.set("user", data);

        }).catch((err) => {

        });
    }


}
