import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyEventComponent} from './my-event';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {MyShareModule} from '../my-share/my-share.module';
// import {MyInterLinkComponentModule} from "../my-inter-link/my-inter-link.module";
// import {MyInterLinkComponent} from '../my-inter-link/my-inter-link';
// import {MyEventContentComponentModule} from '../my-event-content/my-event-content.module';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@NgModule({
    declarations: [
        MyEventComponent
    ],
    imports: [
        IonicModule,
        TimeAgoPipeModule,
        MomentModule,
        IonicImageViewerModule,
        // MyInterLinkComponentModule,
        // MyEventContentComponentModule,
        MyShareModule
    ],
    exports: [
        MyEventComponent
    ],
    entryComponents: [
        // MyInterLinkComponent
    ],
    providers: [InAppBrowser]
})
export class MyEventComponentModule {
}
