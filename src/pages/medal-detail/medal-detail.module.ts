import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedalDetailPage } from './medal-detail';

@NgModule({
  declarations: [
    MedalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MedalDetailPage),
  ],
})
export class MedalDetailPageModule {}
