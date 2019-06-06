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
    public page: string = 'events';
    public isLoading: boolean = false;

    page1: any = "goal-home-events";
    page2: any = "goal-home-users";

    constructor(public navCtrl: NavController,
                private goalProvider: GoalProvider,
                public navParams: NavParams) {

        // TODO 检查参数 不存在退回到上一页

    }

    ionViewDidLoad() {
        let id = this.navParams.get('id');

        this.goalProvider.getGoalInfo(id).then(data => {
            this.goal = data;
        }).catch(err => {
        });

        this.getGoalEvents(1);
        this.getGoalRank(1);
    }

    /**
     * 制定目标
     *
     */
    formulateGoal() {
        this.goalProvider.doFormulateGoal(this.goal.id).then(data => {
            if(data) {
                this.navCtrl.push('goal-create', {'id':this.goal.id,'goal':this.goal,'disableBack':true,'action':'update'});
            }
        }).catch(err => {
        });
    }

    goGoalDetailPage() {
        this.navCtrl.push('goal-detail', {'id':this.goal.id});
    }

    getGoalEvents(page) {
        let id = this.navParams.get('id');

        if(!id) return;

        this.isLoading = true;

        this.goalProvider.getGoalEvnets(id, page, 10).then((data) => {
            this.isLoading = false;
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


    getGoalRank(page) {
        let id = this.navParams.get('id');

        this.goalProvider.getGoalRanks(id, page, 10).then((data) => {
            if (data) {
                if (page == 1) {
                    this.users = data;
                } else {
                    this.users = this.users.concat(data);
                }
            }
        });
    }

    goUserHomePage(user_id) {
        this.navParams.get('rootNavCtrl').push('user-home',{id:user_id,'rootNavCtrl': this.navParams.get('rootNavCtrl')});
    }

}
