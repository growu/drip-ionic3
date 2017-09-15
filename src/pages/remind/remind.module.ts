import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemindPage } from './remind';

@NgModule({
  declarations: [
    RemindPage,
  ],
  imports: [
    IonicPageModule.forChild(RemindPage),
  ],
})
export class RemindPageModule {}
