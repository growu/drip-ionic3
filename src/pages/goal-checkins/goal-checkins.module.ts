import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCheckinsPage } from './goal-checkins';

@NgModule({
  declarations: [
    GoalCheckinsPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCheckinsPage),
  ],
})
export class GoalCheckinsPageModule {}
