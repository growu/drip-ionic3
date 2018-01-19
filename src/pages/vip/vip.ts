import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'vip',
    segment: 'vip'
})
@Component({
  selector: 'page-vip',
  templateUrl: 'vip.html',
})
export class VipPage {

    private user:any;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private storage: Storage,
              private userProvider: UserProvider,
              private toastProvider: ToastProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {

      this.storage.get('user').then((data) => {
          if(data) {
              this.user = data;
          }
      });
  }

  showBuyPage() {
      let prompt = this.alertCtrl.create({
          title: '兑换',
          message: "1个月（30天）= 1000 水滴币",
          inputs: [
              {
                  name: 'num',
                  placeholder: '请输入月数'
              },
          ],
          buttons: [
              {
                  text: '取消',
                  handler: data => {
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: '确定',
                  handler: data => {

                      if(!data.num || data.num <= 0) {
                          this.toastProvider.show("请输入大于0的数字","error")
                          return;
                      }

                          this.userProvider.buyVip(data).then((data)=>{
                            if(data) {
                                this.toastProvider.show("兑换成功","success");
                                this.storage.set('user',data);
                                this.user = data;
                            }
                      }).catch((err)=>{
                          this.toastProvider.show("兑换失败："+err,"error");
                      });
                  }
              }
          ]
      });
      prompt.present();
  }


      // let alert = this.alertCtrl.create({
      //     title: '抱歉',
      //     subTitle: '此功能内测中，如需体验请联系微信：foxmee',
      //     buttons: ['好吧']
      // });
      // alert.present();
      // this.toastProvider.show("暂未开放，详情请咨询微信：foxmee",'warning');
}
