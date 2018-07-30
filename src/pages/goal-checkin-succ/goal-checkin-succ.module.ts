import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCheckinSuccPage } from './goal-checkin-succ';
import {PhotoLibrary} from '@ionic-native/photo-library';

@NgModule({
  declarations: [
    GoalCheckinSuccPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCheckinSuccPage),
  ],
    providers:[
        PhotoLibrary
    ]
})
export class GoalCheckinSuccPageModule {}
