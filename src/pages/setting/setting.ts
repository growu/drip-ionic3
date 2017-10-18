import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppRate} from '@ionic-native/app-rate';
import {Storage} from '@ionic/storage';
import {ToastProvider} from '../../providers/toast/toast';

@IonicPage({
    name: "setting"
})
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html',
})
export class SettingPage {
    public user: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public toastProvider: ToastProvider,
                private appRate: AppRate) {
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    goPage(name: string) {
        this.navCtrl.push(name);
    }

    clearCache() {
        this.toastProvider.show("清理成功",'success');
    }

    goAppRate() {
        this.appRate.preferences = {
            usesUntilPrompt: 3,
            storeAppURL: {
                ios: '1255579223',
                android: 'market://details?id=me.growu.drip',
                windows: 'ms-windows-store://review/?ProductId=me.growu.drip'
            }
        };

        this.appRate.promptForRating(false);
    }

}
