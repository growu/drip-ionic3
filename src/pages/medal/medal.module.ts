import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedalPage } from './medal';

@NgModule({
  declarations: [
    MedalPage,
  ],
  imports: [
    IonicPageModule.forChild(MedalPage),
  ],
})
export class MedalPageModule {}
