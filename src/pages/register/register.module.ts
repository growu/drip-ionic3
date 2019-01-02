import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {MyThirdLoginComponentModule} from '../../components/my-third-login/my-third-login.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    MyThirdLoginComponentModule
  ],
})
export class RegisterPageModule {}
