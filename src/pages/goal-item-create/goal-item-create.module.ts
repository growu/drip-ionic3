import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalItemCreatePage } from './goal-item-create';

@NgModule({
  declarations: [
    GoalItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(GoalItemCreatePage),
  ],
})
export class GoalItemCreatePageModule {}
