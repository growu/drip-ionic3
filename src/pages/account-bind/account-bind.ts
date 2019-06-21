import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastProvider} from "../../providers/toast/toast";
import {UserProvider} from "../../providers/user/user";
import {AccountValidator} from "../../validators/account";
import {Storage} from '@ionic/storage';
import {VerificationProvider} from "../../providers/verification/verification";

@IonicPage({
    name:'account-bind',
    segment:'account/bind'
})
@Component({
  selector: 'page-account-bind',
  templateUrl: 'account-bind.html',
})
export class AccountBindPage {

    public bindForm: FormGroup;
    public isTimerStart: boolean = false;
    public timerText: string = "发送验证码";
    private timerRemainSeconds: number = 60;
    public provider:string;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private userProvider: UserProvider,
                private verificationProvider: VerificationProvider,
                public viewCtrl: ViewController,
                private storage: Storage,
                public events:Events,
                public navParams: NavParams) {
        this.provider = this.navParams.get('provider');

        let validators = [Validators.required];

        if(this.provider == 'email') {
            validators.push(AccountValidator.isValidEmail);
        } else {
            validators.push(AccountValidator.isValidPhone);
        }

        this.bindForm = this.formBuilder.group({
            'account': ['', validators],
            'code': ['', [Validators.required]],
        });
    }

    ionViewDidLoad() {
    }

    sendCode($event) {
        $event.preventDefault();

        if (!this.bindForm.controls.account.valid || this.bindForm.controls.account.errors) {
            this.toastProvider.show('格式不正确', 'error')
            return;
        }

        this.userProvider.getCode(this.bindForm.value.account, 'bind').then((response) => {
            if (response) {
                this.toastProvider.show('验证码已发送，请注意查收', 'success')
                this.isTimerStart = true;
                this.timerTracker();
            }
        }).catch((err) => {

        });

    }

    /**
     * 验证码
     *
     */
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

    /**
     * 绑定
     *
     */
    doBind() {
        this.verificationProvider.verify(this.bindForm.value.account,this.bindForm.value.code,'bind').then((response) => {
            this.userProvider.bind(this.provider,this.bindForm.value).then((response) => {
                if(response) {
                    this.storage.set('user',response);
                    this.toastProvider.show('绑定成功', 'success')
                    this.viewCtrl.dismiss();
                    this.events.publish('account:update', {});
                }
            });
        }).catch(err=>{

        });



    }

    /**
     * 关闭页面
     *
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
