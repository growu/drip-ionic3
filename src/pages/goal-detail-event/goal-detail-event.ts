import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage} from "ionic-angular";
import {UserProvider} from '../../providers/user/user'

@IonicPage({
    name: "goal-detail-event",
    segment: "event"
})

@Component({
    selector: 'page-goal-detail-event',
    templateUrl: 'goal-detail-event.html',
})
export class GoalDetailEventPage {

    events: any = [];
    private perPage: number = 20;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private app: App,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
        this.getGoalEvents(1);
    }

    getGoalEvents(page) {
        let id = this.navParams.data.id;

        this.userProvider.getGoalEvents(id, page, this.perPage).then((data) => {
            if (data) {
                if (this.events.length == 0) {
                    this.events = data;
                } else {
                    this.events = this.events.concat(data);
                }
            }
        });
    }

    doRefresh(refresher) {

        this.getGoalEvents(1);

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {

        var num = this.events.length;

        if (num > 0 && num % 20 == 0) {
            var page = Math.floor(this.events.length / 20) + 1;
            this.getGoalEvents(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

    goCheckinPage() {
        this.app.getRootNav().push('goal-checkin', {'id': this.navParams.data.id});
    }

}
