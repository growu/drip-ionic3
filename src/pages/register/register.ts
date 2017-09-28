import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AccountValidator } from "../../validators/account";
import { UserProvider } from "../../providers/user/user";
import { Storage } from '@ionic/storage';


@IonicPage({
  name:'register',
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public isShowPassword:boolean = false;
  public isTimerStart:boolean = false;
  public timerText:string = "发送验证码";
  private timerRemainSeconds:number = 60;
  private registerForm: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      'account': ['', [Validators.required, AccountValidator.isValid]],
      'code': ['',[Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(6),Validators.maxLength(32)]]
    });
  }

  ionViewDidLoad() {
  }

  sendCode($event) {
    $event.preventDefault();

    if(!this.registerForm.controls.account.valid || this.registerForm.controls.account.errors) {
      let toast = this.toastCtrl.create({
        message: "请输入正确的手机号码或邮箱",
        duration: 3000,
        position: 'top',
        cssClass: 'my-toast'
      });
      toast.present();
      return;
    }

    this.userProvider.getCode(this.registerForm.value.account,'register').then((data)=>{
      let toast = this.toastCtrl.create({
        message: "验证码已发送到，请注意查收",
        duration: 3000,
        position: 'top',
        cssClass: 'my-toast'
      });
      toast.present();

      this.isTimerStart = true;
      this.timerTracker();
    });


  }

  timerTracker() {
    setTimeout(() => {
      console.log(this.timerRemainSeconds);
      if (this.timerRemainSeconds > 0) {
        this.timerRemainSeconds --;
        this.timerText = this.timerRemainSeconds+"s后再次发送";
        this.timerTracker();
      }
      else {
        this.timerText = "再次发送";
        this.timerRemainSeconds = 60;
        this.isTimerStart = false;
      }
    }, 1000);
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  goLoginDefaultPage() {
    this.navCtrl.push('login-default');
  }

  goForgetPage() {
    this.navCtrl.push('forget');
  }

  doRegister() {
    if(!this.registerForm.valid){
      if(!this.registerForm.controls.account.valid || this.registerForm.controls.account.errors) {
        let toast = this.toastCtrl.create({
          message: "请输入正确的手机号码或邮箱",
          duration: 3000,
          position: 'top',
          cssClass: 'my-toast'
        });
        toast.present();
        return;
      }

      if(!this.registerForm.controls.code.valid) {
        let toast = this.toastCtrl.create({
          message: "请输入密码",
          duration: 3000,
          position: 'top',
          cssClass: 'my-toast'
        });
        toast.present();
        return;
      }

      if(!this.registerForm.controls.password.valid) {
        let toast = this.toastCtrl.create({
          message: "请输入密码",
          duration: 3000,
          position: 'top',
          cssClass: 'my-toast'
        });
        toast.present();
        return;
      }

    }

    this.userProvider.register(this.registerForm.value).then(data => {
      if(data) {
        this.storage.set('token', data.token);
        this.storage.set('user', data.user);
        this.navCtrl.push('main');
      }
    });
  }

}
