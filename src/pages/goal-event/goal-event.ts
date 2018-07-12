import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GoalProvider} from '../../providers/goal/goal';

@IonicPage({
    name: 'goal-event',
    segment: 'goal/:id/event'
})
@Component({
    selector: 'page-goal-event',
    templateUrl: 'goal-event.html',
})
export class GoalEventPage {

    public events = [];
    private perPage: number = 20;
    public is_audit: number = 1;


    constructor(public navCtrl: NavController,
                private goalProvider: GoalProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.getGoalEvents(1);
    }

    getGoalEvents(page) {
        let id = this.navParams.get('id');

        this.goalProvider.getGoalEvnets(id, page, this.perPage).then((data) => {
            if (data) {
                if (page == 1) {
                    this.events = data;
                } else {
                    this.events = this.events.concat(data);
                }
            }
        });
    }

    segmentChanged($event) {
        this.getGoalEvents(1);
    }

}
