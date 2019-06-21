import { Component } from '@angular/core';
import {UserProvider} from "./../../providers/user/user";
import {Storage} from '@ionic/storage';
import {NavController} from 'ionic-angular';
import swal from "sweetalert2";

@Component({
  selector: 'dp-third-login',
  templateUrl: 'dp-third-login.html'
})
export class DpThirdLoginComponent {

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
      this.userProvider.doQQLogin();
  }

  doWeiboLogin() {
      this.userProvider.doWeiboLogin();
  }

  doWechatLogin() {
      this.userProvider.doWechatLogin();
  }

}
