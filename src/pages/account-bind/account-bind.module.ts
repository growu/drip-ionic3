import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountBindPage } from './account-bind';

@NgModule({
  declarations: [
      AccountBindPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountBindPage),
  ],
})
export class AccountBindPageModule {}
