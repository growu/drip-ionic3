import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventDetailPage} from './event-detail';
import {MomentModule} from 'angular2-moment';
import {MyFollowButtonComponentModule} from '../../components/my-follow-button/my-follow-button.module'
import {MyShareModule} from '../../components/my-share/my-share.module';
import {IonicImageViewerModule} from "ionic-img-viewer";
import {KeyboardProvider} from "../../providers/AppProvider";
import {KeyboardAttachDirective} from "../../directives/keyboard-attach.directive";
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';
import {DpCommentComponentModule} from '../../components/dp-comment/dp-comment.module';
import {DpCommentToolbarComponentModule} from "../../components/dp-comment-toolbar/dp-comment-toolbar.module";
import {VgStreamingModule} from 'videogular2/streaming';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
    declarations: [
        EventDetailPage,
        KeyboardAttachDirective
    ],
    imports: [
        IonicPageModule.forChild(EventDetailPage),
        MomentModule,
        MyFollowButtonComponentModule,
        MyShareModule,
        IonicImageViewerModule,
        MyLoaderComponentModule,
        DpCommentComponentModule,
        DpCommentToolbarComponentModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule
    ],
    providers:[
        KeyboardProvider
    ]
})
export class EventDetailPageModule {
}
