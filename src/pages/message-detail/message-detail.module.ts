import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailPage } from './message-detail';

@NgModule({
  declarations: [
    MessageDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailPage),
  ],
})
export class MessageDetailPageModule {}
