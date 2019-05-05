import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GoalProvider} from "../../providers/goal/goal";

@IonicPage({
    name:'goal-home-users'
})
@Component({
  selector: 'page-goal-home-users',
  templateUrl: 'goal-home-users.html',
})
export class GoalHomeUsersPage {

    public users:any = [];
    private perPage:number = 20;

    constructor(public navCtrl: NavController,
                private goalProvider: GoalProvider,
                private app: App,
                public navParams: NavParams) {
  }

    ionViewDidEnter() {
        this.getGoalTop(1);
    }

    getGoalTop(page) {
        let id = this.navParams.get('id');

        this.goalProvider.getGoalRanks(id, page, this.perPage).then((data) => {
            if (data) {
                if (page == 1) {
                    this.users = data;
                } else {
                    this.users = this.users.concat(data);
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

        var num = this.users.length;

        if (num > 0 && num % 20 == 0) {
            var page = Math.floor(this.users.length / 20) + 1;
            this.getGoalTop(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

    goUserHomePage(user_id) {
        this.navParams.get('rootNavCtrl').push('user-home',{id:user_id,'rootNavCtrl': this.navParams.get('rootNavCtrl')});
    }

}
