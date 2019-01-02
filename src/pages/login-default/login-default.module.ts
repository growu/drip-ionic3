import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginDefaultPage} from './login-default';
import {Device} from '@ionic-native/device';
import {MyThirdLoginComponentModule} from '../../components/my-third-login/my-third-login.module';

@NgModule({
    declarations: [
        LoginDefaultPage,
    ],
    imports: [
        IonicPageModule.forChild(LoginDefaultPage),
        MyThirdLoginComponentModule
    ],
    providers:[
        Device
    ]
})
export class LoginDefaultPageModule {
}
