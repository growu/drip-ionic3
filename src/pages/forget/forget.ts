import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AccountValidator} from "../../validators/account";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "./../../providers/toast/toast";
import swal from 'sweetalert2';

@IonicPage({
    name: 'forget',
})
@Component({
    selector: 'page-forget',
    templateUrl: 'forget.html',
})
export class ForgetPage {

    public isShowPassword: boolean = false;
    public isTimerStart: boolean = false;
    public timerText: string = "发送验证码";
    private timerRemainSeconds: number = 60;
    private forgetForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userProvider: UserProvider,
                private toastProvider: ToastProvider,
                private formBuilder: FormBuilder,
                private storage: Storage) {

        this.forgetForm = this.formBuilder.group({
            'account': ['', [Validators.required, AccountValidator.isValid]],
            'code': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
            'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
        });
    }

    ionViewDidLoad() {
    }

    sendCode($event) {
        $event.preventDefault();

        if (!this.forgetForm.controls.account.valid || this.forgetForm.controls.account.errors) {
            this.toastProvider.show('请输入正确的手机号码或邮箱', 'error');
            return;
        }

        this.userProvider.getCode(this.forgetForm.value.account, 'find').then((response) => {
            if (response) {
                this.toastProvider.show('验证码已发送，请注意查收', 'error');
                this.isTimerStart = true;
                this.timerTracker();
            }
        }).catch((err)=>{});
    }

    timerTracker() {
        setTimeout(() => {
            console.log(this.timerRemainSeconds);
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

    goForgetPage() {
        this.navCtrl.push('forget');
    }

    doReset() {
        if (!this.forgetForm.valid) {
            if (!this.forgetForm.controls.account.valid || this.forgetForm.controls.account.errors) {
                this.toastProvider.show('无效的手机号码或邮箱', 'error');
                return;
            }

            if (!this.forgetForm.controls.code.valid) {
                this.toastProvider.show('无效的验证码', 'error');
                return;
            }

            if (!this.forgetForm.controls.password.valid) {
                this.toastProvider.show('密码格式不正确', 'error');
                return;
            }
        }

        this.userProvider.find(this.forgetForm.value).then(response => {
            if(response) {
                this.toastProvider.show("密码修改成功",'success');
                this.navCtrl.push('login');
                // swal({
                //     title: '密码修改成功',
                //     // text: '欢迎回来',
                //     type: 'success',
                //     timer: 2000,
                //     showConfirmButton: false,
                //     width: '80%',
                //     padding: 0
                // }).then(() => {
                //     this.navCtrl.push('login-default');
                // }, dismiss => {
                //     this.navCtrl.push('login-default');
                // });
            }

        }).catch((err)=>{

        });
    }

}
