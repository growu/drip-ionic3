import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFollowingPage } from './user-following';
import {DpFollowButtonComponentModule} from '../../components/dp-follow-button/dp-follow-button.module'

@NgModule({
  declarations: [
    UserFollowingPage,
  ],
  imports: [
      IonicPageModule.forChild(UserFollowingPage),
      DpFollowButtonComponentModule
  ],
})
export class UserFollowingPageModule {}
