import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFollowerPage } from './user-follower';
import {DpFollowButtonComponentModule} from '../../components/dp-follow-button/dp-follow-button.module'
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
  declarations: [
      UserFollowerPage,
  ],
  imports: [
      IonicPageModule.forChild(UserFollowerPage),
      DpFollowButtonComponentModule,
      DpLoaderComponentModule
  ],
})
export class UserFollowerPageModule {}
