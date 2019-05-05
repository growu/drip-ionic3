import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CalendarComponentOptions, DayConfig} from 'ion2-calendar'
import * as moment from 'moment'

import {UserProvider} from '../../providers/user/user'

@IonicPage({
    name: 'goal-detail-calendar',
    segment: 'calendar'
})
@Component({
    selector: 'page-goal-detail-calendar',
    templateUrl: 'goal-detail-calendar.html',
})
export class GoalDetailCalendarPage {

    event: any = {};
    selectDay: any;
    checkins: any = [];

    calendarOptions: CalendarComponentOptions = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userProvider: UserProvider,
                private app: App) {
    }

    ionViewDidEnter() {
        this.getGoalCalendar();
        this.selectDay = moment().format("YYYY-MM-DD");
        this.getGoalDay();
    }

    getGoalCalendar() {
        this.userProvider.getGoalsCalendar(this.navParams.get('id'),null,null).then((data) => {
            let days: DayConfig[] = [];

            data.forEach((item, index) => {
                let cssClass: string = "";

                let next_day = moment(item.checkin_day).add(1, 'days').format('YYYY-MM-DD');

                // console.log('当前日期' + item.checkin_day);
                // console.log('当前index' + index);

                if (index < data.length - 1) {
                    // console.log('下一日期' + data[index + 1]['checkin_day']);
                }

                if (data.length > 1) {

                    if (index == 0) {
                        // 必须在同一个月
                        if (moment(data[index + 1]['checkin_day']).format('YYYY-MM') == moment(item.checkin_day).format('YYYY-MM')) {
                            // console.log("下一日期在同一个月");
                            if (next_day == data[index + 1]['checkin_day']) {
                                // console.log("下一日期对比相同");
                                cssClass = 'start';
                            }
                        }
                    } else {

                        if (index == data.length - 1) {
                            // 判断前一天
                            if (moment(data[index - 1]['checkin_day']).format('YYYY-MM') == moment(item.checkin_day).format('YYYY-MM')) {
                                if (days[index - 1].cssClass) {
                                    cssClass = 'end';
                                }
                            }
                        } else {
                            if (moment(data[index + 1]['checkin_day']).format('YYYY-MM') == moment(item.checkin_day).format('YYYY-MM')) {
                                // console.log("下一日期在同一个月");
                                // console.log(days[index - 1].cssClass);
                                if (!days[index - 1].cssClass) {
                                    // console.log("前一日期没有样式");
                                    if (next_day == data[index + 1]['checkin_day']) {
                                        // console.log("下一日期对比相同");
                                        cssClass = 'start';
                                    }
                                } else {
                                    // console.log("前一日期有样式");
                                    if (next_day == data[index + 1]['checkin_day']) {
                                        // console.log("下一日期对比相同");
                                        cssClass = 'between';
                                    } else {
                                        // console.log("下一日期对比不同");
                                        cssClass = 'end';
                                    }
                                }
                            } else {
                                // console.log("下一日期不在同一个月");
                                if (moment(data[index - 1]['checkin_day']).format('YYYY-MM') == moment(item.checkin_day).format('YYYY-MM')) {
                                    // console.log("上一日期在同一个月");
                                    if (days[index - 1].cssClass) {
                                        cssClass = 'end';
                                    }
                                }
                            }
                        }
                    }
                }

                // console.log(cssClass);

                days.push({
                    date: new Date(item.checkin_day),
                    cssClass: cssClass
                })
            });

            setTimeout(() => {
                this.calendarOptions = {
                    from: new Date(2009, 1, 1),
                    to: new Date(),
                    color:"secondary",
                    pickMode: 'single',
                    daysConfig: days,
                    monthFormat: 'yyyy 年 MM 月 ',
                    weekdays: ['天', '一', '二', '三', '四', '五', '六'],
                }
            }, 300);
        });
    }

    getGoalDay() {
        // this.userProvider.getGoalDay(this.navParams.get('id'), this.selectDay).then((data) => {
        //     this.checkins = data.checkins;
        // });
    }

    onChange($event) {
        this.selectDay = $event;
        this.getGoalDay();
    }

    goEventDetailPage(id) {
        this.app.getRootNav().push('event-detail', {id: id});
    }

    goGoalCheckinPage() {
        let goal = this.navParams.get('goal');
        this.userProvider.goCheckinPage(goal, {'day': this.selectDay});
    }

}
