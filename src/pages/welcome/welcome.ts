import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import * as moment from 'moment'

@IonicPage({
    name: 'welcome',
})
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {

    public days: any = ['0', '0', '0', '0'];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage) {
    }


    ionViewWillEnter() {
        this.storage.get('user').then((data) => {
            if (data) {
                if (data.created_at) {
                    var now = moment(new Date());
                    var end = moment(data.created_at);
                    var duration = moment.duration(now.diff(end));
                    this.days = this.pad(Math.ceil(duration.asDays()), 4).split('');
                }

                setTimeout(() => {
                    if(this.navCtrl.length() == 1){
                        this.navCtrl.push('main');
                    }
                }, 1000);

            } else {
                this.navCtrl.push('login');
            }
        });
    }

    // ionViewCanEnter(): boolean {
    //   return false;
    // }

    ionViewDidLoad() {
    }

    pad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

}
