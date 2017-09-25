import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalSettingPage } from './goal-setting';

@NgModule({
  declarations: [
    GoalSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalSettingPage),
  ],
})
export class GoalSettingPageModule {}
