import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalEventPage } from './goal-event';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';

@NgModule({
  declarations: [
    GoalEventPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalEventPage),
      MyEventComponentModule
  ],
})
export class GoalEventPageModule {}
