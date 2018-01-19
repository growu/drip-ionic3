import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastProvider} from "../../providers/toast/toast";
import {UserProvider} from "../../providers/user/user";
import {AccountValidator} from "../../validators/account";
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-email-bind',
  templateUrl: 'email-bind.html',
})
export class EmailBindPage {

    private phoneBindForm: FormGroup;
    public isTimerStart: boolean = false;
    public timerText: string = "发送验证码";
    private timerRemainSeconds: number = 60;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private userProvider: UserProvider,
                public viewCtrl: ViewController,
                private storage: Storage,
                public navParams: NavParams) {
        this.phoneBindForm = this.formBuilder.group({
            'account': ['', [Validators.required, AccountValidator.isValidEmail]],
            'code': ['', [Validators.required]],
        });
    }

    ionViewDidLoad() {
    }

    sendCode($event) {
        $event.preventDefault();

        if (!this.phoneBindForm.controls.account.valid || this.phoneBindForm.controls.account.errors) {
            this.toastProvider.show('请输入正确的邮箱地址', 'error')
            return;
        }

        this.userProvider.getCode(this.phoneBindForm.value.account, 'bind').then((response) => {
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

    doBind() {
        this.userProvider.bind('email',this.phoneBindForm.value).then((response) => {
            if(response) {
                this.storage.set('user',response);
                this.toastProvider.show('绑定成功', 'success')
                this.viewCtrl.dismiss();
            }
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();

    }
}
