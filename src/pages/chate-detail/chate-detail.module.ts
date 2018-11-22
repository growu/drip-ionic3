import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChateDetailPage } from './chate-detail';

@NgModule({
  declarations: [
    ChateDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChateDetailPage),
  ],
})
export class ChateDetailPageModule {}
