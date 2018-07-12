import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalSearchPage } from './goal-search';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    GoalSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalSearchPage),
      PipesModule
  ],
})
export class GoalSearchPageModule {}
