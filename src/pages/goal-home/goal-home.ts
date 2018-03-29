import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GoalProvider} from "../../providers/goal/goal";
import {SuperTabs} from "ionic2-super-tabs";

@IonicPage({
    name: 'goal-home',
    segment: 'goal/:id/home',
    priority: 'high',
})
@Component({
    selector: 'page-goal-home',
    templateUrl: 'goal-home.html',
})
export class GoalHomePage {
    public goal: any = {};
    public events: any = [];
    public users: any = [];

    page1: any = "goal-home-events";
    page2: any = "goal-home-users";

    constructor(public navCtrl: NavController,
                private goalProvider: GoalProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        let id = this.navParams.get('id');

        this.goalProvider.getGoalInfo(id).then(data => {
            this.goal = data;
        }).catch(err => {
        });
    }

    doFollowGoal() {
        this.goalProvider.doFollowGoal(this.goal.id).then(data => {
            if(data) {
                this.navCtrl.push('goal-edit', {'id':this.goal.id,'disableBack':true});
            }
        }).catch(err => {
        });
    }

    goGoalDetailPage() {
        this.navCtrl.push('goal-detail', {'id':this.goal.id});
    }


}
