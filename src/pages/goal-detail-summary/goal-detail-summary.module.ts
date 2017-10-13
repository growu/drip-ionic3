import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailSummaryPage} from './goal-detail-summary';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {MyWeekCalendarComponent} from '../../components/my-week-calendar/my-week-calendar';
import {CalendarModule} from "ion2-calendar";

@NgModule({
    declarations: [
        GoalDetailSummaryPage,
        MyWeekCalendarComponent
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailSummaryPage),
        RoundProgressModule,
        CalendarModule
    ],
})
export class GoalDetailSummaryPageModule {
}
