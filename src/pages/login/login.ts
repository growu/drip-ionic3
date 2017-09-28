
import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { UserProvider } from "./../../providers/user/user";

@IonicPage({
    name:'login'
})

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public isWechatInstalled:boolean = false;

    constructor(
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        private userProvider: UserProvider
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
        }).catch((err)=>{
            console.log(err);
        });
    }

    doWeiboLogin() {
        this.userProvider.doWeiboLogin().then((data)=>{
        }).catch((err)=>{
            console.log(err);
        });
    }

    doWechatLogin() {
        this.userProvider.doWechatLogin().then((data)=>{
        }).catch((err)=>{
            console.log(err);
        });
    }

    ionViewDidLoad() {
        this.userProvider.checkWechatInstalled().then((data)=>{
            this.isWechatInstalled = true;
        }).catch((err)=>console.log(err));
    }



}
