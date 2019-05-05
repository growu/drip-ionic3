import {Component, ViewChild} from '@angular/core';
import {
    ActionSheet, ActionSheetController, AlertController, Events, IonicPage, NavController,
    NavParams
} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {DomSanitizer} from "@angular/platform-browser";
import * as moment from 'moment'
import { Slides } from 'ionic-angular';
import {GoalProvider} from "../../providers/goal/goal";
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name: 'goal-today',
    segment: 'goal/:id/today'
})
@Component({
    selector: 'page-goal-today',
    templateUrl: 'goal-today.html',
})
export class GoalTodayPage {
    @ViewChild(Slides) slides: Slides;

    public goal;

    public data = {
        items: [],
        checkins: []
    };

    public currentIndex = 0;

    public day = moment().format('YYYY-MM-DD');

    constructor(public navCtrl: NavController,
                private goalProvider: GoalProvider,
                private actionSheetCtrl: ActionSheetController,
                private userProvider: UserProvider,
                private toastProvider: ToastProvider,
                private events: Events,
                private alertCtrl: AlertController,
                private sanitizer: DomSanitizer,
                public navParams: NavParams) {

        this.goal = this.navParams.get('goal');
    }

    ionViewDidLoad() {
        this.userProvider.getGoalsInfo(this.navParams.get('id')).then((data) => {
            this.data = data;
        }).catch((err) => {

        });
    }

    goGoalCheckinPage() {
        this.navCtrl.push('goal-checkin', {id: this.goal.id, goal: this.goal})
    }

    slideToPrev() {
        this.slides.slidePrev();
    }

    slideToNext() {
        this.slides.slideNext();
    }

    slideChanged() {
        this.currentIndex = this.slides.getActiveIndex();
    }

    openMenu() {

        let buttons = [
            {
                text: '历史记录',
                handler: () => {
                    this.navCtrl.push('goal-history', {id: this.goal.id, goal: this.goal})
                }
            },
            {
                text: '取消',
                role: 'cancel',
                handler: () => {

                }
            }
        ];

        if(!this.goal.is_archive) {
            buttons.push( {
                    text: '目标设置',
                    role: 'destructive',
                    handler: () => {
                        this.navCtrl.push('goal-create', {id: this.goal.id, goal: this.goal,action:'update'})
                    }
                },
                {
                    text: '归档',
                    handler: () => {

                        let confirm = this.alertCtrl.create({
                            title: '确认归档?',
                            message: '归档后目标将从你的列表中移除，你可以在个人中心-我的归档里查看',
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
                                        this.goal['is_archive'] = 1;
                                        this.goalProvider.updateGoal(this.goal.id, this.goal).then(data => {
                                            this.toastProvider.show("归档成功",'success');
                                            this.events.publish('goals:update', {});

                                        }).catch((err) => {

                                        });
                                    }
                                }
                            ]
                        });
                        confirm.present();


                    }
                });
        }

        let actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: buttons
        });
        actionSheet.present();
    }

    getColor(color: string) {

        return this.sanitizer.bypassSecurityTrustStyle('--progress-bg-color:' + color);
    }

}
