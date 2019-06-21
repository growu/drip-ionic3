import {NgModule} from '@angular/core';
import {IonicModule, NavParams} from 'ionic-angular';
import {DpShareComponent} from './dp-share.component';
import {DpShareController} from './dp-share.controller';
import {SocialSharing} from '@ionic-native/social-sharing';
import {DpShareImageModule} from "./dp-share-image.module"

@NgModule({
    declarations: [
        DpShareComponent
    ],
    imports: [
        IonicModule,
        DpShareImageModule
    ],
    providers: [
        DpShareController,
        SocialSharing
    ],
    exports: [
        DpShareComponent
    ],
    entryComponents: [
        DpShareComponent
    ],
})
export class DpShareModule {
}
