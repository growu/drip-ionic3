import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {AppRate} from '@ionic-native/app-rate';
import {Storage} from '@ionic/storage';
import {UserProvider} from "./../../providers/user/user";

@IonicPage({
    name: "account"
})
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {
    public user: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userProvider: UserProvider,
                public actionSheetCtrl: ActionSheetController,
                private storage: Storage) {
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    goChangePasswordPage() {
        this.navCtrl.push('change-password');
    }

    doLogout() {
        this.storage.clear().then((data) => {
            this.navCtrl.push('login');
        });
    }

    showBindMenu(provider) {

        console.log(this.user[provider].nickname);

        let is_bind: boolean = this.user[provider].nickname ? true : false;

        let button;

        if (is_bind) {

            button = {
                text: '解除绑定',
                role: 'destructive',
                handler: () => {
                    this.doUnBind(provider);
                }
            }

        } else {
            button = {
                text: '绑定账号',
                handler: () => {
                    this.doBind(provider);
                }
            }
        }


        let actionSheet = this.actionSheetCtrl.create({
            title: '更多操作',
            buttons: [
                button,
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        actionSheet.present();
    }

    doBind(provider) {
        if (provider == 'wechat') {
            this.userProvider.doWechatBind().then((data) => {

            });
        }

        if (provider == 'qq') {
            this.userProvider.doWechatBind().then((data) => {

            });
        }

        if (provider == 'weibo') {
            this.userProvider.doWechatBind().then((data) => {

            });
        }


    }

    doUnBind(provider) {

    }

}
