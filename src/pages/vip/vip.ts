import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import {UserProvider} from "../../providers/user/user";
import {MallProvider} from "../../providers/mall/mall";
import {PayProvider} from '../../providers/pay/pay';

declare var Wechat;

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
  public type:number = 0;
  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private storage: Storage,
              private userProvider: UserProvider,
              private payProvider: PayProvider,
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

  buyVip(good_id){

      let body = {
          id:good_id
      };

      this.payProvider.order(body).then(data=>{
          if(data) {
              const that = this;
              Wechat.sendPaymentRequest(data, function () {
                  that.toastProvider.show("购买成功", "success");
              }, function (reason) {
                  console.log(reason);
                  that.toastProvider.show("购买失败：" + reason, "error");
              });
          } else {
              this.toastProvider.show("购买失败","error");
          }
      }).catch(err=>{});

    // const confirm = this.alertCtrl.create({
    //   title: '确认兑换？',
    //   message: '确定使用 '+num+'水滴币兑换此商品？',
    //   buttons: [
    //     {
    //       text: '取消',
    //       handler: () => {
    //         console.log('Disagree clicked');
    //       }
    //     },
    //     {
    //       text: '确认',
    //       handler: () => {
    //         this.mallProvider.doExchangeGood(good_id).then(data=>{
    //             if(data) {
    //               this.toastProvider.show("兑换成功","success");
    //               this.storage.set('user',data);
    //             } else {
    //                 this.toastProvider.show("兑换失败","error");
    //             }
    //         }).catch(err=>{});
    //       }
    //     }
    //   ]
    // });
    // confirm.present();


      // this.navCtrl.push('mall');
        // let prompt = this.alertCtrl.create({
      //     title: '兑换',
      //     message: "1个月（30天）= 1000 水滴币",
      //     inputs: [
      //         {
      //             name: 'num',
      //             placeholder: '请输入月数'
      //         },
      //     ],
      //     buttons: [
      //         {
      //             text: '取消',
      //             handler: data => {
      //                 console.log('Cancel clicked');
      //             }
      //         },
      //         {
      //             text: '确定',
      //             handler: data => {
      //
      //                 if(!data.num || data.num <= 0) {
      //                     this.toastProvider.show("请输入大于0的数字","error")
      //                     return;
      //                 }
      //
      //                     this.userProvider.buyVip(data).then((data)=>{
      //                       if(data) {
      //                           this.toastProvider.show("兑换成功","success");
      //                           this.storage.set('user',data);
      //                           this.user = data;
      //                       }
      //                 }).catch((err)=>{
      //                     this.toastProvider.show("兑换失败："+err,"error");
      //                 });
      //             }
      //         }
      //     ]
      // });
      // prompt.present();
  }


      // let alert = this.alertCtrl.create({
      //     title: '抱歉',
      //     subTitle: '此功能内测中，如需体验请联系微信：foxmee',
      //     buttons: ['好吧']
      // });
      // alert.present();
      // this.toastProvider.show("暂未开放，详情请咨询微信：foxmee",'warning');
}
