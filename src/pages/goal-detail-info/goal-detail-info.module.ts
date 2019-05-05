import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalDetailInfoPage } from './goal-detail-info';

@NgModule({
  declarations: [
    GoalDetailInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalDetailInfoPage),
  ],
})
export class GoalDetailInfoPageModule {}
