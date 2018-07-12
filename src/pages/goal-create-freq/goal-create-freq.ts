import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage({
    name: 'goal-create-freq'
})
@Component({
    selector: 'page-goal-create-freq',
    templateUrl: 'goal-create-freq.html',
})
export class GoalCreateFreqPage {

    public weeks: Array<number> = [];
    public time_type = 1;

    public start_time = "00:00";
    public end_time = "23:59";

    public color = "primary";

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                public navParams: NavParams) {
        if(this.navParams.get('weeks')) {
            this.weeks = this.navParams.get('weeks');
        }

        if(this.navParams.get('time_type')) {
            this.time_type = this.navParams.get('time_type');
        }

        if(this.navParams.get('start_time')) {
            this.start_time = this.navParams.get('start_time');
        }

        if(this.navParams.get('end_time')) {
            this.end_time = this.navParams.get('end_time');
        }

        if(this.navParams.get('color')) {
            this.color = this.navParams.get('color');
        }

    }

    ionViewDidLoad() {
    }

    onWeekChanged($event) {
        this.weeks = $event;
    }

    // 目标时间修改监听
    onTimeChange() {
        if (this.end_time < this.start_time) {
            this.end_time = this.start_time;
        }
    }

    onTimeTypeChnage($event) {
        if ($event == 2) {
            this.start_time = '00:00';
            this.end_time = '23:59';
        }
    }

    doSave() {
        let data = {
            weeks:this.weeks,
            start_time:this.start_time,
            end_time:this.end_time,
            time_type:this.time_type
        };

        this.viewCtrl.dismiss(data);
    }

    doCancle() {
        this.viewCtrl.dismiss();
    }

}
