import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppRate} from '@ionic-native/app-rate';
import {Storage} from '@ionic/storage';

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

    goAppRate() {
        // or, override the whole preferences object
        this.appRate.preferences = {
            usesUntilPrompt: 3,
            storeAppURL: {
                ios: '<app_id>',
                android: 'market://details?id=<package_name>',
                windows: 'ms-windows-store://review/?ProductId=<store_id>'
            }
        };

        this.appRate.promptForRating(false);
    }

}
