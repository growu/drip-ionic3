import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageNoticePage} from './message-notice';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
    declarations: [
        MessageNoticePage,
    ],
    imports: [
        IonicPageModule.forChild(MessageNoticePage),
        TimeAgoPipeModule,
        MomentModule,
        MyLoaderComponentModule
    ],
})
export class MessageNoticePageModule {
}
