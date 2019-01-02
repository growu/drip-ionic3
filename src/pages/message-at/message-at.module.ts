import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageAtPage } from './message-at';

@NgModule({
  declarations: [
    MessageAtPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageAtPage),
  ],
})
export class MessageAtPageModule {}
