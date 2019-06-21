import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginPage} from './login';
import {DpThirdLoginComponentModule} from '../../components/dp-third-login/dp-third-login.module';

@NgModule({
    declarations: [LoginPage],
    imports: [
        IonicPageModule.forChild(LoginPage),
        DpThirdLoginComponentModule
    ],
})
export class LoginPageModule {
}
