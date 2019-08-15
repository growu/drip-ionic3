import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MallProvider} from "../../providers/mall/mall";
import {ToastProvider} from "../../providers/toast/toast";
import * as moment from 'moment'
import {PayProvider} from '../../providers/pay/pay';

declare var Wechat;

@IonicPage({
    name: 'pay',
    segment: 'pay'
})
@Component({
    selector: 'page-pay',
    templateUrl: 'pay.html',
})
export class PayPage {

    public recharges = [];
    private selectRecharge = null;

    constructor(public navCtrl: NavController,
                private payProvider: PayProvider,
                private toastProvider: ToastProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.getRecharges();
    }

    /**
     * 获取计费点
     *
     */
    getRecharges() {
        this.payProvider.getRecharges().then(data => {
            this.recharges = data;
        }).catch(err => {

        });
    }

    /**
     * 选中计费点
     *
     */
    onClickRecharge(recharge) {
        this.recharges.forEach((value,key,arr)=>{
           this.recharges[key].isSelected = false;
        });

        recharge.isSelected = true;
        this.selectRecharge = recharge;
    }

    doPay() {

        if(!this.selectRecharge) {
            this.toastProvider.show("请选择充值金额","warning");
            return;
        }

        var body = {
            id:this.selectRecharge.id
        }

        this.payProvider.order(body).then(data => {

            var params = {
                partnerid: data.partnerid, // merchant id
                prepayid: data.prepayid, // prepay id
                noncestr: data.noncestr, // nonce
                timestamp: data.timestamp, // timesatamp
                sign: data.sign, // signed string
            };

            Wechat.sendPaymentRequest(params, function () {
                this.toastProvider.show("充值成功", "success");
            }, function (reason) {
                console.log(reason);
                this.toastProvider.show("充值失败：" + reason, "error");
            });
        }).catch(err => {

        });


    }

}
