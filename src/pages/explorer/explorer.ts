
import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController,Tabs,AlertController} from 'ionic-angular';

@IonicPage({
    'name':'explore'
})
@Component({
    templateUrl: 'explorer.html'
})
export class ExplorerPage {

    constructor(private navCtrl:NavController,public alertCtrl: AlertController) {

    }

    goTopPage() {
        this.navCtrl.push('top');
    }

    goQunPage() {
        let alert = this.alertCtrl.create({
            title: '加入方法',
            subTitle: '1、截图保存图片到相册，2、图片发送到微信内，3长按图片识别二维码',
            buttons: ['确定']
        });
        alert.present();
    }

    showTip() {
        let alert = this.alertCtrl.create({
            title: '^_^',
            subTitle: '暂未开放，请耐心等待',
            buttons: ['确定']
        });
        alert.present();
    }

}

