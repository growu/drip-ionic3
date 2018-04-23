import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MallPage } from './mall';

@NgModule({
  declarations: [
    MallPage,
  ],
  imports: [
    IonicPageModule.forChild(MallPage),
  ],
})
export class MallPageModule {}
