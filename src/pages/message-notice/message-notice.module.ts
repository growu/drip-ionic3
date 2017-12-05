import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageNoticePage} from './message-notice';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';

@NgModule({
    declarations: [
        MessageNoticePage,
    ],
    imports: [
        IonicPageModule.forChild(MessageNoticePage),
        TimeAgoPipeModule,
        MomentModule
    ],
})
export class MessageNoticePageModule {
}
