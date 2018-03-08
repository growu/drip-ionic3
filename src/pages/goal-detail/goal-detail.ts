import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {SuperTabsController} from "ionic2-super-tabs/dist/index";
import {UserProvider} from '../../providers/user/user'

@IonicPage({
    name: "goal-detail",
    segment: 'goal/:id/detail'
})
@Component({
    selector: 'page-goal-detail',
    templateUrl: 'goal-detail.html',
})
export class GoalDetailPage {

    page1: any = "goal-detail-summary";
    page2: any = "goal-detail-event";
    page3: any = "goal-detail-chart";
    selectedTabIndex: number = 0;
    public isShowMore: boolean = false;


    goal: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                private userProvider: UserProvider,
                private superTabsCtrl: SuperTabsController,
                private popoverCtrl: PopoverController) {

        events.subscribe('goals:update', () => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            this.getGoal();
        });
    }

    getGoal() {
        console.log(this.navParams);
        var params = this.navParams;

        let id = this.navParams.data.id;
        this.userProvider.getGoal(id).then((data) => {
            this.goal = data;
        }).catch((err) => {

        });
    }

    ionViewDidLoad() {
        this.getGoal();
    }

    showMore() {
        this.isShowMore = !this.isShowMore;
    }

    openMenu($event) {
        this.navCtrl.push('goal-edit', {id: this.goal.id, goal: this.goal})

        // let popover = this.popoverCtrl.create('goal-detail-menu', {
        //     'goal': this.goal
        // }, {
        //     showBackdrop: true,
        // });
        //
        // popover.present({
        //     ev: $event
        // });
        //
        // popover.onDidDismiss((settingData) => {
        //
        // })
    }

    goEditPage() {
        this.navCtrl.push('goal-edit', {id: this.goal.id, goal: this.goal})
    }

}
