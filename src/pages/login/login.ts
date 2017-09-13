
import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

// import { UserService } from "./../../providers/UserService";
// import { StorageService } from "./../../providers/StorageService";
//
// import { UserData } from "./../../model/UserData";
// import { phoneValidator } from './../../providers/validator'

@IonicPage({
    name:'login'
})

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    // providers: [UserService]

})
export class LoginPage {

    loginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        private formBuilder: FormBuilder,
        public toastCtrl: ToastController,
        // private userService: UserService,
        // private storageService: StorageService
    ) {

        this.loginForm = this.formBuilder.group({

            // 'phone': ['', [Validators.required,phoneValidator]],
            // 'password': ['', [Validators.required, Validators.minLength(6)]]

        });
    }


    // doLogin(user, _event) {
    //     _event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
    //     this.userService.login(user).then(data => {
    //
    //         // alert(JSON.stringify(data));
    //         if (data.status)//登录成功
    //         {
    //             // this.storageService.write('UserInfo', data.Result);
    //             //测试写缓存
    //             //let ss = this.storageService.read<UserInfoData>('UserInfo');
    //             //console.log(ss.UserToken);
    //             //传参
    //             this.navCtrl.push('home', {});
    //         }
    //         else {
    //             let toast = this.toastCtrl.create({
    //                 message: data.message,
    //                 duration: 3000,
    //                 position: 'middle',
    //                 showCloseButton: true,
    //                 closeButtonText: '关闭'
    //             });
    //             toast.present();
    //         }
    //     });
    // }

    goRegisterPage() {
        // this.navCtrl.push('register-page',{});
    }



}
