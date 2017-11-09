import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalDetailPage } from './goal-detail';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
// import { MyCalendarComponentModule } from '../../components/my-calendar/my-calendar.module';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SuperTabsController } from "ionic2-super-tabs/dist/index";

@NgModule({
  declarations: [
    GoalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalDetailPage),
    RoundProgressModule,
    SuperTabsModule,
      // MyCalendarComponentModule
  ],
  exports: [
    GoalDetailPage
  ],
  providers:[
    SuperTabsController
  ]
})
export class GoalDetailPageModule {}
