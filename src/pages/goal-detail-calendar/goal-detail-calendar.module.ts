import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailCalendarPage} from './goal-detail-calendar';
import {CalendarModule} from "ion2-calendar";
import {MyYearCalendarComponentModule} from "../../components/my-year-calendar/my-year-calendar.module";

@NgModule({
    declarations: [
        GoalDetailCalendarPage
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailCalendarPage),
        MyYearCalendarComponentModule,
        CalendarModule,
    ],
})
export class GoalDetailCalendarPageModule {
}
