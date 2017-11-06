import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalEditPage } from './goal-edit';

@NgModule({
  declarations: [
    GoalEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalEditPage),
  ],
})
export class GoalEditPageModule {}
