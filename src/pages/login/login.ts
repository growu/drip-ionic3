import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';

@IonicPage({
    name: 'login2',
    segment:'login2'
})

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController) {
    }

    goLoginDefaultPage() {
        this.navCtrl.push('login-default');
    }

    goRegisterPage() {
        this.navCtrl.push('register');
    }
}
