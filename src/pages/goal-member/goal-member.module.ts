import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalMemberPage } from './goal-member';

@NgModule({
  declarations: [
    GoalMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalMemberPage),
  ],
})
export class GoalMemberPageModule {}
