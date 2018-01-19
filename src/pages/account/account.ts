import {Component} from '@angular/core';
import {
    IonicPage, NavController, NavParams, ActionSheetController, App, ModalController,
    ViewController
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
        wechat:null,
        qq:null,
        weibo:null
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                private userProvider: UserProvider,
                private toastProvider:ToastProvider,
                private app: App,
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
            // this.navCtrl.push('login');
            this.app.getRootNav().push('login',{});

        });
    }


    doBindPhone() {
        if(this.user.phone) return;
        let modal = this.modalCtrl.create('phone-bind');
        modal.present();
    }

    doBindEmail() {
        if(this.user.email) return;
        let modal = this.modalCtrl.create('email-bind');
        modal.present();
    }

    doBindWechat() {
        if(this.user.wechat.nickname) return;

        this.userProvider.doWechatBind().then((ret)=>{
            if(ret) {
                this.storage.set('user',ret);
                this.user = ret;
                this.toastProvider.show("绑定成功",'success');
            }
        }).catch((err)=>{

        });
    }

    doBindQQ() {

        if(this.user.qq.nickname) return;

        this.userProvider.doQQBind().then((ret)=>{
            if(ret) {
                this.storage.set('user',ret);
                this.user = ret;
                this.toastProvider.show("绑定成功",'success');
            }
        }).catch((err)=>{

        });
    }

    doBindWeibo() {

        if(this.user.weibo.nickname) return;

        this.userProvider.doWeiboBind().then((ret)=>{
            if(ret) {
                this.storage.set('user',ret);
                this.user = ret;
                this.toastProvider.show("绑定成功",'success');
            }
        }).catch((err)=>{

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
