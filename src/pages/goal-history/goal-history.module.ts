import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalHistoryPage } from './goal-history';
import {DpEventComponentModule} from '../../components/dp-event/dp-event.module';

@NgModule({
  declarations: [
    GoalHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalHistoryPage),
      DpEventComponentModule
  ],
})
export class GoalHistoryPageModule {}
