import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFollowingPage } from './user-following';
import {MyFollowButtonComponentModule} from '../../components/my-follow-button/my-follow-button.module'

@NgModule({
  declarations: [
    UserFollowingPage,
  ],
  imports: [
      IonicPageModule.forChild(UserFollowingPage),
      MyFollowButtonComponentModule
  ],
})
export class UserFollowingPageModule {}
