import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage, Events} from "ionic-angular";
import {UserProvider} from '../../providers/user/user'
import {ToastProvider} from "../../providers/toast/toast";
import { NativeAudio } from '@ionic-native/native-audio';
import * as moment from 'moment'
import swal from "sweetalert2";

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
                private nativeAudio: NativeAudio,
                public navParams: NavParams,
                private events:Events,
                private toastProvider:ToastProvider,
                private userProvider: UserProvider) {
        console.log(navParams);

        this.rootNavCtrl = navParams.get('rootNavCtrl');

        this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/water.mp3').then(()=>{
            console.log("audio load succ");
        }, (err)=>{
            console.log("audio load err");
            console.log(err);
        });

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

        if(this.goal.status == 0) {
            this.toastProvider.show("目标还未开始","error");
            return;
        }

        if(this.goal.status == 2) {
            this.toastProvider.show("目标已结束","error");
            return;
        }

        // this.nativeAudio.play('uniqueId1', () => {
        //     console.log('uniqueId1 is done playing');
        // });

        if(this.goal.checkin_model == 1) {

            let params = {
                day: moment().format('YYYY-MM-DD'),
                content: null,
                items: [],
                attachs: []
            }

            this.userProvider.checkinGoal(this.goal.id, params).then(data => {
                if (data) {
                    swal({
                        title: '打卡成功',
                        html: '单次打卡奖励：+' + data.single_add_coin + '水滴币<br>连续打卡奖励：+' + data.series_add_coin + '水滴币',
                        type: 'success',
                        // timer: 2000,
                        showConfirmButton: true,
                        width: '80%',
                        // padding: 0
                    }).then(() => {
                        this.events.publish('goals:update', {});
                    }, dismiss => {
                    });

                }

            });
        } else {
            this.app.getRootNav().push('goal-checkin', {'id': this.navParams.data.id});
        }

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
