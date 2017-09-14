import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalAddPage } from './goal-add';
import { MyWeekSelectorComponent } from '../../components/my-week-selector/my-week-selector';

@NgModule({
  declarations: [
    GoalAddPage,
    MyWeekSelectorComponent
  ],
  imports: [
    IonicPageModule.forChild(GoalAddPage),
  ],
  exports: [
    GoalAddPage
  ],
  providers: [
  ]
})
export class GoalAddPageModule {}
