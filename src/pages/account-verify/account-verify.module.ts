import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountVerifyPage } from './account-verify';

@NgModule({
  declarations: [
    AccountVerifyPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountVerifyPage),
  ],
})
export class AccountVerifyPageModule {}
