
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

    }

}
