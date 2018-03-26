import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFollowerPage } from './user-follower';

@NgModule({
  declarations: [
      UserFollowerPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFollowerPage),
  ],
})
export class UserFollowerPageModule {}
