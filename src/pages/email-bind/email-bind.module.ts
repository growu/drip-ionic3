import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailBindPage } from './email-bind';

@NgModule({
  declarations: [
    EmailBindPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailBindPage),
  ],
})
export class EmailBindPageModule {}
