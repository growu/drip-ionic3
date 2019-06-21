import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalEventPage } from './goal-event';
import {DpEventComponentModule} from '../../components/dp-event/dp-event.module';

@NgModule({
  declarations: [
    GoalEventPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalEventPage),
      DpEventComponentModule
  ],
})
export class GoalEventPageModule {}
