import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFollowingPage } from './user-following';

@NgModule({
  declarations: [
    UserFollowingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFollowingPage),
  ],
})
export class UserFollowingPageModule {}
