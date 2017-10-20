import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginDefaultPage} from './login-default';
import {Device} from '@ionic-native/device';

@NgModule({
    declarations: [
        LoginDefaultPage,
    ],
    imports: [
        IonicPageModule.forChild(LoginDefaultPage),
    ],
    providers:[
        Device
    ]
})
export class LoginDefaultPageModule {
}
