import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreateFreqPage } from './goal-create-freq';
import {MyWeekSelectorComponentModule} from '../../components/my-week-selector/my-week-selector.module';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    GoalCreateFreqPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreateFreqPage),
      MyWeekSelectorComponentModule,
      PipesModule
  ],
})
export class GoalCreateFreqPageModule {}
