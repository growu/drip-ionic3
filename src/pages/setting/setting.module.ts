import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SettingPage} from './setting';
import {AppRateProvider} from "../../providers/AppProvider";


@NgModule({
    declarations: [
        SettingPage,
    ],
    imports: [
        IonicPageModule.forChild(SettingPage),
    ],
    providers: [
        AppRateProvider,
    ]
})
export class SettingPageModule {
}
