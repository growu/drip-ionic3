import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalDetailMenuPage } from './goal-detail-menu';

@NgModule({
  declarations: [
    GoalDetailMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalDetailMenuPage),
  ],
})
export class GoalDetailMenuPageModule {}
