import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalDetailEventPage } from './goal-detail-event';
import { MyEventComponent } from '../../components/my-event/my-event';
import { TimeAgoPipeModule } from '../../pipes/time-ago/time-ago.module';
import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    GoalDetailEventPage,
    MyEventComponent
  ],
  imports: [
    IonicPageModule.forChild(GoalDetailEventPage),
    TimeAgoPipeModule,
    MomentModule
  ],
})
export class GoalDetailEventPageModule {}
