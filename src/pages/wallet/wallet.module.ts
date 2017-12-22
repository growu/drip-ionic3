import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletPage } from './wallet';

@NgModule({
  declarations: [
    WalletPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletPage),
  ],
})
export class WalletPageModule {}
