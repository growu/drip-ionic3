import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinLogPage } from './coin-log';
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
  declarations: [
    CoinLogPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinLogPage),
      DpLoaderComponentModule
  ],
})
export class CoinLogPageModule {}
