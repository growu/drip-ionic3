import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailSummaryPage} from './goal-detail-summary';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {MyWeekCalendarComponentModule} from '../../components/dp-week-calendar/dp-week-calendar.module';
import {CalendarModule} from "ion2-calendar";

@NgModule({
    declarations: [
        GoalDetailSummaryPage
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailSummaryPage),
        RoundProgressModule,
        MyWeekCalendarComponentModule,
        CalendarModule
    ],
})
export class GoalDetailSummaryPageModule {
}
