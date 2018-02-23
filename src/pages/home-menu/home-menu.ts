import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SettingModel} from '../../models/setting.model'

@IonicPage({
    name: 'home-menu',
})
@Component({
    selector: 'page-home-menu',
    templateUrl: 'home-menu.html',
})
export class HomeMenuPage {

    public setting: SettingModel;
    public user: any = {
        is_vip: false
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private viewCtrl: ViewController) {
        console.log(this.navParams);
        if (this.navParams.data) {
            this.setting = this.navParams.get('setting');
            this.user = this.navParams.get('user');
        }
    }

    ionViewDidLoad() {

    }

    onChangeViewMode() {
        this.viewCtrl.dismiss(this.setting);
    }

    onChangeCalendarMode() {
        this.viewCtrl.dismiss(this.setting);
    }

}
