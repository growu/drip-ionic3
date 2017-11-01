import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyEventComponent} from './my-event';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {MyShareModule} from '../my-share/my-share.module';


@NgModule({
    declarations: [
        MyEventComponent
    ],
    imports: [
        IonicModule,
        TimeAgoPipeModule,
        MomentModule,
        IonicImageViewerModule,
        MyShareModule
    ],
    exports: [
        MyEventComponent
    ],
    providers: []
})
export class MyEventComponentModule {
}
