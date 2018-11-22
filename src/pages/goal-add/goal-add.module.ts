import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalAddPage } from './goal-add';

@NgModule({
  declarations: [
    GoalAddPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalAddPage),
  ],
})
export class GoalAddPageModule {}
