import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginDefaultPage} from './login-default';
import {Device} from '@ionic-native/device';
import {DpThirdLoginComponentModule} from '../../components/dp-third-login/dp-third-login.module';

@NgModule({
    declarations: [
        LoginDefaultPage,
    ],
    imports: [
        IonicPageModule.forChild(LoginDefaultPage),
        DpThirdLoginComponentModule
    ],
    providers:[
        Device
    ]
})
export class LoginDefaultPageModule {
}
