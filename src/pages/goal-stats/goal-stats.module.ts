import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalStatsPage } from './goal-stats';
import {ChartsModule} from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    GoalStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalStatsPage),
    ChartsModule
  ],
})
export class GoalStatsPageModule {}
