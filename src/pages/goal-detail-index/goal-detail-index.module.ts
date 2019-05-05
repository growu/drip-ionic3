import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalDetailIndexPage } from './goal-detail-index';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';

@NgModule({
  declarations: [
    GoalDetailIndexPage,
  ],
  imports: [
      IonicPageModule.forChild(GoalDetailIndexPage),
    TimeAgoPipeModule
  ],
})
export class GoalDetailIndexPageModule {}
