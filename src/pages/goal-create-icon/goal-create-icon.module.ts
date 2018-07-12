import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreateIconPage } from './goal-create-icon';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    GoalCreateIconPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreateIconPage),
      PipesModule
  ],
})
export class GoalCreateIconPageModule {}
