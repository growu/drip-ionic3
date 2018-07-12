import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreateRemindPage } from './goal-create-remind';

@NgModule({
  declarations: [
    GoalCreateRemindPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreateRemindPage),
  ],
})
export class GoalCreateRemindPageModule {}
