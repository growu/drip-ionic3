import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatDetailPage } from './chat-detail';

@NgModule({
  declarations: [
    ChatDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatDetailPage),
  ],
})
export class ChatDetailPageModule {}
