import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailCalendarPage} from './goal-detail-calendar';
import {CalendarModule} from "ion2-calendar";
import {DpYearCalendarComponentModule} from "../../components/dp-year-calendar/dp-year-calendar.module";

@NgModule({
    declarations: [
        GoalDetailCalendarPage
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailCalendarPage),
        DpYearCalendarComponentModule,
        CalendarModule,
    ],
})
export class GoalDetailCalendarPageModule {
}
