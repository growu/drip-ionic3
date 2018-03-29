import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalHomeUsersPage } from './goal-home-users';

@NgModule({
  declarations: [
    GoalHomeUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalHomeUsersPage),
  ],
})
export class GoalHomeUsersPageModule {}
