import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreateItemPage } from './goal-create-item';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    GoalCreateItemPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreateItemPage),
      PipesModule
  ],
})
export class GoalCreateItemPageModule {}
