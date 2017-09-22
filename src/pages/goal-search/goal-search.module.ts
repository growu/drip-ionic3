import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalSearchPage } from './goal-search';

@NgModule({
  declarations: [
    GoalSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalSearchPage),
  ],
})
export class GoalSearchPageModule {}
