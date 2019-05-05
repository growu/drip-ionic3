import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventPage} from './event';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';
import {MomentModule} from 'angular2-moment';
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
    declarations: [
        EventPage
    ],
    imports: [
        IonicPageModule.forChild(EventPage),
        MomentModule,
        MyEventComponentModule,
        MyLoaderComponentModule
    ],
})
export class EventPageModule {
}
