import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalTodayPage } from './goal-today';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {PipesModule} from '../../pipes/pipes.module'
import {ChartsModule} from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    GoalTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalTodayPage),
      RoundProgressModule,
      PipesModule,
      ChartsModule
  ],
})
export class GoalTodayPageModule {}
