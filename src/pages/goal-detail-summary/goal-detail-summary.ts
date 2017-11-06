import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage} from "ionic-angular";
import {UserProvider} from '../../providers/user/user'

@IonicPage({
    name: "goal-detail-summary",
    segment: "summary"
})
@Component({
    selector: 'page-goal-detail-summary',
    templateUrl: 'goal-detail-summary.html',
})
export class GoalDetailSummaryPage {

    goal: any = {};
    public week: any = [];
    public rootNavCtrl: NavController;

    constructor(public navCtrl: NavController,
                private app: App,
                public navParams: NavParams,
                private userProvider: UserProvider) {
        console.log(navParams);

        this.rootNavCtrl = navParams.get('rootNavCtrl');
        console.log(this.rootNavCtrl);
    }

    ionViewDidEnter() {
        this.getGoal();
        this.getGoalWeek();
    }

    getGoal() {
        let id = this.navParams.get('id');
        this.userProvider.getGoal(id).then((data) => {
            this.goal = data;
        }).catch((err)=>{

        });
    }

    goCheckinPage() {
        this.app.getRootNav().push('goal-checkin', {'id': this.navParams.data.id});
    }

    getGoalWeek() {
        let id = this.navParams.get('id');
        this.userProvider.getGoalWeek(id).then((data) => {
            this.week = data;
        });
    }

    goGoalCalendarPage() {
        this.navCtrl.push('goal-calendar', {id: this.navParams.get('id')});
    }
}
