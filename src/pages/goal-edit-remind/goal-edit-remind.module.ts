import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalEditRemindPage } from './goal-edit-remind';

@NgModule({
  declarations: [
    GoalEditRemindPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalEditRemindPage),
  ],
})
export class GoalEditRemindPageModule {}
