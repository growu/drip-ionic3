import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHomeGoalsPage } from './user-home-goals';

@NgModule({
  declarations: [
    UserHomeGoalsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserHomeGoalsPage),
  ],
})
export class UserHomeGoalsPageModule {}
