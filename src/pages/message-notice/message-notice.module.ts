import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageNoticePage } from './message-notice';

@NgModule({
  declarations: [
    MessageNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(MessageNoticePage),
  ],
})
export class MessageNoticePageModule {}
