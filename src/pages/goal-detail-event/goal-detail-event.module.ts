import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalDetailEventPage } from './goal-detail-event';

@NgModule({
  declarations: [
    GoalDetailEventPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalDetailEventPage),
  ],
})
export class GoalDetailEventPageModule {}
