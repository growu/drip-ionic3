import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Toast} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {ToastProvider} from "../../providers/toast/toast";

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
    public mode = "timeline";

    constructor(public navCtrl: NavController,
                private userProvider: UserProvider,
                private alertCtrl: AlertController,
                private toastProvider: ToastProvider,
                public navParams: NavParams) {
        // this.goal = this.navParams.get('goal');

        this.userProvider.getGoalsInfo(this.navParams.get('id')).then((data) => {
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

    goGoalChartPage() {
        this.navCtrl.push('goal-chart', {id: this.goal.id, goal: this.goal});
    }

    goEventDetailPage(checkin) {
        if(checkin.event) {
            this.navCtrl.push('event-detail', {id: checkin.event.event_id});
        }
    }

    getGoalEvents(page) {
        let id = this.navParams.data.id;

        this.userProvider.getGoalEvents(id, page, 10).then((data) => {
            if (data) {
                if (page == 1) {
                    this.records = data;
                } else {
                    this.records = this.records.concat(data);
                }
            }
        });
    }

    deleteCheckin(record,checkin) {

        let confirm = this.alertCtrl.create({
            title: '确认删除?',
            message: '此项操作不可恢复！',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                    }
                },
                {
                    text: '确认',
                    cssClass: 'my-alert-danger',
                    handler: () => {
                        this.userProvider.deleteCheckin(checkin.id).then((data) => {
                            this.toastProvider.show("删除成功", 'success');
                            var index = this.records.indexOf(record);
                            var index2 = record.checkins.indexOf(checkin);
                            this.records[index].checkins.splice(index2, 1);
                        }, () => {
                        }).catch((err) => {
                        });
                    }
                }
            ]
        });
        confirm.present();

        // this.userProvider.deleteCheckin(checkin.id).then((data) => {
        //
        // });
    }


    goCheckinPage(checkin) {
        this.navCtrl.push('goal-checkin-edit', {goalId: this.goal.id, checkinId: checkin.id})
    }

}
