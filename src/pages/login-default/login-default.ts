import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AccountValidator} from '../../validators/account';
import {UserProvider} from "./../../providers/user/user";
import {ToastProvider} from "./../../providers/toast/toast";
import {Storage} from '@ionic/storage';

@IonicPage({
    name: 'login',
    segment: 'login'
})
@Component({
    selector: 'page-login-default',
    templateUrl: 'login-default.html',
})
export class LoginDefaultPage {

    public isShowPassword: boolean = false;
    private loginForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastProvider: ToastProvider,
                private formBuilder: FormBuilder,
                private userProvider: UserProvider,
                private storage: Storage) {

        this.loginForm = this.formBuilder.group({
            'account': ['', [Validators.required, AccountValidator.isValid]],
            'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
        });
    }

    /**
     * 用户注册
     */
    doLogin() {
        if (!this.loginForm.valid) {
            if (!this.loginForm.controls.account.valid || this.loginForm.controls.account.errors) {
                this.toastProvider.show('请输入正确的手机号码或邮箱', 'error')
                return;
            }

            if (!this.loginForm.controls.password.valid) {
                this.toastProvider.show('请输入密码', 'error')
                return;
            }
        }

        this.userProvider.login(this.loginForm.value);
    }

    /**
     * 显示/隐藏密码
     * @param $event
     */
    showPassword($event) {
        $event.preventDefault();
        this.isShowPassword = !this.isShowPassword;
    }

    /**
     * 跳转到注册页面
     */
    goRegisterPage() {
        this.navCtrl.push("register");
    }

    /**
     * 跳转到忘记密码页面
     */
    goForgetPage() {
        this.navCtrl.push("forget");
    }

}
