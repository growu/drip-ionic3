import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageNoticePage} from './message-notice';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
    declarations: [
        MessageNoticePage,
    ],
    imports: [
        IonicPageModule.forChild(MessageNoticePage),
        TimeAgoPipeModule,
        MomentModule,
        DpLoaderComponentModule
    ],
})
export class MessageNoticePageModule {
}
