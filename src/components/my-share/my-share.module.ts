import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyShareComponent} from './my-share.component';
import {MyShareController} from './my-share.controller';
import {SocialSharing} from '@ionic-native/social-sharing';

@NgModule({
    declarations: [
        MyShareComponent,
    ],
    imports: [
        IonicModule,
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
