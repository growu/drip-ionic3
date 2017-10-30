import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SettingPage} from './setting';
import {AppRateProvider} from "../../providers/AppProvider";
import {AppProvider} from "../../providers/AppProvider";
import {AppRate} from "@ionic-native/app-rate";


@NgModule({
    declarations: [
        SettingPage,
    ],
    imports: [
        IonicPageModule.forChild(SettingPage),
    ],
    providers: [
        AppRateProvider,
        // AppProvider.getAppRateProvider()
    ]
})
export class SettingPageModule {
}
