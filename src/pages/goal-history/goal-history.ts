import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'goal-history',
    segment: 'goal/:id/history'
})
@Component({
    selector: 'page-goal-history',
    templateUrl: 'goal-history.html',
})
export class GoalHistoryPage {

    public goal: any;

    public records = [];

    constructor(public navCtrl: NavController,
                private userProvider: UserProvider,
                public navParams: NavParams) {
        // this.goal = this.navParams.get('goal');

        this.userProvider.getGoal(this.navParams.get('id')).then((data) => {
            this.goal = data;
        }).catch((err) => {

        });
    }

    ionViewDidLoad() {

        this.userProvider.getGoalDays(this.navParams.get('id'), 1, 10).then((data) => {
            this.records = data;
        }).catch((err) => {

        });

    }

    goGoalCalendarPage() {
        this.navCtrl.push('goal-calendar', {id: this.goal.id, goal: this.goal});
    }

    goEventDetailPage(checkin) {
        if(checkin.event) {
            this.navCtrl.push('event-detail', {id: checkin.event.event_id});
        }
    }

    deleteCheckin(checkin) {

    }

}
