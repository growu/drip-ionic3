import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserProvider } from "./../../providers/user/user";
import { ToastProvider } from "./../../providers/toast/toast";
import { EqualValidator } from '../../validators/equal';


@IonicPage({
  name:"change-password"
})
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

    private changeForm: FormGroup;

    constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
                private userProvider: UserProvider,
                private toastProvider: ToastProvider,
                public toastCtrl: ToastController,
              public navParams: NavParams) {

      this.changeForm = this.formBuilder.group({
          'old_password': ['', [Validators.required]],
          'new_password': ['', [Validators.required, Validators.minLength(6),Validators.maxLength(32)]],
          'new_password_check': ['', [Validators.required, Validators.minLength(6),Validators.maxLength(32),EqualValidator.isEqual]]
      });
  }

  ionViewDidLoad() {
  }

  doChange() {
      if(!this.changeForm.valid){
          if(!this.changeForm.controls.old_password.valid) {
              this.toastProvider.show("请输入原密码",'error')
              return;
          }

          if(!this.changeForm.controls.new_password.valid) {
              this.toastProvider.show("请输入新密码",'error')
              return;
          }

          if(!this.changeForm.controls.new_password_check.valid) {
              this.toastProvider.show("两次密码不一致",'error')
              return;
          }
      }

      this.userProvider.changePassword(this.changeForm.value).then(data => {
          if(data) {
              this.toastProvider.show("密码修改成功",'success')
          }
      });
  }

  goForgetPage() {
    this.navCtrl.push('forget');
  }

}
