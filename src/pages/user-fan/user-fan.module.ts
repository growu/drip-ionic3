import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFanPage } from './user-fan';

@NgModule({
  declarations: [
    UserFanPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFanPage),
  ],
})
export class UserFanPageModule {}
