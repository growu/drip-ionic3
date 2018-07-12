import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalManagePage } from './goal-manage';

@NgModule({
  declarations: [
    GoalManagePage,
  ],
  imports: [
    IonicPageModule.forChild(GoalManagePage),
  ],
})
export class GoalManagePageModule {}
