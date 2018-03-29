import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GoalProvider} from '../../providers/goal/goal';

@IonicPage({
    name:'goal-home-events',
    priority: 'high'
})
@Component({
  selector: 'page-goal-home-events',
  templateUrl: 'goal-home-events.html',
})
export class GoalHomeEventsPage {

  public events:any = [];
  private perPage:number = 20;

  constructor(public navCtrl: NavController,
              public goalProvider: GoalProvider,
              public navParams: NavParams) {
  }

    ionViewDidEnter() {
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
            this.getGoalEvents(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }
}
