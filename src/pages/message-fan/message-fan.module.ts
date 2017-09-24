import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageFanPage } from './message-fan';
import { MyFollowButtonComponent } from '../../components/my-follow-button/my-follow-button'
 @NgModule({
  declarations: [
    MessageFanPage,
      MyFollowButtonComponent
  ],
  imports: [
    IonicPageModule.forChild(MessageFanPage),
  ],
})
export class MessageFanPageModule {}
