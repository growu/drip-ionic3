import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneBindPage } from './phone-bind';

@NgModule({
  declarations: [
    PhoneBindPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneBindPage),
  ],
})
export class PhoneBindPageModule {}
