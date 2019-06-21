import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastProvider} from "../../providers/toast/toast";
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {VerificationProvider} from "../../providers/verification/verification";

@IonicPage({
    name:'account-verify',
    segment:'account/verify'
})
@Component({
  selector: 'page-account-verify',
  templateUrl: 'account-verify.html',
})
export class AccountVerifyPage {

    public verifyForm: FormGroup;
    public isTimerStart: boolean = false;
    public timerText: string = "发送验证码";
    private timerRemainSeconds: number = 60;
    public provider:string;
    public account:string;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private verificationProvider: VerificationProvider,
                private userProvider: UserProvider,
                public viewCtrl: ViewController,
                private storage: Storage,
                private modalCtrl: ModalController,
                public navParams: NavParams) {
        this.provider = this.navParams.get('provider');
        this.account = this.navParams.get('account');

        console.log(this.account);

        this.verifyForm = this.formBuilder.group({
            'account': ['', []],
            'code': ['', [Validators.required]],
        });
    }

    ionViewDidLoad() {
    }

    sendCode($event) {
        $event.preventDefault();

        if (!this.verifyForm.controls.account.valid || this.verifyForm.controls.account.errors) {
            this.toastProvider.show('格式不正确', 'error')
            return;
        }

        this.verificationProvider.send(this.verifyForm.value.account, 'verify').then((response) => {
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

    /**
     * 验证
     *
     */
    doVerify() {
        this.verificationProvider.verify(this.verifyForm.value.account,this.verifyForm.value.code,'verify').then((response) => {
            if(response) {
                this.viewCtrl.dismiss();
                let modal = this.modalCtrl.create('account-bind',{'provider':this.provider});
                modal.present();
            }
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
