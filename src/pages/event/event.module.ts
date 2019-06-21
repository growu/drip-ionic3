import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventPage} from './event';
import {DpEventComponentModule} from '../../components/dp-event/dp-event.module';
import {MomentModule} from 'angular2-moment';
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
    declarations: [
        EventPage
    ],
    imports: [
        IonicPageModule.forChild(EventPage),
        MomentModule,
        DpEventComponentModule,
        DpLoaderComponentModule
    ],
})
export class EventPageModule {
}
