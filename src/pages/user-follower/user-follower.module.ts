import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFollowerPage } from './user-follower';
import {MyFollowButtonComponentModule} from '../../components/my-follow-button/my-follow-button.module'
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
  declarations: [
      UserFollowerPage,
  ],
  imports: [
      IonicPageModule.forChild(UserFollowerPage),
      MyFollowButtonComponentModule,
      MyLoaderComponentModule
  ],
})
export class UserFollowerPageModule {}
