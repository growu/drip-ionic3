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

        // this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/water.mp3').then(()=>{
        //     console.log("audio load succ");
        // }, (err)=>{
        //     console.log("audio load err");
        //     console.log(err);
        // });

        // 监听目标状态改变
        events.subscribe('goals:update', () => {
            this.getGoalsInfo();
            this.getGoalWeek();
        });

    }

    ionViewDidEnter() {
        this.getGoalsInfo();
        this.getGoalWeek();
    }

    getGoalsInfo() {
        let id = this.navParams.get('id');
        this.userProvider.getGoalsInfo(id).then((data) => {
            this.goal = data;
        }).catch((err)=>{

        });
    }

    goCheckinPage() {
      this.userProvider.goCheckinPage(this.goal);
    }

    // 获取目标周打卡
    getGoalWeek() {
        // let id = this.navParams.get('id');
        // this.userProvider.getGoalWeek(id).then((data) => {
        //     this.week = data;
        // });
    }

    // 进入目标日历
    goGoalCalendarPage() {
        this.navCtrl.push('goal-calendar', {id: this.navParams.get('id'),goal:this.goal});
    }
}
