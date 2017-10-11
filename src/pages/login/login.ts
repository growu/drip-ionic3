
import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { UserProvider } from "./../../providers/user/user";
import { Storage } from '@ionic/storage';

@IonicPage({
    name:'login'
})

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    // public isWechatInstalled:boolean = false;
    public isQQInstalled:boolean = false;
    // public isWeiboInstalled:boolean = false;

    constructor(
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        private userProvider: UserProvider,
        private storage: Storage
    ){

    }

    goLoginDefaultPage(){
        this.navCtrl.push('login-default');
    }

    goRegisterPage(){
        this.navCtrl.push('register');
    }

    doQQLogin() {
        this.userProvider.doQQLogin().then((data)=>{
            this.successLogin(data);
        }).catch((err)=>{
            console.log(err);
        });
    }

    doWeiboLogin() {
        this.userProvider.doWeiboLogin().then((data)=>{
            this.successLogin(data);
        }).catch((err)=>{
            console.log(err);
        });
    }

    doWechatLogin() {
        this.userProvider.doWechatLogin().then((data)=>{
           this.successLogin(data);
        }).catch((err)=>{
            console.log(err);
        });
    }

    private successLogin(data) {
        this.storage.set('token', data.token);
        this.storage.set('user', data.user);

        let toast = this.toastCtrl.create({
            message: "登录成功",
            duration: 3000,
            position: 'top',
            cssClass: 'my-toast'
        });
        toast.present();

        this.navCtrl.push('main');
    }

    ionViewDidLoad() {
        // this.userProvider.checkWechatInstalled().then((data)=>{
        //     this.isWechatInstalled = true;
        // }).catch((err)=>console.log(err));

        this.userProvider.checkQQInstalled().then((data)=>{
            this.isQQInstalled = true;
        }).catch((err)=>console.log(err));

    }



}
