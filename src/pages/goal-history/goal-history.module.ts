import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalHistoryPage } from './goal-history';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';

@NgModule({
  declarations: [
    GoalHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalHistoryPage),
      MyEventComponentModule
  ],
})
export class GoalHistoryPageModule {}
