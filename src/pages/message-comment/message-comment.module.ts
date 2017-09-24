import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageCommentPage } from './message-comment';

@NgModule({
  declarations: [
    MessageCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageCommentPage),
  ],
})
export class MessageCommentPageModule {}
