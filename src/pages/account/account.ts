import {Component} from '@angular/core';
import {
    IonicPage, NavController, NavParams, ActionSheetController, App, ModalController,
    ViewController,
    Events,
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserProvider} from "./../../providers/user/user";
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name: "account"
})
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {
    public user: any = {
        wechat: null,
        qq: null,
        weibo: null
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                private userProvider: UserProvider,
                private toastProvider: ToastProvider,
                private app: App,
                public events:Events,
                public actionSheetCtrl: ActionSheetController,
                private storage: Storage) {

        events.subscribe('user:update', () => {
            console.log("account:update");
            this.storage.get('user').then((data) => {
                this.user = data;
            });
        });
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    goChangePasswordPage() {
        this.navCtrl.push('change-password');
    }

    /**
     * 注销
     */
    doLogout() {
        this.storage.clear().then((data) => {
            // this.navCtrl.push('login');
            this.app.getRootNav().setRoot('login');
        });
    }

    /**
     * 绑定手机号
     *
     */
    doBindPhone() {
        let modal;
        if (this.user.phone) {
            modal = this.modalCtrl.create('account-verify',{'provider':'phone','account':this.user.phone});
        } else {
            modal = this.modalCtrl.create('account-bind',{'provider':'phone'});
        }
        modal.present();
    }

    /**
     * 绑定邮箱
     *
     */
    doBindEmail() {
        let modal;
        if (this.user.email) {
            modal = this.modalCtrl.create('account-verify',{'provider':'email','account':this.user.email});
        } else {
            modal = this.modalCtrl.create('account-bind',{'provider':'email'});
        }
        modal.present();
    }

    doBindWechat() {
        if (this.user.binds.wechat) return;

        this.userProvider.doWechatBind().then((ret) => {
            if (ret) {
                this.storage.set('user', ret);
                this.user = ret;
                this.toastProvider.show("绑定成功", 'success');
            }
        }).catch((err) => {
        });
    }

    /**
     * 绑定QQ
     *
     */
    doBindQQ() {

        if (this.user.binds.qq) return;

        this.userProvider.doQQBind().then((ret) => {
            if (ret) {
                this.storage.set('user', ret);
                this.user = ret;
                this.toastProvider.show("绑定成功", 'success');
            }
        }).catch((err) => {

        });
    }

    /**
     * 绑定微博
     *
     */
    doBindWeibo() {

        if (this.user.binds.weibo) return;

        this.userProvider.doWeiboBind().then((ret) => {
            if (ret) {
                this.storage.set('user', ret);
                this.user = ret;
                this.toastProvider.show("绑定成功", 'success');
            }
        }).catch((err) => {

        });
    }


    showBindMenu(provider) {

        // console.log(this.user[provider].nickname);
        //
        // let is_bind: boolean = this.user[provider].nickname ? true : false;
        //
        // let button;
        //
        // if (is_bind) {
        //
        //     button = {
        //         text: '解除绑定',
        //         role: 'destructive',
        //         handler: () => {
        //             this.doUnBind(provider);
        //         }
        //     }
        //
        // } else {
        //     button = {
        //         text: '绑定账号',
        //         handler: () => {
        //             this.doBind(provider);
        //         }
        //     }
        // }
        //
        //
        // let actionSheet = this.actionSheetCtrl.create({
        //     title: '更多操作',
        //     buttons: [
        //         button,
        //         {
        //             text: '取消',
        //             role: 'cancel',
        //             handler: () => {
        //
        //             }
        //         }
        //     ]
        // });
        // actionSheet.present();
    }
}
