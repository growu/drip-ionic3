import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AccountValidator} from "../../validators/account";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import swal from 'sweetalert2'

@IonicPage({
    name: 'register',
})
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    public isShowPassword: boolean = false;
    public isTimerStart: boolean = false;
    public timerText: string = "发送验证码";
    private timerRemainSeconds: number = 60;
    private registerForm: FormGroup;
    public isKeyboardShow: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userProvider: UserProvider,
                private toastProvider: ToastProvider,
                private formBuilder: FormBuilder,
                private storage: Storage) {
        this.registerForm = this.formBuilder.group({
            'account': ['', [Validators.required, AccountValidator.isValid]],
            'code': ['', [Validators.required]],
            'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
        });

        window.addEventListener('keyboardDidHide', () => {
            this.isKeyboardShow = false;
        });

        window.addEventListener('keyboardDidShow', () => {
            this.isKeyboardShow = true;
        });
    }

    ionViewDidLoad() {
    }

    sendCode($event) {
        $event.preventDefault();

        if (!this.registerForm.controls.account.valid || this.registerForm.controls.account.errors) {
            this.toastProvider.show('请输入正确的手机号码或邮箱', 'error')
            return;
        }

        this.userProvider.getCode(this.registerForm.value.account, 'register').then((response) => {
            if (response) {
                this.toastProvider.show('验证码已发送，请注意查收', 'success')
                this.isTimerStart = true;
                this.timerTracker();
            }
        }).catch((err) => {

        });

    }

    timerTracker() {
        setTimeout(() => {
            if (this.timerRemainSeconds > 0) {
                this.timerRemainSeconds--;
                this.timerText = this.timerRemainSeconds + "s后再次发送";
                this.timerTracker();
            }
            else {
                this.timerText = "再次发送";
                this.timerRemainSeconds = 60;
                this.isTimerStart = false;
            }
        }, 1000);
    }

    showPassword($event) {
        $event.preventDefault();
        this.isShowPassword = !this.isShowPassword;
    }

    goLoginDefaultPage() {
        this.navCtrl.push('login-default');
    }

    goForgetPage() {
        this.navCtrl.push('forget');
    }

    doRegister() {
        if (!this.registerForm.valid) {
            if (!this.registerForm.controls.account.valid || this.registerForm.controls.account.errors) {
                this.toastProvider.show('请输入正确的手机号码或邮箱', 'error')
                return;
            }

            if (!this.registerForm.controls.code.valid) {
                this.toastProvider.show('请输入验证码', 'error')
                return;
            }

            if (!this.registerForm.controls.password.valid) {
                this.toastProvider.show('请输入密码', 'error')
                return;
            }

        }

        this.userProvider.register(this.registerForm.value).then(data => {
            if (data) {
                this.storage.set('token', data.token);
                this.storage.set('user', data.user);

                this.toastProvider.show("注册成功",'success');
                this.navCtrl.push('main');
                // swal({
                //     title: '注册成功',
                //     // text: '欢迎回来',
                //     type: 'success',
                //     timer: 2000,
                //     showConfirmButton: false,
                //     width: '80%'
                // }).then(() => {
                //     this.navCtrl.push('main');
                // }, dismiss => {
                //     this.navCtrl.push('main');
                // });
            }
        }).catch((err) => {

        });;
    }

}
