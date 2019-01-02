import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginPage} from './login';
import {MyThirdLoginComponentModule} from '../../components/my-third-login/my-third-login.module';

@NgModule({
    declarations: [LoginPage],
    imports: [
        IonicPageModule.forChild(LoginPage),
        MyThirdLoginComponentModule
    ],
})
export class LoginPageModule {
}
