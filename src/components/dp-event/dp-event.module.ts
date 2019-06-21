import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DpEventComponent} from './dp-event';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {DpShareModule} from '../dp-share/dp-share.module';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {DpUserAvatarModule} from '../dp-user-avatar/dp-user-avatar.module';
import {VgStreamingModule} from 'videogular2/streaming';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
    declarations: [
        DpEventComponent
    ],
    imports: [
        IonicModule,
        TimeAgoPipeModule,
        MomentModule,
        IonicImageViewerModule,
        DpShareModule,
        DpUserAvatarModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule
    ],
    exports: [
        DpEventComponent,
    ],
    entryComponents: [
    ],
    providers: [InAppBrowser]
})
export class DpEventComponentModule {
}
