import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginDefaultPage } from './login-default';

@NgModule({
  declarations: [
    LoginDefaultPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginDefaultPage),
  ],
})
export class LoginDefaultPageModule {}
