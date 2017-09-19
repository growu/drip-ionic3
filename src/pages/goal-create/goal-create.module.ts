import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreatePage } from './goal-create';
import { MyWeekSelectorComponent } from '../../components/my-week-selector/my-week-selector';

@NgModule({
  declarations: [
    GoalCreatePage,
    MyWeekSelectorComponent
  ],
  imports: [
    IonicPageModule.forChild(GoalCreatePage),
  ],
  exports: [
    GoalCreatePage
  ],
  providers: [
  ]
})
export class GoalCreatePageModule {}
