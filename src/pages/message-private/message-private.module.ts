import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePrivatePage } from './message-private';

@NgModule({
  declarations: [
    MessagePrivatePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePrivatePage),
  ],
})
export class MessagePrivatePageModule {}
