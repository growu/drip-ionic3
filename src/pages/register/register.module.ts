import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {DpThirdLoginComponentModule} from '../../components/dp-third-login/dp-third-login.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    DpThirdLoginComponentModule
  ],
})
export class RegisterPageModule {}
