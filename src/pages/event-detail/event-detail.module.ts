import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventDetailPage} from './event-detail';
import {MomentModule} from 'angular2-moment';
import {MyFollowButtonComponentModule} from '../../components/my-follow-button/my-follow-button.module'
import {MyShareModule} from '../../components/my-share/my-share.module';
import {IonicImageViewerModule} from "ionic-img-viewer";

@NgModule({
    declarations: [
        EventDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(EventDetailPage),
        MomentModule,
        MyFollowButtonComponentModule,
        MyShareModule,
        IonicImageViewerModule
    ],
})
export class EventDetailPageModule {
}
