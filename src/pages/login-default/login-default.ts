import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AccountValidator } from '../../validators/account';
import { UserProvider } from "./../../providers/user/user";
import { Storage } from '@ionic/storage';

@IonicPage({
  name:'login-default',
  segment:'login/default'
})
@Component({
  selector: 'page-login-default',
  templateUrl: 'login-default.html',
})
export class LoginDefaultPage {

  public isShowPassword:boolean = false;
  private loginForm: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private userProvider: UserProvider,
              private storage: Storage
  ) {

    this.loginForm = this.formBuilder.group({
      'account': ['', [Validators.required, AccountValidator.isValid]],
      'password': ['', [Validators.required, Validators.minLength(6),Validators.maxLength(32)]]
    });
  }

  doLogin() {
    console.log(this.loginForm);
    if(!this.loginForm.valid){
      if(!this.loginForm.controls.account.valid || this.loginForm.controls.account.errors) {
        let toast = this.toastCtrl.create({
          message: "请输入正确的手机号码或邮箱",
          duration: 3000,
          position: 'top',
          cssClass: 'my-toast'
        });
        toast.present();
        return;
      }

      if(!this.loginForm.controls.password.valid) {
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

    this.userProvider.login(this.loginForm.value).then(data => {
      this.storage.set('token', data.token);
      this.storage.set('user', data.user);
      this.navCtrl.push('main');
    });;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginDefaultPage');
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  goRegisterPage() {
    this.navCtrl.push("register");
  }

  goForgetPage() {
    this.navCtrl.push("forget");
  }

}
