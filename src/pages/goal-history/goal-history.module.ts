import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalHistoryPage } from './goal-history';

@NgModule({
  declarations: [
    GoalHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalHistoryPage),
  ],
})
export class GoalHistoryPageModule {}
