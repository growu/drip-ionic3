import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalTodayPage } from './goal-today';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    GoalTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalTodayPage),
      RoundProgressModule,
      PipesModule
  ],
})
export class GoalTodayPageModule {}
