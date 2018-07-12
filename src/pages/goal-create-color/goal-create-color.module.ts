import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreateColorPage } from './goal-create-color';

@NgModule({
  declarations: [
    GoalCreateColorPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreateColorPage),
  ],
})
export class GoalCreateColorPageModule {}
