import { Component } from '@angular/core';
import {UserProvider} from "./../../providers/user/user";
import {Storage} from '@ionic/storage';
import {NavController} from 'ionic-angular';
import swal from "sweetalert2";

@Component({
  selector: 'my-third-login',
  templateUrl: 'my-third-login.html'
})
export class MyThirdLoginComponent {

  public isWechatInstalled:boolean = false;
  public isQQInstalled: boolean = false;

  constructor(private userProvider: UserProvider,
    private navCtrl:NavController,
    private storage: Storage) {
  }
  
  ionViewDidLoad() {
    this.userProvider.checkWechatInstalled().then((response)=>{
        console.log("检测到微信客户端");
        this.isWechatInstalled = true;
    }).catch((err)=>{
        console.log("未检测到微信客户端");
        console.log(err);
    });

    this.userProvider.checkQQInstalled().then((response) => {
        this.isQQInstalled = true;
    }).catch((err) => console.log(err));
}

  doQQLogin() {
      this.userProvider.doQQLogin().then((response) => {
          this.successLogin(response);
      }).catch((err) => {
      });
  }

  doWeiboLogin() {
      this.userProvider.doWeiboLogin().then((response) => {
          this.successLogin(response);
      }).catch((err) => {
      });
  }

  doWechatLogin() {
      this.userProvider.doWechatLogin().then((response) => {
          this.successLogin(response);
      }).catch((err) => {
      });
  }

  private successLogin(response) {

    this.storage.set('token', response.token);
    this.storage.set('user', response.user);
    swal({
        title: '登录成功',
        // text: '欢迎回来',
        type: 'success',
        timer: 2000,
        showConfirmButton: false,
        width: '60%'
    }).then(() => {
        this.navCtrl.push('main');
    }, dismiss => {
        this.navCtrl.push('main');
    });
  }
}
