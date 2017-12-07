import {Component, ViewChild} from '@angular/core';
import {App, IonicPage, NavController, NavParams,Content} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'user-home-events',
    segment: 'events'
})
@Component({
    selector: 'page-user-home-events',
    templateUrl: 'user-home-events.html',
})
export class UserHomeEventsPage {
    public events: any = [];
    private perPage: number = 20;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private app: App,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {
        this.getUserEvents(1);
    }

    getUserEvents(page) {
        let id = this.navParams.get('id');

        this.userProvider.getEvents(id, page, this.perPage).then((data) => {
            if (data) {
                if (page == 1) {
                    this.events = data;
                } else {
                    this.events = this.events.concat(data);
                }
            }
        });
    }

    // doRefresh(refresher) {
    //
    //     this.getUserEvents(1);
    //
    //     setTimeout(() => {
    //         refresher.complete();
    //     }, 2000);
    // }

    doInfinite(infiniteScroll) {

        var num = this.events.length;

        if (num > 0 && num % 20 == 0) {
            var page = Math.floor(this.events.length / 20) + 1;
            this.getUserEvents(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

    goCheckinPage() {
        this.app.getRootNav().push('goal-checkin', {'id': this.navParams.data.id});
    }
}
