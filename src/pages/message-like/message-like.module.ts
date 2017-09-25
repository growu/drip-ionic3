import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageLikePage } from './message-like';
import { MyFollowButtonComponent } from '../../components/my-follow-button/my-follow-button'

@NgModule({
  declarations: [
    MessageLikePage,
    MyFollowButtonComponent
  ],
  imports: [
    IonicPageModule.forChild(MessageLikePage),
  ],
})
export class MessageLikePageModule {}
