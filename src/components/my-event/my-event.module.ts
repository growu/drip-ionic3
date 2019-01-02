import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyEventComponent} from './my-event';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {MyShareModule} from '../my-share/my-share.module';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {MyUserAvatarModule} from '../my-user-avatar/my-user-avatar.module';
import {VgStreamingModule} from 'videogular2/streaming';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
    declarations: [
        MyEventComponent
    ],
    imports: [
        IonicModule,
        TimeAgoPipeModule,
        MomentModule,
        IonicImageViewerModule,
        MyShareModule,
        MyUserAvatarModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule
    ],
    exports: [
        MyEventComponent,
    ],
    entryComponents: [
    ],
    providers: [InAppBrowser]
})
export class MyEventComponentModule {
}
