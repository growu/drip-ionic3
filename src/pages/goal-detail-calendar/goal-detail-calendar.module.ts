import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalDetailCalendarPage } from './goal-detail-calendar';
import { CalendarModule } from "ion2-calendar";
import { MyYearCalendarComponent } from "../../components/my-year-calendar/my-year-calendar";

@NgModule({
  declarations: [
    GoalDetailCalendarPage,
    MyYearCalendarComponent
  ],
  imports: [
    IonicPageModule.forChild(GoalDetailCalendarPage),
    CalendarModule,
  ],
})
export class GoalDetailCalendarPageModule {}
