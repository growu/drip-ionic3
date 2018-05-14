import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {HttpBackend} from "@angular/common/http";
import {HttpProvider} from "../../providers/http/http";
import {URLSearchParams} from '@angular/http';
import {Device} from '@ionic-native/device';

declare var chcp;

@IonicPage({
    name: 'wallet'
})
@Component({
    selector: 'page-wallet',
    templateUrl: 'wallet.html',
})
export class WalletPage {
    private user: any;
    public isAudit:boolean = true;

    constructor(public navCtrl: NavController,
                private platform: Platform,
                private device: Device,
                private httpProvider: HttpProvider,
                public navParams: NavParams) {
        this.user = this.navParams.get('user');
    }

    ionViewDidLoad() {
        this.checkVersion();
    }

    checkVersion() {

        if (this.platform.is('cordova')) {

            chcp.getVersionInfo((err, data) => {

                console.log(err);
                console.log(data);

                let params: URLSearchParams = new URLSearchParams();
                params.set('app_version', data.appVersion);
                params.set('web_version', data.webVersion);
                params.set('platform', this.device.platform);

                this.httpProvider.httpGetWithAuth("/update/audit/", params).then((data)=>{
                    this.isAudit = data.is_audit;
                });

            });
        } else {
            this.isAudit = true;
        }
    }

    goCoinLogPage() {
        this.navCtrl.push('coin-log', {});
    }

    goMallPage() {
        this.navCtrl.push('mall', {});
    }

    goCheckinPage() {
        this.navCtrl.push('home', {});
    }

    goSharePage() {
        this.navCtrl.push('event', {});
    }

    goFeedbackPage() {
        this.navCtrl.push('feedback', {});
    }

    goPayPage() {
        this.navCtrl.push('pay', {});
    }


}
