import {NgModule} from '@angular/core';
import {IonicModule, NavParams} from 'ionic-angular';
import {MyShareComponent} from './my-share.component';
import {MyShareController} from './my-share.controller';
import {SocialSharing} from '@ionic-native/social-sharing';
import {MyShareImageModule} from "./my-share-image.module"

@NgModule({
    declarations: [
        MyShareComponent
    ],
    imports: [
        IonicModule,
        MyShareImageModule
    ],
    providers: [
        MyShareController,
        SocialSharing
    ],
    exports: [
        MyShareComponent
    ],
    entryComponents: [
        MyShareComponent
    ],
})
export class MyShareModule {
}
