import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreateDatePage } from './goal-create-date';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    GoalCreateDatePage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreateDatePage),
      PipesModule
  ],
})
export class GoalCreateDatePageModule {}
