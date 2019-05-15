import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinLogPage } from './coin-log';
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
  declarations: [
    CoinLogPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinLogPage),
      MyLoaderComponentModule
  ],
})
export class CoinLogPageModule {}
