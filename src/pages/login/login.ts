import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {UserProvider} from "./../../providers/user/user";
import {Storage} from '@ionic/storage';
import swal from 'sweetalert2'

@IonicPage({
    name: 'login'
})

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public isWechatInstalled:boolean = false;
    public isQQInstalled: boolean = false;
    // public isWeiboInstalled:boolean = false;

    constructor(public navCtrl: NavController,
                private userProvider: UserProvider,
                private storage: Storage) {

    }

    goLoginDefaultPage() {
        this.navCtrl.push('login-default');
    }

    goRegisterPage() {
        this.navCtrl.push('register');
    }

    doQQLogin() {
        this.userProvider.doQQLogin().then((response) => {
            this.successLogin(response);
        }).catch((err) => {
            console.log(err);
        });
    }

    doWeiboLogin() {
        this.userProvider.doWeiboLogin().then((response) => {
            this.successLogin(response);
        }).catch((err) => {
        });
    }

    doWechatLogin() {
        this.userProvider.doWechatLogin().then((response) => {
            this.successLogin(response);
        }).catch((err) => {
        });
    }

    private successLogin(response) {

        this.storage.set('token', response.token);
        this.storage.set('user', response.user);

        swal({
            title: '登录成功',
            // text: '欢迎回来',
            type: 'success',
            timer: 2000,
            showConfirmButton: false,
            width: '60%'
        }).then(() => {
        }, dismiss => {
            this.navCtrl.push('main');
        });
    }

    ionViewDidLoad() {
        this.userProvider.checkWechatInstalled().then((response)=>{
            console.log("检测到微信客户端");
            this.isWechatInstalled = true;
        }).catch((err)=>{
            console.log("未检测到微信客户端");
            console.log(err);
        });

        this.userProvider.checkQQInstalled().then((response) => {
            this.isQQInstalled = true;
        }).catch((err) => console.log(err));
    }

}
