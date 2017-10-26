import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AboutPage} from './about';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
    declarations: [
        AboutPage,
    ],
    imports: [
        IonicPageModule.forChild(AboutPage),
        ClipboardModule
    ],
    providers: [
        InAppBrowser
    ]
})
export class AboutPageModule {
}
