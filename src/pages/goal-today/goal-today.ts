import {Component, ViewChild} from '@angular/core';
import {ActionSheet, ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {DomSanitizer} from "@angular/platform-browser";
import * as moment from 'moment'
import { Slides } from 'ionic-angular';

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

    public day = moment().format('YYYY-MM-DD');

    constructor(public navCtrl: NavController,
                private actionSheetCtrl: ActionSheetController,
                private userProvider: UserProvider,
                private sanitizer: DomSanitizer,
                public navParams: NavParams) {

        this.goal = this.navParams.get('goal');
    }

    ionViewDidLoad() {
        this.userProvider.getGoalDay(this.navParams.get('id'), this.day).then((data) => {
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

    openMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '历史记录',
                    handler: () => {
                        this.navCtrl.push('goal-history', {id: this.goal.id, goal: this.goal})
                    }
                },
                {
                    text: '目标设置',
                    role: 'destructive',
                    handler: () => {
                        this.navCtrl.push('goal-create', {id: this.goal.id, goal: this.goal,action:'update'})
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        actionSheet.present();
    }

    getColor(color: string) {

        return this.sanitizer.bypassSecurityTrustStyle('--progress-bg-color:' + color);
    }

}
