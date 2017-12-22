import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinLogPage } from './coin-log';

@NgModule({
  declarations: [
    CoinLogPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinLogPage),
  ],
})
export class CoinLogPageModule {}
