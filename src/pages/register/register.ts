import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  sendCode() {
    this.isTimerStart = true;
    this.timerTracker();
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

}
