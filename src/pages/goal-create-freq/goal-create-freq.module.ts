import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreateFreqPage } from './goal-create-freq';
import {DpWeekSelectorComponentModule} from '../../components/dp-week-selector/dp-week-selector.module';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    GoalCreateFreqPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreateFreqPage),
      DpWeekSelectorComponentModule,
      PipesModule
  ],
})
export class GoalCreateFreqPageModule {}
