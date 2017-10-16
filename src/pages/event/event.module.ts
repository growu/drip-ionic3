import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventPage} from './event';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';
import {MomentModule} from 'angular2-moment';

@NgModule({
    declarations: [
        EventPage
    ],
    imports: [
        IonicPageModule.forChild(EventPage),
        MomentModule,
        MyEventComponentModule
    ],
})
export class EventPageModule {
}
